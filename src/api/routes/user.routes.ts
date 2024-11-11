import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { container } from "../../configs/container.config";

const router = Router();

const userController = container.resolve(UserController);

router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));

router.post("/", (req, res, next) => userController.createUser(req, res, next));

export default router;