import { injectable } from "tsyringe";
import { IArticleRepository } from "../interfaces/article.interface";
import ArticleModel, { IArticle } from "../models/article.model";
import { DeleteArticleDto, FindArticleDto, UpdateArticleDto } from "../dtos/article.dto";

@injectable()
export class ArticleRepository implements IArticleRepository {
    constructor() { console.log("article repository created") }
    update(article: UpdateArticleDto): Promise<IArticle> {
        throw new Error("Method not implemented.");
    }
    delete(id: DeleteArticleDto): Promise<IArticle> {
        throw new Error("Method not implemented.");
    }
    async findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle> {
        console.log(articleTitle);
        return await ArticleModel.findOne({ title: articleTitle.title }).lean();
    }

    async findAll(): Promise<IArticle[]> {
        return await ArticleModel.find().lean();
    }
    async create(article: any): Promise<IArticle> {
        throw new Error("Method not implemented.");
    }

}