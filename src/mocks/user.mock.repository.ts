
import { CreateUserDto, FindUserDto } from "../dtos/user.dto";
import { IUserRepository } from "../interfaces/user.interface";
import { IUser } from "../models/user.model";

export class MockUserRepository implements IUserRepository {
    create = jest.fn<Promise<IUser>, [CreateUserDto]>();
    findByUserId = jest.fn<Promise<IUser>, [FindUserDto]>();
    findAll = jest.fn<Promise<IUser[]>, []>();
}