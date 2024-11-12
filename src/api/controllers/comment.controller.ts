import { inject, injectable } from "tsyringe";
import { ICommentController, ICommentService } from "../../interfaces/comment.interface";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/express";
import { ICommentMapper } from "../../interfaces/mappers/comment-mapper.interface";

@injectable()
export class CommentController implements ICommentController {
    constructor(
        @inject("ICommentService") private commentService: ICommentService,
        @inject("ICommentMapper") private commentMapper: ICommentMapper
    ) { }
    async create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.User.id;
            if (!userId) throw new Error("User not found");
            const comment = await this.commentService.create(req.body, userId);
            if (!comment) res.status(404).json({ message: "Comment not found" });
            res.status(201).json({ ...comment, author: req.User.id });
        } catch (e) {
            next(e);
        }

    }
    async findCommentsByArticle(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            const articleId = req.params.articleId;
            const comments = await this.commentService.findCommentsByArticle(this.commentMapper.toFindAllCommentsByArticleDto(articleId));
            if (!comments) res.status(404).json({ message: "Comment not found" });
            res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }
    async findCommentById(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        try {
            const commentId = req.params.id
            const comment = await this.commentService.findCommentById(this.commentMapper.toFindCommentByIdDto(commentId));
            if (!comment) res.status(404).json({ message: "Comment not found" });
            res.status(200).json(comment);
        } catch (e) {
            next(e);
        }
    }

}