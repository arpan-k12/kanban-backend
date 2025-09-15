import { Request, Response, NextFunction } from "express";
import { CategoryRepository } from "repositories/categoryRespository";
import { sendSuccess } from "utils/commonResponse";

export class CategoryController {
  static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const organization = await CategoryRepository.getAllCategories();

      return sendSuccess(
        res,
        "Categories retrieved successfully",
        organization,
        200
      );
    } catch (err) {
      next(err);
    }
  }
}
