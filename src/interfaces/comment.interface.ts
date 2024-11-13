import { NextFunction, Response } from "express";
import { CreateCommentDto, CreateCommentResponseDto, FindCommentsByArticleDto, FindCommentByIdDto, FindCommentResponseDto } from "../dtos/comment.dto";
import { IComment } from "../models/comment.model";
import { RequestWithUser } from "../types/express";

export interface ICommentRepository {
    create(commentData: CreateCommentDto, userId: string): Promise<IComment>;
    findCommentsByArticle(article: FindCommentsByArticleDto): Promise<IComment[]>;
    findCommentById(comment: FindCommentByIdDto): Promise<IComment>;
}

export interface ICommentService {
    create(commentData: CreateCommentDto, userId: string): Promise<CreateCommentResponseDto>;
    findCommentsByArticle(article: FindCommentsByArticleDto): Promise<FindCommentResponseDto[]>;
    findCommentById(comment: FindCommentByIdDto): Promise<FindCommentResponseDto>;
}

export interface ICommentController {
    create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    findCommentsByArticle(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
    findCommentById(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}

