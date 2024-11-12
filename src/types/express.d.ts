import { Request } from 'express';

interface RequestWithUser extends Request {
    user: {
        userName: string;
    },


}

export { RequestWithUser };