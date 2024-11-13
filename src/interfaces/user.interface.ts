import { Request, Response, NextFunction } from "express";
import { CreateUserDto, CreateUserResponseDto, FindUserDto, FindUserResponseDto } from "../dtos/user.dto";
import { IUser } from "../models/user.model";

export interface IUserRepository {
    findByUserId(user: FindUserDto): Promise<IUser>;
    findAll(): Promise<IUser[]>;
    create(user: CreateUserDto): Promise<IUser>;
}

export interface IUserService {
    getUserById(user: FindUserDto): Promise<FindUserResponseDto>;
    getAllUsers(): Promise<FindUserResponseDto[]>;
    createUser(user: CreateUserDto): Promise<CreateUserResponseDto>;

}

export interface IUserController {
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    logInUser(req: Request, res: Response, next: NextFunction): Promise<void>;

}