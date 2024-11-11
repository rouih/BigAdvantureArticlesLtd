import { Request, Response, NextFunction } from "express";
import { CreateArticleDto, CreateArticleResponseDto, DeleteArticleDto, DeleteArticleResponseDto, FindAllArticleResponseDto as FindAllArticleResponseDto, FindArticleDto, FindArticleResponseDto, UpdateArticleDto, UpdateArticleResponseDto } from "../dtos/article.dto";
import { IArticle } from "../models/article.model";

export interface IArticleRepository {
    findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle>;
    findAll(): Promise<IArticle[]>;
    create(article: CreateArticleDto): Promise<IArticle>;
    update(article: UpdateArticleDto): Promise<IArticle>;
    delete(id: DeleteArticleDto): Promise<IArticle>;
}

export interface IArticleService {
    findArticleByTitle(articleTitle: FindArticleDto): Promise<FindArticleResponseDto>;
    findAllArticles(): Promise<FindArticleResponseDto[]>;
    createArticle(article: CreateArticleDto): Promise<CreateArticleResponseDto>;
    updateArticle(article: UpdateArticleDto): Promise<UpdateArticleResponseDto>;
    deleteArticle(article: DeleteArticleDto): Promise<DeleteArticleResponseDto>;
}

export interface IArticleController {
    findArticleByTitle(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAllArticles(req: Request, res: Response, next: NextFunction): Promise<void>;
    createArticle(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateArticle(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
