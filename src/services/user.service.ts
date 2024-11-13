import { inject, injectable } from "tsyringe";
import { IUserRepository, IUserService } from "../interfaces/user.interface";
import { FindUserDto, CreateUserDto, FindUserResponseDto, CreateUserResponseDto } from "../dtos/user.dto";
import { IUserMapper } from "../interfaces/mappers/user-mapper.interface";
@injectable()
export class UserService implements IUserService {

    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        @inject("IUserMapper") private userMapper: IUserMapper
    ) {

    }
    async getUserById(user: FindUserDto): Promise<FindUserResponseDto> {
        const userData = await this.userRepository.findByUserId(user);
        return this.userMapper.toFindUserResponseDto(userData);
    }
    async getAllUsers(): Promise<FindUserResponseDto[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => this.userMapper.toFindUserResponseDto(user));
    }
    async createUser(user: CreateUserDto): Promise<CreateUserResponseDto> {
        const newUser = await this.userRepository.create(user);
        if (!newUser) {
            throw new Error("User already exists");
        }
        return this.userMapper.toCreateUserResponseDto(newUser);
    }
}
