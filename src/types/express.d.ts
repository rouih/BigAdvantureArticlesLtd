import { Request } from 'express';

interface RequestWithUser extends Request {
    User?: {
        id: string;
        userName: string;
    },
}

export { RequestWithUser };