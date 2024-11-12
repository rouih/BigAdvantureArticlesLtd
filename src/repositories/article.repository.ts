import { inject, injectable } from "tsyringe";
import { IArticleRepository } from "../interfaces/article.interface";
import ArticleModel, { IArticle } from "../models/article.model";
import { CreateArticleDto, FindArticleDto, FindArticleWithMostWordOccurrencesDto, FindArticleWithMostWordOccurrencesResponseDto, SearchArticleDto, SearchArticleResponseDto } from "../dtos/article.dto";
import { elasticClient, updateArticleIndex } from "../utils/elastic/elastic.index";
import logger from "../utils/winston-logger";
import { redisClient } from "../utils/redis-client";
import { IArticleMapper } from "../interfaces/mappers/article-mapper.interface";
import { MtermvectorsResponse } from "@elastic/elasticsearch/lib/api/types";

@injectable()
export class ArticleRepository implements IArticleRepository {
    constructor(@inject("IArticleMapper") private articleMapper: IArticleMapper) { }


    async findArticleWithMostWordOccurrences(word: FindArticleWithMostWordOccurrencesDto): Promise<FindArticleWithMostWordOccurrencesResponseDto> {
        // Retrieve term vectors for the specified word across all articles
        const termVectorsResponse: MtermvectorsResponse = await elasticClient.mtermvectors({
            index: 'articles',
            body: {
                docs: [{ _id: "_all", fields: ["body"], term_statistics: false, field_statistics: false, positions: false }]
            },
            ids: await this.getAllArticleIds(),
            fields: ["body"],
            term_statistics: false,
            field_statistics: false,
            payloads: false,
            positions: false,
        });

        // Find the article with the highest occurrence of the specified word
        let maxOccurrences = 0;
        let articleWithMaxOccurrences = null;
        for (const doc of termVectorsResponse.docs) {
            const articleId = doc._id;
            const terms = doc.term_vectors?.body?.terms;

            if (!terms || !terms[word.word]) continue;

            const occurrenceCount = terms[word.word].term_freq;

            if (occurrenceCount > maxOccurrences) {
                maxOccurrences = occurrenceCount;
                articleWithMaxOccurrences = articleId;
            }
        }

        return { id: articleWithMaxOccurrences };
    }


    private async getAllArticleIds(): Promise<string[]> {
        const searchResponse = await elasticClient.search({
            index: 'articles',
            body: {
                query: { match_all: {} },
                _source: false,
                size: 1000,
            },
        });
        return searchResponse.hits.hits.map(hit => hit._id);
    }

    async search(words: SearchArticleDto): Promise<SearchArticleResponseDto> {
        const cacheKey = `search:${words.words.join(',')}`;
        const cachedRes = await redisClient.get(cacheKey);
        if (cachedRes) {
            logger.info("Search result found in redis");
            return cachedRes as SearchArticleResponseDto;
        }

        //Search for articles that contain any of the words
        const articleIds = await this.searchArticlesInElastic(words.words);
        if (articleIds.length === 0) {
            return new SearchArticleResponseDto({});
        }
        // Retrieve term vectors for all matched articles
        const wordPositions = await this.retrieveTermVectors(articleIds, words.words);

        //store the result in redis
        await redisClient.set(cacheKey, wordPositions, 60);
        return this.articleMapper.toSearchArticleResponseDto(wordPositions);
    }

    private async retrieveTermVectors(articleIds: string[], words: string[]): Promise<any> {
        const termVectors = await elasticClient.mtermvectors({
            index: 'articles',
            ids: articleIds,
            fields: ['body'],
            term_statistics: false,
            field_statistics: false,
            positions: true,
            offsets: true,
            payloads: false,
        });
        const filteredVectors = this.filterTermVectors(termVectors, words);
        return filteredVectors;
    }
    private filterTermVectors(termVectorsResponse: MtermvectorsResponse, words: string[]): Record<string, any[]> {
        const wordPositions: Record<string, any[]> = {};

        // Process each document in the term vectors response
        for (const doc of termVectorsResponse.docs) {
            const articleId = doc._id;
            const terms = doc.term_vectors?.body?.terms;

            if (!terms) continue;

            // Filter terms to include only those specified in 'words'
            for (const word of words) {
                const termInfo = terms[word];

                if (termInfo) {
                    const offsets = termInfo.tokens.map((token) => token.start_offset);

                    // Initialize the word entry if not already present
                    if (!wordPositions[word]) {
                        wordPositions[word] = [];
                    }

                    wordPositions[word].push({
                        articleId: articleId,
                        offsets: offsets,
                    });
                }
            }
        }
        return wordPositions;
    }
    private async searchArticlesInElastic(words: string[]) {
        const searchResponse = await elasticClient.search({
            index: 'articles',
            body: {
                query: {
                    bool: {
                        should: words.map((word) => ({
                            match_phrase: { body: word },
                        })),
                        minimum_should_match: 1,
                    },
                },
                _source: false,
                size: 1000,
            },
        });

        return searchResponse.hits.hits.map((hit) => hit._id);
    }

    async findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle> {
        const article = await ArticleModel.findOne({ title: articleTitle.title });
        if (!article) {
            throw new Error("Article not found");
        }
        return article as IArticle;
    }

    async findAll(): Promise<IArticle[]> {
        return await ArticleModel.find().lean();
    }

    async create(article: CreateArticleDto, userId: string): Promise<IArticle> {
        const newArticle = new ArticleModel({ ...article, author: userId });
        await newArticle.save().then(async (savedArticle) => {
            await updateArticleIndex(savedArticle);
            logger.info("New article created");
            return newArticle;
        });
        return newArticle as IArticle;
    }

}