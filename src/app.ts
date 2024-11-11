import 'reflect-metadata';
import express from "express";
import logger from "./utils/winston-logger";
import { errorHandler } from "./utils/middlewares/error.middleware";
import router from "./api/routes/routes.index";
import initMongoInstance from "./configs/mongoose.config";
import { container } from "./configs/container.config";
import { initElastic } from './elastic';
// import router from "./src/api/routes/routes-index";
// import logger from "./src/utils/winston-logger";
// import { errorHandler } from "./src/utils/middlewares/error.middleware";
// import { passport } from "./src/utils/middlewares/passport.config";


const initServices = async () => {
    try {
        await initMongoInstance();
        await initElastic();
    } catch (err) {
        logger.error(err);
        return;
    }
}

const app = express();
app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)
initServices();
app.listen(3000, () => {
    logger.info("Server is running on port 3000", { service: "Main App" });
});
// app.use("/", router);
// app.use(errorHandler)
// initMongoInstance();
// app.use(passport.initialize())
// app.listen(3000, () => {
//     logger.info("Server is running on port 3000");
// });