import { Request, Response, NextFunction } from "express";
import { userOrganizationRepository } from "repositories/userOrganizationRepository";
import { UserRepository } from "repositories/userRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class userOrganizationController {
  static async assignOrganization(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user_id, organization_ids } = req.body;

      if (!user_id || !organization_ids || !Array.isArray(organization_ids)) {
        return next(
          new AppError("user_id and organization_ids[] are required", 400)
        );
      }
      const user = await UserRepository.UserFindByPk(user_id);
      if (!user) {
        return next(new AppError("User not found", 404));
      }

      await user.$set("organizations", organization_ids);

      return sendSuccess(
        res,
        "User assigned to organization successfully",
        null,
        200
      );
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrganization(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await userOrganizationRepository.getAllUserOrganizations();

      if (!users || users.length === 0) {
        return next(new AppError("No user-organization mappings found", 404));
      }

      return sendSuccess(
        res,
        "User-organization mappings fetched successfully",
        users,
        200
      );
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrganizationsById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new AppError("UserOrganization ID is required", 400));
      }

      const userOrganization =
        await userOrganizationRepository.getUserOrganizationById(id);

      if (!userOrganization) {
        return next(new AppError("UserOrganization not found", 404));
      }

      return sendSuccess(
        res,
        "User-organization mapping fetched successfully",
        userOrganization,
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
