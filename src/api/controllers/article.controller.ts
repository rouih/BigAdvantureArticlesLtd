import { inject, injectable } from "tsyringe";
import { IArticleController, IArticleService } from "../../interfaces/article.interface";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/express";

@injectable()
export class ArticleController implements IArticleController {
    constructor(
        @inject('IArticleService') private articleService: IArticleService
    ) { console.log("article controller created") }
    async search(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const words = req.body;
            const searchResult = await this.articleService.search(words);
            res.status(200).json(searchResult);
        } catch (err) {
            next(err);
        }
    }
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
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const articles = await this.articleService.findAll();
            res.status(200).json(articles);
        } catch (err) {
            next(err);
        }
    }
    async createArticle(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            const article = await this.articleService.createArticle(req.body, req.User.id);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }

}