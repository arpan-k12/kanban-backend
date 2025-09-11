import crypto from "crypto";

export class OtpService {
  static generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  static getExpiry(minutes = 5): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}
