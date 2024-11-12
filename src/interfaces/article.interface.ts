import { Request, Response, NextFunction } from "express";
import { CreateArticleDto, CreateArticleResponseDto, FindArticleDto, FindArticleResponseDto, SearchArticleDto, SearchArticleResponseDto } from "../dtos/article.dto";
import { IArticle } from "../models/article.model";
import { RequestWithUser } from "../types/express";

export interface IArticleRepository {
    findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle>;
    findAll(): Promise<IArticle[]>;
    create(article: CreateArticleDto, userId: string): Promise<IArticle>;
    search(words: SearchArticleDto): Promise<SearchArticleResponseDto>;
}

export interface IArticleService {
    findArticleByTitle(articleTitle: FindArticleDto): Promise<FindArticleResponseDto>;
    findAll(): Promise<FindArticleResponseDto[]>;
    createArticle(article: CreateArticleDto, userId: string): Promise<CreateArticleResponseDto>;
    search(words: SearchArticleDto): Promise<SearchArticleResponseDto>;
}

export interface IArticleController {
    findArticleByTitle(req: Request, res: Response, next: NextFunction): Promise<void>;
    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    createArticle(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    search(req: Request, res: Response, next: NextFunction): Promise<void>;
}
