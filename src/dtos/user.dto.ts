// Import necessary decorators
import {
    IsString,
    IsEmail,
    IsOptional,
    ValidateNested,
    IsArray,
    IsNotEmpty,
    isString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    userName!: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    fullName?: string;
}

export class DeleteUserDto {
    @IsString()
    userName!: string;
}

export class FindUserDto {
    @IsOptional()
    @IsString()
    userName?: string;
}

export class FindUserResponseDto {
    @IsString()
    userName!: string;

    @IsString()
    fullName!: string;
}

export class GetAllUserResponseDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FindUserResponseDto)
    users!: FindUserResponseDto[];
}

export class DeleteUserResponseDto {
    @IsString()
    userName!: string;

    @IsString()
    @IsOptional()
    message!: string;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    fullName!: string
}

export class CreateUserResponseDto {
    constructor(partial: Partial<CreateUserResponseDto>) {
        Object.assign(this, partial);
    }

    @IsString()
    userName!: string;

    @IsString()
    @IsNotEmpty()
    token!: string;
}

export class UpdateUserResponseDto {
    @IsString()
    userName!: string;

    @IsString()
    @IsOptional()
    message!: string
}
