import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppError from "../utils/appError";
import { Users } from "models/users.model";
import { sendSuccess } from "utils/commonResponse";
import { generateToken } from "helper/jwtToken";
import { comparePasswords } from "helper/bcrypthelper";
import { RecaptchaVerifier } from "helper/verifyRecaptcha";
import { OtpService } from "helper/otpService";
import { sendMail } from "helper/sendMail";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user_name,
        email,
        password,
        confirmPassword,
        recaptcha,
        role = "1",
      } = req.body;

      if (!user_name || !email || !password || !role || !recaptcha) {
        return next(new AppError("All fields are required", 400));
      }
      const recaptchaVerifier = new RecaptchaVerifier();
      const recaptchaResult = await recaptchaVerifier.verify(recaptcha);

      if (!recaptchaResult.success) {
        return next(new AppError("Invalid reCAPTCHA verification", 400));
      }

      if (!["0", "1"].includes(role)) {
        throw new AppError("Invalid user Type", 400);
      }

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return next(new AppError("Email already registered", 400));
      }

      const { userPlain, permissionsByFeature, flat } =
        await UserRepository.createUserWithPermissions({
          user_name,
          email,
          password,
          confirmPassword,
          role,
        });

      const token = generateToken({ id: userPlain.id });

      return sendSuccess(
        res,
        "User created successfully",
        {
          ...userPlain,
          permissions: { byFeature: permissionsByFeature, flat },
        },
        201,
        token
      );
    } catch (err) {
      next(err);
    }
  }

  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, recaptcha } = req.body;

      if (!email || !password || !recaptcha) {
        return next(
          new AppError("Email password and recaptcha are required", 400)
        );
      }

      const recaptchaVerifier = new RecaptchaVerifier();
      const recaptchaResult = await recaptchaVerifier.verify(recaptcha);

      if (!recaptchaResult.success) {
        return next(new AppError("Invalid reCAPTCHA verification", 400));
      }

      const user = await UserRepository.findByEmailSignin(email);
      if (!user || !(await comparePasswords(password, user.password))) {
        return next(new AppError("Invalid credentials", 401));
      }

      const otp = OtpService.generateOtp();
      const expiry = OtpService.getExpiry(5);

      await UserRepository.saveOtp(user.id, otp, expiry);

      await sendMail(user.email, "Your OTP Code", `Your OTP is: ${otp}`);

      // const user: Users | null = await UserRepository.findByEmailSignin(email);

      // if (!user) {
      //   return next(new AppError("Invalid credentials", 401));
      // }

      // const isMatch = await comparePasswords(password, user.password);
      // if (!isMatch) {
      //   return next(new AppError("Invalid credentials", 401));
      // }

      // const token = generateToken({ id: user.id });

      // const { userPlain, permissionsByFeature, flat } =
      //   await UserRepository.buildUserWithPermissions(user);

      // return sendSuccess(
      //   res,
      //   "Login successful",
      //   {
      //     ...userPlain,
      //     permissions: { byFeature: permissionsByFeature, flat },
      //   },
      //   200,
      //   token
      // );
      return sendSuccess(
        res,
        "OTP sent to your email",
        { requiresOtp: true, userId: user.id },
        200
      );
    } catch (err) {
      next(err);
    }
  }
}
