import { CreateCommentDto, FindCommentsByArticleDto, FindCommentByIdDto } from "../dtos/comment.dto";
import { ICommentRepository } from "../interfaces/comment.interface";
import { IComment } from "../models/comment.model";

export class MockCommentRepository implements ICommentRepository {
    create = jest.fn<Promise<IComment>, [CreateCommentDto]>();
    findCommentsByArticle = jest.fn<Promise<IComment[]>, [FindCommentsByArticleDto]>();
    findCommentById = jest.fn<Promise<IComment>, [FindCommentByIdDto]>();
}