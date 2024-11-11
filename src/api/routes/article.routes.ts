import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { container } from "../../configs/container.config";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateArticleDto, DeleteArticleDto, UpdateArticleDto } from "../../dtos/article.dto";

const router = Router();

const articleController = container.resolve(ArticleController);

router.get("/", (req, res, next) => {
    if (req.query.title) {
        articleController.findArticleByTitle(req, res, next);
    } else {
        articleController.findAllArticles(req, res, next);
    }
});

router.post("/", validateDto(CreateArticleDto), (req, res, next) => articleController.createArticle(req, res, next));

router.put("/", validateDto(UpdateArticleDto), (req, res, next) => articleController.updateArticle(req, res, next));
router.delete("/", validateDto(DeleteArticleDto), (req, res, next) => articleController.deleteArticle(req, res, next));

export default router;