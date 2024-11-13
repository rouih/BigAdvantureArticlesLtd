import { injectable } from "tsyringe";
import { IArticleMapper } from "../interfaces/mappers/article-mapper.interface";
import { IArticle } from "../models/article.model";
import { CreateArticleDto, FindArticleResponseDto, CreateArticleResponseDto, FindArticleWithMostWordOccurrencesDto, FindArticleWithMostWordOccurrencesResponseDto, SearchArticleResponseDto, SearchArticleDto } from "../dtos/article.dto";
import { plainToClass } from "class-transformer";

@injectable()
export class ArticleMapper implements IArticleMapper {
    toFindAllArticleResponseDto(articles: IArticle[]): FindArticleResponseDto[] {
        return articles.map(article => this.toFindArticleResponseDto(article));
    }
    toCreateArticleDto(article: IArticle): CreateArticleDto {
        return new CreateArticleDto({ title: article.title });
    }
    toCreateArticleResponseDto(article: IArticle): CreateArticleResponseDto {
        return new CreateArticleResponseDto({ title: article.title });
    }
    toFindArticleResponseDto(article: IArticle): FindArticleResponseDto {
        return new FindArticleResponseDto({ title: article.title, body: article.body, authorId: article.author.toString() }); return
    }
    toFindArticleWithMostWordOccurrencesDto(word: string): FindArticleWithMostWordOccurrencesDto {
        return new FindArticleWithMostWordOccurrencesDto({ word: word });
    }
    toFindArticleWithMostWordOccurrencesResponseDto(article: IArticle): FindArticleWithMostWordOccurrencesResponseDto {
        return new FindArticleWithMostWordOccurrencesResponseDto({ id: article.id });
    }


}
