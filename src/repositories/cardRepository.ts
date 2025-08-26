import { Cards } from "models/cards.model";
import { CardCreateAttributes } from "types/models/cards.types";

export class CardRepository {
  static async createCard(data: CardCreateAttributes): Promise<Cards | null> {
    return Cards.create(data);
  }

  static async getCardByInquiryId(inquiry_id: string): Promise<Cards | null> {
    return Cards.findOne({ where: { inquiry_id } });
  }

  static async updateCard(
    id: string,
    data: Partial<CardCreateAttributes>
  ): Promise<Cards | null> {
    const card = await Cards.findByPk(id, { include: ["column"] });
    if (!card) {
      return null;
    }
    await card.update(data);
    await card.reload({ include: ["column"] });
    return card;
  }

  static async getCardById(id: string): Promise<Cards | null> {
    return Cards.findByPk(id, { include: ["column"] });
  }
  static async getAllCards(userId: string): Promise<Cards[]> {
    return Cards.findAll({
      where: { assigned_to: userId },
      include: ["column", "inquiry", "customer", "quote", "decision"],
    });
  }
}
