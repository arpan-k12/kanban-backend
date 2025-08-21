import { Request, Response, NextFunction } from "express";
import { CustomerRepository } from "repositories/customerRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class CustomerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { c_name, c_email } = req.body;

      if (!c_name || !c_email) {
        return next(new AppError("Name, email, and phone are required", 400));
      }

      const data = { c_name, c_email };

      const newCustomer = await CustomerRepository.createCustomer(data);

      if (!newCustomer) {
        return next(new AppError("Failed to create the customer", 400));
      }

      return sendSuccess(
        res,
        "Customer created successfully",
        newCustomer,
        201
      );
    } catch (err) {
      next(err);
    }
  }
}
