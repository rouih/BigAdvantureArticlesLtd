import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateCommentDto {
    constructor(partial: Partial<CreateCommentDto>) {
        Object.assign(this, partial);
    }
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsString()
    @IsOptional()
    author?: string;
    @IsNotEmpty()
    @IsString()
    article: string;
}

export class FindCommentsByArticleDto {
    constructor(partial: Partial<FindCommentsByArticleDto>) {
        Object.assign(this, partial);
    }
    @IsNotEmpty()
    @IsString()
    articleId: string;
}

export class FindCommentByIdDto {
    constructor(partial: Partial<FindCommentByIdDto>) {
        Object.assign(this, partial);
    }
    @IsNotEmpty()
    @IsString()
    commentId: string;
}

export class FindCommentResponseDto {
    constructor(partial: Partial<FindCommentResponseDto>) {
        Object.assign(this, partial);
    }
    @IsNotEmpty()
    @IsString()
    commentId: string;
    @IsString()
    content: string;
    @IsString()
    authorId?: string;

    @IsString()
    articleId: string;
}

export class CreateCommentResponseDto {
    constructor(partial: Partial<CreateCommentResponseDto>) {
        Object.assign(this, partial);
    }
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    content: string;
}
