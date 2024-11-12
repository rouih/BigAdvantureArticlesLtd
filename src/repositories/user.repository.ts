import { CreateUserDto, DeleteUserDto, FindUserDto, LoginUserDto, LoginUserResponseDto } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/user.interface";
import UserModel, { IUser } from "../models/user.model";

export class UserRepository implements IUserRepository {
    constructor() {

    }
    login(user: LoginUserDto): Promise<LoginUserResponseDto> {
        throw new Error("Method not implemented.");
    }
    findByUserName(user: FindUserDto): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    delete(id: DeleteUserDto): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    async create(user: CreateUserDto): Promise<IUser> {
        return new Promise((resolve, reject) => {
            UserModel.register(
                new UserModel({ username: user.username, fullName: user.fullName }), user.password,
                (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                }
            );
        });
    }
    async update(user: any): Promise<IUser> {
        throw new Error("Method not implemented.");
    }


}