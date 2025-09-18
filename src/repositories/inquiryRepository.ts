import { Inquiry } from "models/inquiry.model";
import { InquiryCreateAttributes } from "../types/models/inquiry.types";
import { generateIdentificationCode } from "helper/generateUniqueCode";
import { InquiryItem } from "models/inquiryitem.model";
import { Product } from "models/product.model";
import { Customers } from "models/customer.model";
import { InquiryItems } from "types/models/inquiryItem.types";

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
    return Inquiry.findByPk(id, {
      include: [
        {
          model: InquiryItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name", "price"],
            },
          ],
        },
        { model: Customers, as: "customer" },
      ],
    });
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

  static async updateInquiryWithItems(
    id: string,
    data: { budget: number; grand_total: number },
    items: InquiryItems[]
  ): Promise<Inquiry | null> {
    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) return null;

    await inquiry.update(data);

    await InquiryItem.destroy({ where: { inquiry_id: id } });

    await InquiryItem.bulkCreate(
      items.map((item) => ({
        inquiry_id: id,
        product_id: item.product_id,
        quantity: item.quantity,
        total_price: item.total_price,
      }))
    );

    return inquiry;
  }
}
