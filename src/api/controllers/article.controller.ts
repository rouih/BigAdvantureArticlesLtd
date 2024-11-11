import { inject, injectable } from "tsyringe";
import { IArticleController, IArticleService } from "../../interfaces/article.interface";
import { IUser } from "../../models/user.model";
import { FindArticleResponseDto, FindAllArticleResponseDto, CreateArticleResponseDto, UpdateArticleResponseDto, DeleteArticleResponseDto, FindArticleDto } from "../../dtos/article.dto";
import { Request, Response, NextFunction } from "express";
import { IArticleMapper } from "../../interfaces/mappers/article-mapper.interface";
import winston from "winston/lib/winston/config";
import logger from "../../utils/winston-logger";

@injectable()
export class ArticleController implements IArticleController {
    constructor(
        @inject('IArticleService') private articleService: IArticleService
    ) { console.log("article controller created") }
    async findArticleByTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const title = req.query.title || req.params.title;
            if (!title) {
                res.status(400).json({ message: "title is required" });
            }
            const article = await this.articleService.findArticleByTitle({ title: title as string });
            res.status(200).json(article);
        } catch (err) {
            next(err);
        }
    }
    async findAllArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info("findall")
            const articles = await this.articleService.findAllArticles();
            res.status(200).json(articles);
        } catch (err) {
            next(err);
        }
    }
    async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const article = await this.articleService.createArticle(req.body);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }
    async updateArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }


}