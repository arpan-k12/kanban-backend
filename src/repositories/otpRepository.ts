import { Otp } from "models/otp.model";
import { OtpAttributes } from "types/models/otp.types";
const { Op } = require("sequelize");

export class otpRepository {
  static async findByUserId(userId: string, otp: string): Promise<Otp | null> {
    return Otp.findOne({
      where: {
        user_id: userId,
        otp,
        expiry: { [Op.gt]: new Date() },
      },
    });
  }

  static async saveOtp(user_id: string, otp: string, expiry: Date) {
    return Otp.create({
      user_id,
      user_name: null,
      email: null,
      password: null,
      role: null,
      otp,
      expiry,
    });
  }

  static async findValidSignupOtp(email: string, otp: string) {
    return Otp.findOne({
      where: {
        email,
        otp,
        expiry: { [Op.gt]: new Date() },
      },
    });
  }

  static async saveSignUpOtp(data: OtpAttributes) {
    return Otp.create({
      user_id: null,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      role: data.role,
      otp: data.otp,
      expiry: data.expiry,
    });
  }

  static async deleteOldOtpById(userId: string) {
    return Otp.destroy({
      where: {
        [Op.or]: [{ user_id: userId }, { expiry: { [Op.lt]: new Date() } }],
      },
      force: true,
    });
  }
  static async deleteOldOtpByMail(email: string) {
    return Otp.destroy({
      where: {
        [Op.or]: [{ email: email }, { expiry: { [Op.lt]: new Date() } }],
      },
      force: true,
    });
  }
}
