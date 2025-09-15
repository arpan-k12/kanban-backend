import crypto from "crypto";
import { otpRepository } from "repositories/otpRepository";

export class OtpService {
  static generateOtp(): string {
    // return crypto.randomInt(100000, 999999).toString();
    return "123456";
  }

  static getExpiry(minutes = 5): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}

export async function generateAndSaveOtp(userId: string) {
  const otp = OtpService.generateOtp();
  const expiry = OtpService.getExpiry(5);

  await otpRepository.deleteOldOtpById(userId);

  await otpRepository.saveOtp(userId, otp, expiry);
  return otp;
}

export async function generateAndSaveSignupOtp(email: string, userData: any) {
  const otp = OtpService.generateOtp();
  const expiry = OtpService.getExpiry(5);

  await otpRepository.deleteOldOtpByMail(email);

  const fullUserData = {
    ...userData,
    otp,
    expiry,
  };

  await otpRepository.saveSignUpOtp(fullUserData);
  return otp;
}
