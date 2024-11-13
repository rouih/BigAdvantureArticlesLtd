import { injectable } from "tsyringe";
import { IAuthService } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../types/express";
import { NextFunction, Response } from "express";
import { passport } from "../configs/passport.config";
import logger from "../utils/winston-logger";

@injectable()
export class AuthService implements IAuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

    generateToken(userName: string): string {
        return jwt.sign({ userName }, this.JWT_SECRET, { expiresIn: '1h' });
    }

}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
        if (err || !user) {
            logger.error(err ? err.message : "Unauthorized: Invalid token");
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.User = user;
        req.logIn = user.logIn;
        next();
    })(req, res, next);
};