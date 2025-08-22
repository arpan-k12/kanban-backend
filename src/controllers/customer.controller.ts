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

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { c_name, c_email } = req.body;

      if (!c_name || !c_email) {
        return next(new AppError("Name and email are required", 400));
      }

      const data = { c_name, c_email };

      const updatedCustomer = await CustomerRepository.updateCustomer(id, data);

      if (!updatedCustomer) {
        return next(new AppError("Customer not found or update failed", 404));
      }

      return sendSuccess(
        res,
        "Customer updated successfully",
        updatedCustomer,
        200
      );
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const customer = await CustomerRepository.deleteCustomer(id);

      if (!customer) {
        return next(new AppError("Customer not found or delete failed", 404));
      }

      return sendSuccess(res, "Customer deleted successfully", null, 200);
    } catch (err) {
      next(err);
    }
  }
  static async getAllCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await CustomerRepository.getAllCustomers();

      return sendSuccess(
        res,
        "Customers retrieved successfully",
        customers,
        200
      );
    } catch (err) {
      next(err);
    }
  }
  static async getCustomerById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const customer = await CustomerRepository.getCustomerById(id);

      if (!customer) {
        return next(new AppError("Customer not found", 404));
      }

      return sendSuccess(res, "Customer retrieved successfully", customer, 200);
    } catch (err) {
      next(err);
    }
  }
}
