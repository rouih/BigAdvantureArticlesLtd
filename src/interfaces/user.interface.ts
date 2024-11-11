import { CreateUserResponseDto, DeleteUserResponseDto, GetUserDto, GetUserResponseDto, UpdateUserResponseDto } from "../dtos/user.dto";
import { IUser } from "../models/user.model";

export interface IUserRepository {
    findById(id: string): Promise<IUser>;
    findAll(): Promise<IUser[]>;
    create(user: any): Promise<IUser>;
    update(user: any): Promise<IUser>;
    delete(id: string): Promise<IUser>;
}

export interface IUserService {
    getUserById(id: string): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(user: IUser): Promise<IUser>;
    deleteUser(id: string): Promise<IUser>;

}

export interface IUserController {
    getUserById(req: Request, res: Response): Promise<GetUserResponseDto>;
    getAllUsers(req: Request, res: Response): Promise<GetUserResponseDto[]>;
    createUser(req: Request, res: Response): Promise<CreateUserResponseDto>;
    updateUser(req: Request, res: Response): Promise<UpdateUserResponseDto>;
    deleteUser(req: Request, res: Response): Promise<DeleteUserResponseDto>;

}