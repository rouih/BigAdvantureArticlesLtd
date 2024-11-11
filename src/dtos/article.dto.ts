import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class FindArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class FindArticleResponseDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class FindAllArticleResponseDto {
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => FindArticleResponseDto)
    articles: FindArticleResponseDto[];
}

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    body: string;
    @IsString()
    @IsNotEmpty()
    author: string;
}

export class CreateArticleResponseDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class UpdateArticleDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
    @IsOptional()
    title: string;
    @IsString()
    @IsOptional()
    body: string;

    @IsString()
    @IsOptional()
    author: string;
}

export class UpdateArticleResponseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    body?: string;

    @IsString()
    @IsOptional()
    author?: string;
}

export class DeleteArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class DeleteArticleResponseDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsOptional()
    message!: string;
}