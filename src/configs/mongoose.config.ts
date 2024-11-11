import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const initMongoInstance = async () => {
    try {
        const mongoUri =
            process.env.MONGO_URI || "mongodb://localhost:27017/default-db";

        mongoose.set('strictQuery', true)
        // Connect to MongoDB
        await mongoose.connect(mongoUri);

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

export default initMongoInstance;
