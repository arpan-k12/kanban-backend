import dotenv from "dotenv";
dotenv.config();

export const APP_PORT = parseInt(process.env.APP_PORT ?? "3000", 10);
export const HOST = process.env.HOST as string;
export type Environment = "development" | "test" | "production";
export const NODE_ENV: Environment =
  (process.env.NODE_ENV as Environment) ?? "development";

export const DB_USERNAME = process.env.DB_USERNAME as string;
export const DB_PASSWORD = process.env.DB_PASSWORD as string;
export const DB_NAME = process.env.DB_NAME as string;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_PORT = parseInt(process.env.DB_PORT ?? "5432", 10);

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
