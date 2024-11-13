import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IUserController, IUserService } from "../../interfaces/user.interface";
import { passport } from "../../configs/passport.config";
import type { RequestWithUser } from "../../types/express.d.ts";
import { IAuthService } from "../../interfaces/auth.interface";
import logger from "../../utils/winston-logger";
import { IUserMapper } from "../../interfaces/mappers/user-mapper.interface";
@injectable()
export class UserController implements IUserController {
    constructor(
        @inject("IUserService") private userService: IUserService,
        @inject("IAuthService") private authService: IAuthService,
        @inject("IUserMapper") private userMapper: IUserMapper
    ) { }
    async logInUser(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        logger.info("User requesting login");
        passport.authenticate("local", { session: false }, (err: Error, user: any, info: any) => {
            if (err || !user) {
                return next(err || new Error("Unauthorized: Invalid Credentials"));
            }

            // Log in the user (without session)
            req.logIn(user, { session: false }, (err) => {
                if (err) {
                    return next(err);
                }
                try {
                    const token = this.authService.generateToken(user.userName);
                    res.status(200).json({ token });
                } catch (err) {
                    next(err);
                }
                // Generate the token using the service layer
            });
        })(req, res, next); // Pass req, res, and next as parameters
    }
    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userIdDto = this.userMapper.toFindUserDto(req.params.id);
            const user = await this.userService.getUserById(userIdDto);
            if (!user) res.status(404).json({ message: "User not found" });
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            if (!users) res.status(404).json({ message: "User not found" });
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body;
            const newUser = await this.userService.createUser(user);
            if (!newUser) res.status(404).json({ message: "User not found or already exists" });
            const token = this.authService.generateToken(newUser.userName);
            res.status(201).json({ newUser, token });
        } catch (err) {
            next(err);
        }
    }

}