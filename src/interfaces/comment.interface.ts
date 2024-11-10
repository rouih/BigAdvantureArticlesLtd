export interface ICommentRepository {
    findById(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(comment: any): Promise<any>;
    update(comment: any): Promise<any>;
    delete(id: string): Promise<any>;
}

export interface ICommentService {

}

export interface ICommentController {

}

