import { InquiryItem } from "models/inquiryitem.model";
import { InquiryItems } from "types/models/inquiryItem.types";

export class InquiryItemRepository {
  static async create(
    items: InquiryItems[],
    inquiry_id: string
  ): Promise<InquiryItem[]> {
    const itemsToCreate = items.map((item) => ({
      inquiry_id,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.total_price,
    }));

    const createdItems = await InquiryItem.bulkCreate(itemsToCreate, {
      validate: true,
    });

    return createdItems;
  }
}
