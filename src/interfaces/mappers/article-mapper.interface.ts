//this class mappes from the model to the dto
import { IArticle } from "../../models/article.model";
import { CreateArticleDto, UpdateArticleDto, DeleteArticleDto, FindArticleResponseDto, FindAllArticleResponseDto, CreateArticleResponseDto, UpdateArticleResponseDto, DeleteArticleResponseDto, ArticleWordPositionDto } from "../../dtos/article.dto";

export interface IArticleMapper {
    toFindArticleResponseDto(article: IArticle): FindArticleResponseDto;
    toFindAllArticleResponseDto(articles: IArticle[]): FindArticleResponseDto[];
    toCreateArticleDto(article: IArticle): CreateArticleDto;
    toUpdateArticleDto(article: IArticle): UpdateArticleDto;
    toDeleteArticleDto(article: IArticle): DeleteArticleDto;
    toCreateArticleResponseDto(article: IArticle): CreateArticleResponseDto;
    toUpdateArticleResponseDto(article: IArticle): UpdateArticleResponseDto;
    toDeleteArticleResponseDto(article: IArticle): DeleteArticleResponseDto;
}
