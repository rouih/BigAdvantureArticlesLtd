import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { container } from "../../configs/container.config";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateArticleDto, FindArticleWithMostWordOccurrencesDto, SearchArticleDto } from "../../dtos/article.dto";
import { authMiddleware } from "../../services/auth.service";
import { RequestWithUser } from "../../types/express";

const router = Router();

const articleController = container.resolve(ArticleController);

router.get("/", (req, res, next) => {
    if (req.body.title) {
        articleController.findArticleByTitle(req, res, next);
    } else {
        articleController.findAll(req, res, next);
    }
});
router.get("/search", validateDto(SearchArticleDto), (req, res, next) => articleController.search(req, res, next));
router.post("/", authMiddleware, validateDto(CreateArticleDto), (req, res, next) => articleController.createArticle(req, res, next));
router.get("/common/:word", (req, res, next) => articleController.findArticleWithMostWordOccurrences(req, res, next));

export default router;