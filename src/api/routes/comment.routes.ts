
import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { container } from "../../configs/container.config";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateCommentDto, FindCommentsByArticleDto, FindCommentByIdDto } from "../../dtos/comment.dto";
import { authMiddleware } from "../../services/auth.service";


const router = Router();
const commentController = container.resolve(CommentController);

router.post("/", authMiddleware, validateDto(CreateCommentDto), (req, res, next) => commentController.create(req, res, next));
router.get("/:articleId", (req, res, next) => commentController.findCommentsByArticle(req, res, next));
router.get("/:id", (req, res, next) => commentController.findCommentById(req, res, next));

export default router;