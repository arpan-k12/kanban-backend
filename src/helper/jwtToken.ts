import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "config/dotenv.config";
import jwt, { SignOptions } from "jsonwebtoken";

const jwtSecret = JWT_SECRET_KEY;
const jwtExpiresIn = JWT_EXPIRES_IN as SignOptions["expiresIn"];

export interface JwtPayload {
  id: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, jwtSecret) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return null;
  }
}
