import { injectable } from "tsyringe";
import { IArticleMapper } from "../interfaces/mappers/article-mapper.interface";
import { IArticle } from "../models/article.model";
import { CreateArticleDto, UpdateArticleDto, DeleteArticleDto, FindArticleResponseDto, FindAllArticleResponseDto, CreateArticleResponseDto, UpdateArticleResponseDto, DeleteArticleResponseDto } from "../dtos/article.dto";
import { plainToClass } from "class-transformer";

@injectable()
export class ArticleMapper implements IArticleMapper {

    toFindAllArticleResponseDto(articles: IArticle[]): FindArticleResponseDto[] {
        return articles.map(article => this.toFindArticleResponseDto(article));
    }

    toCreateArticleDto(article: IArticle): CreateArticleDto {
        return new CreateArticleDto({ title: article.title });
    }

    toUpdateArticleDto(article: IArticle): UpdateArticleDto {
        return new UpdateArticleDto({ title: article.title });
    }
    toDeleteArticleDto(article: IArticle): DeleteArticleDto {
        return new DeleteArticleDto({ title: article.title });
    }
    toCreateArticleResponseDto(article: IArticle): CreateArticleResponseDto {
        return new CreateArticleResponseDto({ title: article.title });
    }
    toUpdateArticleResponseDto(article: IArticle): UpdateArticleResponseDto {
        return new UpdateArticleResponseDto({ title: article.title });
    }
    toDeleteArticleResponseDto(article: IArticle): DeleteArticleResponseDto {
        return new DeleteArticleResponseDto({ title: article.title });
    }
    toFindArticleResponseDto(article: IArticle): FindArticleResponseDto {
        return new FindArticleResponseDto({ title: article.title, body: article.body, author: article.author });
    }
}
