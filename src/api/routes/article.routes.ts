import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { container } from "../../configs/container.config";
// import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateArticleDto } from "../../dtos/article.dto";

const router = Router();

const articleController = container.resolve(ArticleController);

router.get("/", (req, res, next) => {
    if (req.query.title) {
        articleController.findArticleByTitle(req, res, next);
    } else {
        articleController.findAllArticles(req, res, next);
    }
});

router.post("/", articleController.createArticle);

export default router;