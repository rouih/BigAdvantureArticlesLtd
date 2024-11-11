import { inject, injectable } from "tsyringe";
import { IArticleRepository } from "../interfaces/article.interface";
import ArticleModel, { IArticle } from "../models/article.model";
import { CreateArticleDto, DeleteArticleDto, FindArticleDto, SearchArticleDto, SearchArticleResponseDto, UpdateArticleDto } from "../dtos/article.dto";
import { elasticClient, updateArticleIndex } from "../utils/elastic/elastic.index";
import logger from "../utils/winston-logger";
import { redisClient } from "../utils/redis-client";
import { IArticleMapper } from "../interfaces/mappers/article-mapper.interface";
import { MtermvectorsResponse } from "@elastic/elasticsearch/lib/api/types";
import { TermvectorsResponse } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";

@injectable()
export class ArticleRepository implements IArticleRepository {
    constructor(@inject("IArticleMapper") private articleMapper: IArticleMapper) { }

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
        return wordPositions
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

    async update(article: UpdateArticleDto): Promise<IArticle> {
        const updatedArticle = await ArticleModel.findOneAndUpdate({ id: article.id }, article, { new: true }).lean();
        if (!updatedArticle) {
            throw new Error("Article not found");
        }
        return updatedArticle as IArticle;
    }

    async delete(article: DeleteArticleDto): Promise<IArticle> {
        const deletedArticle = await ArticleModel.findOneAndDelete({ title: article.title }).lean();
        if (!deletedArticle) {
            throw new Error("Article not found");
        }
        return deletedArticle as IArticle;
    }
    async findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle> {
        const article = await ArticleModel.findOne({ title: articleTitle.title });
        if (!article) {
            throw new Error("Article not found");
        }
        return article.toObject() as IArticle;
    }

    async findAll(): Promise<IArticle[]> {
        return await ArticleModel.find().lean();
    }

    async create(article: CreateArticleDto): Promise<IArticle> {
        const newArticle = new ArticleModel(article);
        await newArticle.save().then(async (savedArticle) => {
            await updateArticleIndex(savedArticle);
            logger.info("article saved");
            return newArticle;
        });
        return newArticle;
    }

}