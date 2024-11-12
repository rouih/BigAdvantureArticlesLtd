import { inject, injectable } from "tsyringe";
import { CreateCommentResponseDto, FindCommentsByArticleDto, FindCommentByIdDto, FindCommentResponseDto } from "../dtos/comment.dto";
import { ICommentMapper } from "../interfaces/mappers/comment-mapper.interface";
import { IComment } from "../models/comment.model";

@injectable()
export class CommentMapper implements ICommentMapper {

    toFindAllCommentsByArticleDto(articleId: string): FindCommentsByArticleDto {
        return new FindCommentsByArticleDto({ articleId: articleId });
    }
    toFindCommentResponseDto(comment: IComment): FindCommentResponseDto {
        return new FindCommentResponseDto({ content: comment.content });
    }
    toCreateCommentResponseDto(comment: IComment): CreateCommentResponseDto {
        return new CreateCommentResponseDto({ id: comment.id, content: comment.content });
    }
    toFindCommentByIdDto(commentId: string): FindCommentByIdDto {
        return new FindCommentByIdDto({ commentId: commentId });
    }
}

