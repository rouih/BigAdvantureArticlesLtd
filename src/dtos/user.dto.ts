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


export class FindUserDto {
    constructor(partial: Partial<FindUserDto>) {
        Object.assign(this, partial);
    }
    @IsOptional()
    @IsString()
    userId?: string;
}

export class FindUserResponseDto {
    constructor(partial: Partial<FindUserResponseDto>) {
        Object.assign(this, partial);
    }
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

export class CreateUserDto {
    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }

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
}

export class LoginUserDto {
    constructor(partial: Partial<LoginUserDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginUserResponseDto {
    constructor(partial: Partial<LoginUserResponseDto>) {
        Object.assign(this, partial);
    }
    @IsString()
    @IsNotEmpty()
    token: string;
}
