import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppError from "../utils/appError";
import { Users } from "models/users.model";
import { sendSuccess } from "utils/commonResponse";
import { generateToken } from "helper/jwtToken";
import { comparePasswords } from "helper/bcrypthelper";
import { RecaptchaVerifier } from "helper/verifyRecaptcha";
import {
  generateAndSaveOtp,
  generateAndSaveSignupOtp,
  OtpService,
} from "helper/otpService";
import { sendMail } from "helper/sendMail";
import { otpRepository } from "repositories/otpRepository";
import { log } from "console";

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
      if (confirmPassword !== password) {
        return next(
          new AppError("Password and confirm password must match", 400)
        );
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

      // const otp = OtpService.generateOtp();
      // const expiry = OtpService.getExpiry(5);

      const otp = await generateAndSaveSignupOtp(email, {
        user_name,
        email,
        password,
        role,
      });

      await sendMail(email, "Verify your Signup", `Your OTP is: ${otp}`);

      return sendSuccess(
        res,
        "OTP sent to your email. Verify to complete signup.",
        {
          requiresOtp: true,
          email,
        }
      );

      // const { userPlain, permissionsByFeature, flat } =
      //   await UserRepository.createUserWithPermissions({
      //     user_name,
      //     email,
      //     password,
      //     confirmPassword,
      //     role,
      //   });

      // const token = generateToken({ id: userPlain.id });

      // return sendSuccess(
      //   res,
      //   "User created successfully",
      //   {
      //     ...userPlain,
      //     permissions: { byFeature: permissionsByFeature, flat },
      //   },
      //   201,
      //   token
      // );
    } catch (err) {
      next(err);
    }
  }

  static async verifySignupOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, otp } = req.body;

      const otpRecord = await otpRepository.findValidSignupOtp(email, otp);
      if (!otpRecord) {
        return next(new AppError("Invalid or expired OTP", 400));
      }

      // Create user now
      const { user_name, password, role } = otpRecord;

      if (!user_name || !email || !password || !role) {
        return next(new AppError("Something went wrong", 400));
      }

      const { userPlain, permissionsByFeature, flat } =
        await UserRepository.createUserWithPermissions({
          user_name,
          email,
          password,
          confirmPassword: password,
          role,
        });

      // Cleanup OTP
      await otpRecord.destroy({ force: true });

      // Generate token
      const token = generateToken({ id: userPlain.id });

      return sendSuccess(
        res,
        "Signup completed successfully",
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

      const otp = await generateAndSaveOtp(user.id);

      // await sendMail(user.email, "Your OTP Code", `Your OTP is: ${otp}`);

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

  static async verifySigninOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, otp } = req.body;

      if (!userId || !otp) {
        return next(new AppError("User ID and OTP are required", 400));
      }

      const otpEntry = await otpRepository.findByUserId(userId, otp);

      if (!otpEntry) {
        return next(new AppError("Invalid or expired OTP", 400));
      }

      const user: Users | null = await UserRepository.UserFindByPk(userId);
      if (!user) {
        return next(new AppError("User not found", 404));
      }

      const token = generateToken({ id: user.id });

      const { userPlain, permissionsByFeature, flat } =
        await UserRepository.buildUserWithPermissions(user);

      await otpEntry.destroy();

      return sendSuccess(
        res,
        "OTP verified successfully",
        {
          ...userPlain,
          permissions: { byFeature: permissionsByFeature, flat },
        },
        200,
        token
      );
    } catch (err) {
      next(err);
    }
  }
}
