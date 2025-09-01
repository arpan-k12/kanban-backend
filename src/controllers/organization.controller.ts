import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
import { OrganizationRepository } from "repositories/organizationRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class OrganizationController {
  static async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, address, phone, industry } = req.body;

      if (!name || !address || !phone || !industry) {
        return next(
          new AppError(
            "All fields (name, address, phone, industry) are required",
            400
          )
        );
      }

      const organization = await OrganizationRepository.createOrganization({
        name,
        address,
        phone,
        industry,
      });

      return res.status(201).json({
        message: "Organization created successfully",
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const organization = await OrganizationRepository.getAllOrganization();

      return sendSuccess(
        res,
        "Customers retrieved successfully",
        organization,
        200
      );
    } catch (err) {
      next(err);
    }
  }
}
