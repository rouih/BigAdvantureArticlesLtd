import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { IArticleRepository, IArticleService } from "../interfaces/article.interface";
import { CreateArticleDto, CreateArticleResponseDto, FindArticleResponseDto, FindArticleDto, SearchArticleDto, SearchArticleResponseDto, FindArticleWithMostWordOccurrencesDto, FindArticleWithMostWordOccurrencesResponseDto } from '../dtos/article.dto';
import { IArticle } from '../models/article.model';
import { IArticleMapper } from '../interfaces/mappers/article-mapper.interface';

@injectable()
export class ArticleService implements IArticleService {
    constructor(
        @inject("IArticleMapper") private articleMapper: IArticleMapper,
        @inject("IArticleRepository") private articleRepository: IArticleRepository
    ) { }


    async findArticleWithMostWordOccurrences(word: FindArticleWithMostWordOccurrencesDto): Promise<FindArticleWithMostWordOccurrencesResponseDto> {
        const article = await this.articleRepository.findArticleWithMostWordOccurrences(word);
        return article;
    }


    async search(words: SearchArticleDto): Promise<SearchArticleResponseDto> {
        const searchResult = await this.articleRepository.search(words);
        return searchResult;
    }

    async findArticleByTitle(articleTitle: FindArticleDto): Promise<FindArticleResponseDto> {
        const article = await this.articleRepository.findArticleByTitle(articleTitle);
        return this.articleMapper.toFindArticleResponseDto(article)
    }
    async findAll(): Promise<FindArticleResponseDto[]> {
        const allArcitcles = await this.articleRepository.findAll();
        return this.articleMapper.toFindAllArticleResponseDto(allArcitcles);
    }
    async createArticle(article: CreateArticleDto, userId: string): Promise<CreateArticleResponseDto> {
        const newArticle = await this.articleRepository.create(article, userId);
        return this.articleMapper.toCreateArticleResponseDto(newArticle);
    }

}