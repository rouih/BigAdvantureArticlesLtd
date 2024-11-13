import { inject, injectable } from "tsyringe";
import { IArticleController, IArticleService } from "../../interfaces/article.interface";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/express";
import { IArticleMapper } from "../../interfaces/mappers/article-mapper.interface";

@injectable()
export class ArticleController implements IArticleController {
    constructor(
        @inject('IArticleService') private articleService: IArticleService,
        @inject("IArticleMapper") private articleMapper: IArticleMapper
    ) { }


    async findArticleWithMostWordOccurrences(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const word = req.params.word;
            const article = await this.articleService.findArticleWithMostWordOccurrences(this.articleMapper.toFindArticleWithMostWordOccurrencesDto(word));
            if (!article) res.status(404).json({ message: "Article not found" });
            res.status(200).json(article);
        } catch (err) {
            next(err);
        }
    }
    async search(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const words = req.body;
            const searchResult = await this.articleService.search(words);
            if (!searchResult) res.status(404).json({ message: "Article not found" });
            res.status(200).json(searchResult);
        } catch (err) {
            next(err);
        }
    }
    async findArticleByTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const title = req.body.title
            if (!title) {
                res.status(400).json({ message: "title is required" });
                return;
            }
            const article = await this.articleService.findArticleByTitle({ title: title as string });
            if (!article) res.status(404).json({ message: "Article not found" });
            else res.status(200).json(article);
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