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
        const newArticle = await this.articleRepository.create(article);
        return this.articleMapper.toCreateArticleResponseDto(newArticle);
    }
    async updateArticle(article: UpdateArticleDto): Promise<UpdateArticleResponseDto> {
        const updatedArticle = await this.articleRepository.update(article);
        return this.articleMapper.toUpdateArticleResponseDto(updatedArticle);
    }
    async deleteArticle(article: DeleteArticleDto): Promise<DeleteArticleResponseDto> {
        const deletedArticle = await this.articleRepository.delete(article);
        return this.articleMapper.toDeleteArticleResponseDto(deletedArticle);
    }

}