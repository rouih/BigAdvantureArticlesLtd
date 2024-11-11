import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/winston-logger";

dotenv.config(); // Load environment variables from .env file

const initMongoInstance = async () => {
    const mongoUri =
        process.env.MONGO_URI || "mongodb://localhost:27017/default-db";
    mongoose.set('strictQuery', true)
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions).then(() => logger.info("Connected to MongoDB"))
        .catch((err) => logger.error(err));
};

export default initMongoInstance;
