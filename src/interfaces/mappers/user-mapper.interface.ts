import { CreateUserResponseDto, FindUserDto, FindUserResponseDto } from "../../dtos/user.dto";
import { IUser } from "../../models/user.model";


export interface IUserMapper {
    toCreateUserResponseDto(user: IUser): CreateUserResponseDto;
    toFindUserResponseDto(user: IUser): FindUserResponseDto;
    toFindUserDto(id: string): FindUserDto;
}