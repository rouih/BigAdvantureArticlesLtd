import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IUserController, IUserService } from "../../interfaces/user.interface";
import { FindUserDto, CreateUserDto, UpdateUserDto, DeleteUserDto, CreateUserResponseDto, DeleteUserResponseDto, FindUserResponseDto, UpdateUserResponseDto } from "../../dtos/user.dto";

@injectable()
export class UserController implements IUserController {
    constructor(
        @inject("IUserService") private userService: IUserService
    ) { }
    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body;
            const newUser = await this.userService.createUser(user);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }
    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

}