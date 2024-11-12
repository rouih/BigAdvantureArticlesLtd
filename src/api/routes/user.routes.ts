import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { container } from "../../configs/container.config";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateUserDto, LoginUserDto } from "../../dtos/user.dto";
import { RequestWithUser } from "../../types/express";

const router = Router();

const userController = container.resolve(UserController);

router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));
router.get("/login", validateDto(LoginUserDto), (req, res, next) => userController.logInUser(req as RequestWithUser, res, next));
router.post("/", validateDto(CreateUserDto), (req, res, next) => userController.createUser(req, res, next));


export default router;