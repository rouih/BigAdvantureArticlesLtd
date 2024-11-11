import { Router } from "express";
import ArticleRouts from "./article.routes";

const router: Router = Router();


router.use("/article", ArticleRouts);

export default router;