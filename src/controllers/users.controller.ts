import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
import { UserRepository } from "repositories/userRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class UserController {
  static async getAllUsers(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await UserRepository.findAll();

      return sendSuccess(res, "Users retrieved successfully", users);
    } catch (error) {
      next(error);
    }
  }
}
