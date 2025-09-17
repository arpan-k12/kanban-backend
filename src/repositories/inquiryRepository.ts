import { Inquiry } from "models/inquiry.model";
import { InquiryCreateAttributes } from "../types/models/inquiry.types";
import { generateIdentificationCode } from "helper/generateUniqueCode";

export class InquiryRepository {
  static async createInquiry(
    data: InquiryCreateAttributes
  ): Promise<Inquiry | null> {
    return Inquiry.create(data);
  }
  static async updateInquiry(
    id: string,
    data: Partial<InquiryCreateAttributes>
  ): Promise<Inquiry | null> {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) {
      return null;
    }
    await inquiry.update(data);
    return inquiry;
  }
  static async deleteInquiry(id: string): Promise<Inquiry | null> {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) {
      return null;
    }
    await inquiry.destroy();
    return inquiry;
  }

  static async getAllInquiries(): Promise<Inquiry[]> {
    return Inquiry.findAll({ include: ["customer"] });
  }

  static async getInquiryById(id: string): Promise<Inquiry | null> {
    return Inquiry.findByPk(id, { include: ["customer"] });
  }

  static async getUniqueIdentificationCode(): Promise<string> {
    let code: string;
    let exists = true;

    do {
      code = generateIdentificationCode(6);
      const existing = await Inquiry.findOne({
        where: { identification_code: code },
      });
      exists = !!existing;
    } while (exists);

    return code;
  }
}
