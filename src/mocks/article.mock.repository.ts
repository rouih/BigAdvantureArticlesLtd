import { CreateArticleDto, FindArticleWithMostWordOccurrencesDto, FindArticleWithMostWordOccurrencesResponseDto } from "../dtos/article.dto";
import { IArticleRepository } from "../interfaces/article.interface";
import { IArticle } from "../models/article.model";

export class MockArticleRepository implements IArticleRepository {
    create = jest.fn<Promise<IArticle>, [CreateArticleDto]>();
    search = jest.fn<Promise<any>, [any]>();
    findArticleByTitle = jest.fn<Promise<IArticle>, [any]>();
    findAll = jest.fn<Promise<IArticle[]>, []>();
    findArticleWithMostWordOccurrences = jest.fn<Promise<FindArticleWithMostWordOccurrencesResponseDto>, [FindArticleWithMostWordOccurrencesDto]>();

}