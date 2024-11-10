export interface IUserRepository {
    findById(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(user: any): Promise<any>;
    update(user: any): Promise<any>;
    delete(id: string): Promise<any>;
}

export interface IUserService {

}

export interface IUserController {

}