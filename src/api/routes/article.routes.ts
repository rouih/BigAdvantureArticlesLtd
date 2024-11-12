import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { container } from "../../configs/container.config";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateArticleDto, DeleteArticleDto, SearchArticleDto, UpdateArticleDto } from "../../dtos/article.dto";
import { authMiddleware } from "../../services/auth.service";
import { RequestWithUser } from "../../types/express";

const router = Router();

const articleController = container.resolve(ArticleController);

router.get("/", (req, res, next) => {
    if (req.query.title) {
        articleController.findArticleByTitle(req, res, next);
    } else {
        articleController.findAllArticles(req, res, next);
    }
});
router.get("/search", validateDto(SearchArticleDto), (req, res, next) => articleController.search(req, res, next));
router.post("/", authMiddleware, validateDto(CreateArticleDto), (req, res, next) => articleController.createArticle(req, res, next));

router.put("/", validateDto(UpdateArticleDto), (req, res, next) => articleController.updateArticle(req, res, next));
router.delete("/", validateDto(DeleteArticleDto), (req, res, next) => articleController.deleteArticle(req, res, next));

export default router;