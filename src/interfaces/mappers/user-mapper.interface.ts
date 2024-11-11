import { CreateUserResponseDto, FindUserResponseDto, UpdateUserResponseDto } from "../../dtos/user.dto";
import { IUser } from "../../models/user.model";


export interface IUserMapper {
    toCreateUserResponseDto(user: IUser): CreateUserResponseDto;
    toUpdateUserResponseDto(user: IUser): UpdateUserResponseDto;
    toFindUserResponseDto(user: IUser): FindUserResponseDto;
}