
import { injectable } from "tsyringe";
import { CreateCommentDto, FindCommentsByArticleDto, FindCommentByIdDto } from "../dtos/comment.dto";
import { ICommentRepository } from "../interfaces/comment.interface";
import CommentModel, { IComment } from "../models/comment.model";

@injectable()
export class CommentRepository implements ICommentRepository {
    async create(commentData: CreateCommentDto, userId: string): Promise<IComment> {
        const comment = new CommentModel({ ...commentData, author: userId });
        return await comment.save();
    }
    async findCommentsByArticle(article: FindCommentsByArticleDto): Promise<IComment[]> {
        return await CommentModel.find({ articleId: article.articleId }).populate('article', 'author').lean();
    }
    async findCommentById(comment: FindCommentByIdDto): Promise<IComment> {
        return await CommentModel.findById(comment.commentId).populate('article', 'author').lean();
    }

}
