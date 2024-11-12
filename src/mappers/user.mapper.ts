import { injectable } from "tsyringe";
import { IUserMapper } from "../interfaces/mappers/user-mapper.interface";
import { IUser } from "../models/user.model";
import { CreateUserResponseDto, UpdateUserResponseDto, FindUserResponseDto } from "../dtos/user.dto";
import { plainToClass } from "class-transformer";

@injectable()
export class UserMapper implements IUserMapper {
    toCreateUserResponseDto(user: IUser): CreateUserResponseDto {
        return new CreateUserResponseDto({ userName: user.username });
    }
    toUpdateUserResponseDto(user: IUser): UpdateUserResponseDto {
        return new UpdateUserResponseDto({ userName: user.username });
    }
    toFindUserResponseDto(user: IUser): FindUserResponseDto {
        return plainToClass(FindUserResponseDto, user);
    }
}