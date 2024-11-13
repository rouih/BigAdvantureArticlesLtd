import { injectable } from "tsyringe";
import { IAuthService } from "../../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../types/express";
import { NextFunction, Response } from "express";
import { passport } from "../../configs/passport.config";
import logger from "../winston-logger";


export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
        if (err || !user) {
            logger.error(err ? err.message : "Unauthorized: Invalid token");
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = user;
        next();
    })(req, res, next);
};