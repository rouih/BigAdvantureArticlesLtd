import { Router } from "express";
import ArticleRouts from "./article.routes";
import UserRoutes from "./user.routes";
const router: Router = Router();


router.use("/article", ArticleRouts);
router.use("/user", UserRoutes);

export default router;