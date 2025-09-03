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

      return sendSuccess(
        res,
        "Organization created successfully",
        organization,
        201
      );
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

  static async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { name, address, phone, industry } = req.body;

      if (!id) {
        return next(new AppError("Organization ID is required", 400));
      }

      if (!name || !address || !phone || !industry) {
        return next(new AppError("All fields are required", 400));
      }

      const organization = await OrganizationRepository.findById(id);

      if (!organization) {
        return next(new AppError("Organization not found", 404));
      }

      const updatedOrganization =
        await OrganizationRepository.updateOrganization(id, {
          name,
          address,
          phone,
          industry,
        });

      return sendSuccess(
        res,
        "Organization updated successfully",
        updatedOrganization,
        200
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new AppError("Organization ID is required", 400));
      }

      const organization = await OrganizationRepository.findById(id);

      if (!organization) {
        return next(new AppError("Organization not found", 404));
      }

      await OrganizationRepository.deleteOrganization(id);

      return sendSuccess(res, "Organization deleted successfully", null, 200);
    } catch (error) {
      next(error);
    }
  }
  static async getOrgById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new AppError("Organization ID is required", 400));
      }

      const organization = await OrganizationRepository.findById(id);

      if (!organization) {
        return next(new AppError("Organization not found", 404));
      }

      return sendSuccess(
        res,
        "Organization fetched successfully",
        organization,
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
