import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class FindArticleDto {
    constructor(partial: Partial<FindArticleDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class FindArticleResponseDto {

    constructor(partial: Partial<FindArticleResponseDto>) {
        Object.assign(this, partial);
    }

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsNotEmpty()
    authorId: string;
}

export class FindAllArticleResponseDto {
    constructor(partial: Partial<FindAllArticleResponseDto>) {
        Object.assign(this, partial);
    }
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => FindArticleResponseDto)
    articles: FindArticleResponseDto[];
}

export class CreateArticleDto {
    constructor(partial: Partial<CreateArticleDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    body: string;
}

export class CreateArticleResponseDto {
    constructor(partial: Partial<CreateArticleResponseDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    title: string;
}



export class SearchArticleDto {
    constructor(partial: Partial<SearchArticleDto>) {
        Object.assign(this, partial);
    }
    @IsArray()
    @IsNotEmpty()
    words: string[];
}

export class SearchArticleResponseDto {
    constructor(partial: Partial<SearchArticleResponseDto>) {
        Object.assign(this, partial);
    }

    [word: string]: ArticleWordPositionDto[];
}

export class ArticleWordPositionDto {
    constructor(partial: Partial<ArticleWordPositionDto>) {
        Object.assign(this, partial);
    }
    articleId: string;
    offsets: number[];
}

export class FindArticleWithMostWordOccurrencesDto {
    constructor(partial: Partial<FindArticleWithMostWordOccurrencesDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    word: string;
}

export class FindArticleWithMostWordOccurrencesResponseDto {
    constructor(partial: Partial<FindArticleWithMostWordOccurrencesResponseDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    id: string;
}
