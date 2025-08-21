import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  errors?: { message: string }[];
}

class ErrorHandler {
  private sendErrorDev(error: CustomError, res: Response): void {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";

    res.status(statusCode).json({
      status,
      message: error.message,
      stack: error.stack,
    });
  }

  private sendErrorProd(error: CustomError, res: Response): void {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";

    if (error.isOperational) {
      res.status(statusCode).json({
        status,
        message: error.message,
      });
    } else {
      console.error("ERROR:", error.name, error.message, error.stack);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong",
      });
    }
  }

  public handle = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    let error: CustomError = { ...err, message: err.message };

    if (err.name === "JsonWebTokenError") {
      error = new AppError("Invalid token", 401);
    }

    if (err.name === "SequelizeValidationError" && err.errors?.length) {
      error = new AppError(err.errors[0].message, 400);
    }

    if (err.name === "SequelizeUniqueConstraintError" && err.errors?.length) {
      error = new AppError(err.errors[0].message, 400);
    }

    if (process.env.NODE_ENV === "development") {
      this.sendErrorDev(error, res);
    } else {
      this.sendErrorProd(error, res);
    }
  };
}

export default new ErrorHandler().handle;
