import { injectable } from "tsyringe";
import { IUserMapper } from "../interfaces/mappers/user-mapper.interface";
import { IUser } from "../models/user.model";
import { CreateUserResponseDto, FindUserResponseDto, FindUserDto } from "../dtos/user.dto";
import { plainToClass } from "class-transformer";

@injectable()
export class UserMapper implements IUserMapper {
    toFindUserDto(id: string): FindUserDto {
        return new FindUserDto({ userId: id });
    }
    toCreateUserResponseDto(user: IUser): CreateUserResponseDto {
        return new CreateUserResponseDto({ userName: user.userName });
    }
    toFindUserResponseDto(user: IUser): FindUserResponseDto {
        return new FindUserResponseDto({ userName: user.userName, fullName: user.fullName });
    }

}