import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication";
import AppError from "utils/appError";

export class AuthMiddleware {
  static restrictTo(...allowedUserTypes: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (!req.user || !allowedUserTypes.includes(req.user.role)) {
        return next(
          new AppError("You don't have permission to perform this action", 403)
        );
      }
      next();
    };
  }
}
