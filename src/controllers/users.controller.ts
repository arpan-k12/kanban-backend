import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppError from "../utils/appError";
import { Users } from "models/users.model";
import { sendSuccess } from "utils/commonResponse";
import { generateToken } from "helper/jwtToken";
import { comparePasswords } from "helper/bcrypthelper";

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user_name,
        email,
        password,
        confirmPassword,
        role = "1",
      } = req.body;

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

  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new AppError("Email and password are required", 400));
      }

      const user: Users | null = await UserRepository.findByEmailSignin(email);

      if (!user) {
        return next(new AppError("User not found", 404));
      }

      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        return next(new AppError("Invalid credentials", 401));
      }

      const {
        password: _,
        confirmPassword,
        deletedAt,
        ...userData
      } = user.get({ plain: true });

      const token = generateToken({
        id: user.id,
      });

      return sendSuccess(res, "Login successful", { ...userData }, 200, token);
    } catch (err) {
      next(err);
    }
  }
}
