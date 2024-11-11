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
        return plainToClass(CreateArticleDto, article);
    }

    toUpdateArticleDto(article: IArticle): UpdateArticleDto {
        return plainToClass(UpdateArticleDto, article);
    }
    toDeleteArticleDto(article: IArticle): DeleteArticleDto {
        return plainToClass(DeleteArticleDto, article);
    }
    toCreateArticleResponseDto(article: IArticle): CreateArticleResponseDto {
        return plainToClass(CreateArticleResponseDto, article);
    }
    toUpdateArticleResponseDto(article: IArticle): UpdateArticleResponseDto {
        return plainToClass(UpdateArticleResponseDto, article);
    }
    toDeleteArticleResponseDto(article: IArticle): DeleteArticleResponseDto {
        return plainToClass(DeleteArticleResponseDto, article);
    }
    toFindArticleResponseDto(article: IArticle): FindArticleResponseDto {
        return plainToClass(FindArticleResponseDto, article);
    }
}
