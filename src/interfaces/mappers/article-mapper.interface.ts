//this class mappes from the model to the dto
import { IArticle } from "../../models/article.model";
import { CreateArticleDto, FindArticleResponseDto, CreateArticleResponseDto } from "../../dtos/article.dto";

export interface IArticleMapper {
    toFindArticleResponseDto(article: IArticle): FindArticleResponseDto;
    toFindAllArticleResponseDto(articles: IArticle[]): FindArticleResponseDto[];
    toCreateArticleDto(article: IArticle): CreateArticleDto;
    toCreateArticleResponseDto(article: IArticle): CreateArticleResponseDto;
}
