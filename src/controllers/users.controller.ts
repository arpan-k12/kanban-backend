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

  static async getUserPermissions(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.id;
    try {
      const user = await UserRepository.UserFindByPk(userId);
      if (!user) return next(new AppError("User not found", 404));

      const data = await UserRepository.fetchUserPermissionData(userId);
      if (!data) {
        next(new AppError("User not have any permission", 404));
      }
      return sendSuccess(res, "User permissions fetched", { ...data, user });
    } catch (err) {
      next(err);
    }
  }

  static async updateUserPermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.params.id;
    const body = req.body as {
      permissionsByFeature?: Record<string, string[]>;
    };

    try {
      if (!body || typeof body.permissionsByFeature !== "object") {
        return next(
          new AppError(
            "Invalid payload. Expect { permissionsByFeature: { <featureId>: [<permissionId>] } }",
            400
          )
        );
      }
      const user = await UserRepository.UserFindByPk(userId);
      if (!user) return next(new AppError("User not found", 404));

      await UserRepository.updateUserPermissions(
        userId,
        body.permissionsByFeature
      );

      return sendSuccess(res, "Permissions updated successfully");
    } catch (error) {
      next(error);
    }
  }
}
