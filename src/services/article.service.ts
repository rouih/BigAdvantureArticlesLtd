import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { IArticleRepository, IArticleService } from "../interfaces/article.interface";
import { CreateArticleDto, UpdateArticleDto, DeleteArticleDto, CreateArticleResponseDto, DeleteArticleResponseDto, FindArticleResponseDto, UpdateArticleResponseDto, FindArticleDto } from '../dtos/article.dto';
import { IArticle } from '../models/article.model';
import { IArticleMapper } from '../interfaces/mappers/article-mapper.interface';

@injectable()
export class ArticleService implements IArticleService {
    constructor(
        @inject("IArticleMapper") private articleMapper: IArticleMapper,
        @inject("IArticleRepository") private articleRepository: IArticleRepository
    ) { console.log("article service created") }

    async findArticleByTitle(articleTitle: FindArticleDto): Promise<FindArticleResponseDto> {
        const article = await this.articleRepository.findArticleByTitle(articleTitle);
        return this.articleMapper.toFindArticleResponseDto(article)
    }
    async findAllArticles(): Promise<FindArticleResponseDto[]> {
        const allArcitcles = await this.articleRepository.findAll();
        return this.articleMapper.toFindAllArticleResponseDto(allArcitcles);
    }
    async createArticle(article: CreateArticleDto): Promise<CreateArticleResponseDto> {
        throw new Error('Method not implemented.');
    }
    async updateArticle(article: UpdateArticleDto): Promise<UpdateArticleResponseDto> {
        throw new Error('Method not implemented.');
    }
    async deleteArticle(article: DeleteArticleDto): Promise<DeleteArticleResponseDto> {
        throw new Error('Method not implemented.');
    }

}