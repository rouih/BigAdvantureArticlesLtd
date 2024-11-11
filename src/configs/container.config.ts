import { container } from "tsyringe";
import { IUserController, IUserRepository, IUserService } from "../interfaces/user.interface";
import { IArticleController, IArticleRepository, IArticleService } from "../interfaces/article.interface";
import { ICommentController, ICommentRepository, ICommentService } from "../interfaces/comment.interface";
import { ArticleRepository } from "../repositories/article.repository";
import { ArticleService } from "../services/article.service";
import { ArticleController } from "../api/controllers/article.controller";
import { ArticleMapper } from "../mappers/article.mapper";
import { IArticleMapper } from "../interfaces/mappers/article-mapper.interface";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../api/controllers/user.controller";
import { UserMapper } from "../mappers/user.mapper";
import { IUserMapper } from "../interfaces/mappers/user-mapper.interface";

//Register repositories
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
container.registerSingleton<IArticleRepository>("IArticleRepository", ArticleRepository);
//container.registerSingleton<ICommentRepository>("ICommentRepository", CommentRepository);

//register mappers
container.registerSingleton<IArticleMapper>("IArticleMapper", ArticleMapper);
container.registerSingleton<IUserMapper>("IUserMapper", UserMapper);
//Register services
container.registerSingleton<IUserService>("IUserService", UserService);
//container.registerSingleton<ICommentService>("ICommentService", CommentService);
container.registerSingleton<IArticleService>("IArticleService", ArticleService);

//Register controllers
container.registerSingleton<IUserController>("IUserController", UserController);
container.registerSingleton<IArticleController>("IArticleController", ArticleController);
//container.registerSingleton<ICommentController>("ICommentController", CommentController);

export { container }