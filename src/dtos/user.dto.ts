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

export class GetUserDto {
    @IsOptional()
    @IsString()
    userName?: string;
}

export class GetUserResponseDto {
    @IsString()
    userName!: string;

    @IsString()
    fullName!: string;
}

export class GetAllUserResponseDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GetUserResponseDto)
    users!: GetUserResponseDto[];
}

export class DeleteUserResponseDto {
    @IsString()
    userName!: string;

    @IsString()
    @IsOptional()
    message!: string;
}

export class CreateUserResponseDto {
    @IsString()
    userName!: string;
}

export class UpdateUserResponseDto {
    @IsString()
    userName!: string;

    @IsString()
    @IsOptional()
    message!: string
}
