import { CreateArticleDto, CreateArticleResponseDto, FindArticleResponseDto } from "../dtos/article.dto";
import { CreateCommentResponseDto, FindCommentByIdDto, FindCommentResponseDto, FindCommentsByArticleDto } from "../dtos/comment.dto";
import { CreateUserResponseDto, FindUserDto, FindUserResponseDto } from "../dtos/user.dto";
import { IArticleMapper } from "../interfaces/mappers/article-mapper.interface";
import { ICommentMapper } from "../interfaces/mappers/comment-mapper.interface";
import { IUserMapper } from "../interfaces/mappers/user-mapper.interface";
import { IArticle } from "../models/article.model";
import { IComment } from "../models/comment.model";
import { IUser } from "../models/user.model";

export class MockArticalMapper implements IArticleMapper {
    toCreateArticleDto = jest.fn<CreateArticleDto, [IArticle]>();
    toCreateArticleResponseDto = jest.fn<CreateArticleResponseDto, [IArticle]>();
    toFindArticleResponseDto = jest.fn<FindArticleResponseDto, [IArticle]>();
    toFindAllArticleResponseDto = jest.fn<FindArticleResponseDto[], [IArticle[]]>();
}

export class MockUserMapper implements IUserMapper {
    toFindUserDto = jest.fn<FindUserDto, [string]>();
    toCreateUserResponseDto = jest.fn<CreateUserResponseDto, [IUser]>();
    toFindUserResponseDto = jest.fn<FindUserResponseDto, [IUser]>();
}

export class MockCommentMapper implements ICommentMapper {
    toFindCommentResponseDto = jest.fn<FindCommentResponseDto, [IComment]>();
    toCreateCommentResponseDto = jest.fn<CreateCommentResponseDto, [IComment]>();
    toFindAllCommentsByArticleDto = jest.fn<FindCommentsByArticleDto, [string]>();
    toFindCommentByIdDto = jest.fn<FindCommentByIdDto, [string]>();
}

export class MockArticleMapper implements IArticleMapper {
    toCreateArticleDto = jest.fn<CreateArticleDto, [IArticle]>();
    toCreateArticleResponseDto = jest.fn<CreateArticleResponseDto, [IArticle]>();
    toFindArticleResponseDto = jest.fn<FindArticleResponseDto, [IArticle]>();
    toFindAllArticleResponseDto = jest.fn<FindArticleResponseDto[], [IArticle[]]>();
}


