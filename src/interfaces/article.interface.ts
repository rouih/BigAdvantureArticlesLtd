import { Request, Response, NextFunction } from "express";
import { CreateArticleDto, CreateArticleResponseDto, DeleteArticleDto, DeleteArticleResponseDto, FindAllArticleResponseDto as FindAllArticleResponseDto, FindArticleDto, FindArticleResponseDto, SearchArticleDto, SearchArticleResponseDto, UpdateArticleDto, UpdateArticleResponseDto } from "../dtos/article.dto";
import { IArticle } from "../models/article.model";
import { RequestWithUser } from "../types/express";

export interface IArticleRepository {
    findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle>;
    findAll(): Promise<IArticle[]>;
    create(article: CreateArticleDto, userId: string): Promise<IArticle>;
    update(article: UpdateArticleDto): Promise<IArticle>;
    delete(article: DeleteArticleDto): Promise<IArticle>;
    search(words: SearchArticleDto): Promise<SearchArticleResponseDto>;
}

export interface IArticleService {
    findArticleByTitle(articleTitle: FindArticleDto): Promise<FindArticleResponseDto>;
    findAllArticles(): Promise<FindArticleResponseDto[]>;
    createArticle(article: CreateArticleDto, userId: string): Promise<CreateArticleResponseDto>;
    updateArticle(article: UpdateArticleDto): Promise<UpdateArticleResponseDto>;
    deleteArticle(article: DeleteArticleDto): Promise<DeleteArticleResponseDto>;
    search(words: SearchArticleDto): Promise<SearchArticleResponseDto>;
}

export interface IArticleController {
    findArticleByTitle(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAllArticles(req: Request, res: Response, next: NextFunction): Promise<void>;
    createArticle(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    updateArticle(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void>;
    search(req: Request, res: Response, next: NextFunction): Promise<void>;
}
