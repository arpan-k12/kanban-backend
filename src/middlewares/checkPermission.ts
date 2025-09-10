import { Request, Response, NextFunction } from "express";
import AppError from "utils/appError";
import { AuthenticatedRequest } from "./authentication";
import { featureRepository } from "repositories/featureRepository";
import { permissionRepository } from "repositories/permissionRepository";
import { userPermissionRepository } from "repositories/userPermissionRepository";

export function checkPermission(featureName: string, permissionName: string) {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;

      if (user?.role == "0") return next();

      const feature = await featureRepository.findByName(featureName);
      const permission = await permissionRepository.findByName(permissionName);

      if (!feature?.id || !permission?.id || !user?.id) {
        return next(new AppError("something went wrong", 400));
      }

      const exists = await userPermissionRepository.checkUserPermission(
        user?.id,
        feature?.id,
        permission?.id
      );

      if (!exists) {
        return next(new AppError("you don't have permissions", 405));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
