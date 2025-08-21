import { Response } from "express";

interface SuccessResponse<T = object | string> {
  status: "success";
  statusCode: number;
  message: string;
  data?: T;
  token?: string;
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
  token?: string
) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data,
    ...(token ? { token } : {}),
  } satisfies SuccessResponse<T>);
};
