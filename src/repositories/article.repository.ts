import { injectable } from "tsyringe";
import { IArticleRepository } from "../interfaces/article.interface";
import ArticleModel, { IArticle } from "../models/article.model";
import { CreateArticleDto, DeleteArticleDto, FindArticleDto, UpdateArticleDto } from "../dtos/article.dto";

@injectable()
export class ArticleRepository implements IArticleRepository {
    constructor() { console.log("article repository created") }
    async update(article: UpdateArticleDto): Promise<IArticle> {
        const updatedArticle = await ArticleModel.findOneAndUpdate({ id: article.id }, article, { new: true }).lean();
        if (!updatedArticle) {
            throw new Error("Article not found");
        }
        return updatedArticle as IArticle;
    }

    async delete(article: DeleteArticleDto): Promise<IArticle> {
        const deletedArticle = await ArticleModel.findOneAndDelete({ title: article.title }).lean();
        if (!deletedArticle) {
            throw new Error("Article not found");
        }
        return deletedArticle as IArticle;
    }
    async findArticleByTitle(articleTitle: FindArticleDto): Promise<IArticle> {
        const article = await ArticleModel.findOne({ title: articleTitle.title });
        if (!article) {
            throw new Error("Article not found");
        }
        return article.toObject() as IArticle;
    }

    async findAll(): Promise<IArticle[]> {
        return await ArticleModel.find().lean();
    }

    async create(article: CreateArticleDto): Promise<IArticle> {
        const newArticle = new ArticleModel(article);
        return await newArticle.save();
    }

}