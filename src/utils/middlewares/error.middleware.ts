import { Request, Response, NextFunction } from "express";
import logger from "../winston-logger";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    logger.error(err.stack || err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Send a JSON response with the error details
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}