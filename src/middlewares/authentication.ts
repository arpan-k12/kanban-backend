import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "helper/jwtToken";
import { UserRepository } from "repositories/userRepository";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "utils/appError";
import { Users } from "models/users.model";

export interface AuthenticatedRequest extends Request {
  user?: Users;
}

export async function authentication(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let idToken = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      idToken = req.headers.authorization.split(" ")[1];
    }
    if (!idToken) {
      return next(new AppError("Please Login to get access", 401));
    }

    const tokenDetail = verifyJwtToken(idToken);

    if (!tokenDetail || !tokenDetail.id) {
      return next(new AppError("Invalid token payload", 401));
    }

    const freshUser = await UserRepository.UserFindByPk(tokenDetail?.id);

    if (!freshUser) {
      return next(new AppError("User no longer exists", 400));
    }

    req.user = freshUser;
    return next();
  } catch (err) {
    return new AppError("Invalid or expired token", 401);
  }
}
