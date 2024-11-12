import { CreateCommentResponseDto, FindCommentsByArticleDto, FindCommentByIdDto, FindCommentResponseDto } from "../../dtos/comment.dto";
import { IComment } from "../../models/comment.model";

export interface ICommentMapper {
    toFindCommentResponseDto(comment: IComment): FindCommentResponseDto;
    toFindCommentByIdDto(commentId: string): FindCommentByIdDto
    toCreateCommentResponseDto(comment: IComment): CreateCommentResponseDto;
    toFindAllCommentsByArticleDto(articleId: string): FindCommentsByArticleDto;
}