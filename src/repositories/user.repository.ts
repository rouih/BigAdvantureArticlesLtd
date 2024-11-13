import { CreateUserDto, FindUserDto } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/user.interface";
import UserModel, { IUser } from "../models/user.model";

export class UserRepository implements IUserRepository {
    constructor() {

    }
    async findByUserId(user: FindUserDto): Promise<IUser> {
        return UserModel.findOne({ id: user.userId }).lean();
    }
    async findAll(): Promise<IUser[]> {
        return UserModel.find();
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


}