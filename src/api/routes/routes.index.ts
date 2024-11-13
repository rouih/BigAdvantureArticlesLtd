import { Router } from "express";
import ArticleRouts from "./article.routes";
import UserRoutes from "./user.routes";
import CommentRoutes from "./comment.routes";
const router: Router = Router();


router.use("/article", ArticleRouts);
router.use("/user", UserRoutes);
router.use("/article/comment", CommentRoutes);

export default router;