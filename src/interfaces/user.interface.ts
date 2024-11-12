import { Request, Response, NextFunction } from "express";
import { CreateUserDto, CreateUserResponseDto, DeleteUserDto, DeleteUserResponseDto, FindUserDto, FindUserResponseDto, LoginUserDto, LoginUserResponseDto, UpdateUserDto, UpdateUserResponseDto } from "../dtos/user.dto";
import { IUser } from "../models/user.model";

export interface IUserRepository {
    findByUserName(user: FindUserDto): Promise<IUser>;
    findAll(): Promise<IUser[]>;
    create(user: CreateUserDto): Promise<IUser>;
}

export interface IUserService {
    getUserById(user: FindUserDto): Promise<FindUserResponseDto>;
    getAllUsers(): Promise<FindUserResponseDto[]>;
    createUser(user: CreateUserDto): Promise<CreateUserResponseDto>;
    updateUser(user: UpdateUserDto): Promise<UpdateUserResponseDto>;
    deleteUser(id: DeleteUserDto): Promise<DeleteUserResponseDto>;
}

export interface IUserController {
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    logInUser(req: Request, res: Response, next: NextFunction): Promise<void>;

}