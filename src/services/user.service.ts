import { inject, injectable } from "tsyringe";
import { IUserRepository, IUserService } from "../interfaces/user.interface";
import { IUser } from "../models/user.model";
import { FindUserDto, CreateUserDto, UpdateUserDto, DeleteUserDto, FindUserResponseDto, CreateUserResponseDto, UpdateUserResponseDto, DeleteUserResponseDto, LoginUserDto, LoginUserResponseDto } from "../dtos/user.dto";
import jwt from "jsonwebtoken";
import { IUserMapper } from "../interfaces/mappers/user-mapper.interface";
@injectable()
export class UserService implements IUserService {

    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        @inject("IUserMapper") private userMapper: IUserMapper
    ) {

    }
    async getUserById(user: FindUserDto): Promise<FindUserResponseDto> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(): Promise<FindUserResponseDto[]> {
        throw new Error("Method not implemented.");
    }
    async createUser(user: CreateUserDto): Promise<CreateUserResponseDto> {
        const newUser = await this.userRepository.create(user);
        if (!newUser) {
            throw new Error("User already exists");
        }
        // newUser.token = this.generateToken(newUser);
        return this.userMapper.toCreateUserResponseDto(newUser);
    }
    async updateUser(user: UpdateUserDto): Promise<UpdateUserResponseDto> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(id: DeleteUserDto): Promise<DeleteUserResponseDto> {
        throw new Error("Method not implemented.");
    }
}
