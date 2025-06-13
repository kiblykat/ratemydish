import { Request, Response, NextFunction } from "express";
import { GraphQLError } from "graphql";
import { logger } from "../utils/logger";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error | GraphQLError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error(`[${err.statusCode}] ${err.message}`);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof GraphQLError) {
    logger.error(`[GraphQL Error] ${err.message}`);
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle unknown errors
  logger.error(`[500] ${err.message}`);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
