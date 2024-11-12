import { inject, injectable } from "tsyringe";
import { ICommentRepository, ICommentService } from "../interfaces/comment.interface";
import { CreateCommentDto, CreateCommentResponseDto, FindCommentsByArticleDto, FindCommentByIdDto, FindCommentResponseDto } from "../dtos/comment.dto";
import { ICommentMapper } from "../interfaces/mappers/comment-mapper.interface";

@injectable()
export class CommentService implements ICommentService {

    constructor(
        @inject("ICommentRepository") private commentRepository: ICommentRepository,
        @inject("ICommentMapper") private commentMapper: ICommentMapper) { }
    async create(commentData: CreateCommentDto, userId: string): Promise<CreateCommentResponseDto> {
        const comment = await this.commentRepository.create(commentData, userId);
        return this.commentMapper.toCreateCommentResponseDto(comment);
    }
    async findCommentsByArticle(article: FindCommentsByArticleDto): Promise<FindCommentResponseDto[]> {
        const comments = await this.commentRepository.findCommentsByArticle(article);
        const mappedComments = comments.map(comment => this.commentMapper.toFindCommentResponseDto(comment));
        return mappedComments;
    }
    async findCommentById(comment: FindCommentByIdDto): Promise<FindCommentResponseDto> {
        const foundComment = await this.commentRepository.findCommentById(comment);
        return this.commentMapper.toFindCommentResponseDto(foundComment);
    }

}