import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppError from "../utils/appError";
import { Users } from "models/users.model";
import { sendSuccess } from "utils/commonResponse";
import { generateToken } from "helper/jwtToken";

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_name, email, password, confirmPassword, role } = req.body;

      if (!user_name || !email || !password || !role) {
        return next(new AppError("All fields are required", 400));
      }

      if (!["0", "1"].includes(role)) {
        throw new AppError("Invalid user Type", 400);
      }

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return next(new AppError("Email already registered", 400));
      }

      const newUser = await UserRepository.createUser({
        user_name,
        email,
        password,
        confirmPassword,
        role,
      });
      if (!newUser) {
        return next(new AppError("Failed to create the user", 400));
      }
      let user = newUser.get({ plain: true }) as Users | any;

      delete user.password;
      delete user.confirmPassword;
      delete user.deletedAt;

      const token = generateToken({
        id: user.id,
      });

      return sendSuccess(
        res,
        "User created successfully",
        { ...user },
        201,
        token
      );
    } catch (err) {
      next(err);
    }
  }
}
