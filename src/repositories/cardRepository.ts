import { sortFieldMap } from "helper/sortFields";
import { Cards } from "models/cards.model";
import { Customers } from "models/customer.model";
import { Decision } from "models/decision.model";
import { Inquiry } from "models/inquiry.model";
import { InquiryItem } from "models/inquiryitem.model";
import { KanbanColumn } from "models/kanbanColumn.model";
import { Product } from "models/product.model";
import { Quote } from "models/quotes.model";
import { CardCreateAttributes } from "types/models/cards.types";

export class CardRepository {
  static async createCard(data: CardCreateAttributes): Promise<Cards | null> {
    return Cards.create(data);
  }

  static async incrementCardPositions(columnId: string): Promise<void> {
    await Cards.increment(
      { card_position: 1 },
      { where: { column_id: columnId } }
    );
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
  // static async getAllCards(userId: string): Promise<Cards[]> {
  //   return Cards.findAll({
  //     where: { assigned_to: userId },
  //     include: ["column", "inquiry", "customer", "quote", "decision"],
  //   });
  // }

  static async getAllCards(userId: string): Promise<Cards[]> {
    return Cards.findAll({
      where: { assigned_to: userId },
      include: ["column", "inquiry", "customer", "quote", "decision"],
      order: [
        ["column_id", "ASC"],
        ["card_position", "ASC"],
      ],
    });
  }

  static async getMaxCardPosition(column_id: string): Promise<number | null> {
    return Cards.max("card_position", { where: { column_id } });
  }

  static async reorderColumnCards(column_id: string): Promise<void> {
    const cards = await Cards.findAll({
      where: { column_id },
      order: [["card_position", "ASC"]],
    });
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].card_position !== i + 1) {
        await cards[i].update({ card_position: i + 1 });
      }
    }
  }

  static async getCardsByColumnId(column_id: string): Promise<Cards[]> {
    return Cards.findAll({
      where: { column_id },
      order: [["card_position", "ASC"]],
      include: ["column", "inquiry", "customer", "quote", "decision"],
    });
  }

  static async shiftCardWithinColumn(
    card_id: string,
    column_id: string,
    oldPos: number,
    newPos: number
  ): Promise<void> {
    if (oldPos === newPos) return;
    const cards = await Cards.findAll({
      where: { column_id },
      order: [["card_position", "ASC"]],
    });

    const movingCard = cards.find((card) => card.id === card_id);
    if (!movingCard) return;

    const filtered = cards.filter((card) => card.id !== card_id);

    filtered.splice(newPos - 1, 0, movingCard);

    for (let i = 0; i < filtered.length; i++) {
      await filtered[i].update({ card_position: i + 1 });
    }
    await movingCard.update({ card_position: newPos });
  }

  static async removeCardFromColumn(
    card_id: string,
    column_id: string
  ): Promise<void> {
    const cards = await Cards.findAll({
      where: { column_id },
      order: [["card_position", "ASC"]],
    });
    let pos = 1;
    for (const card of cards) {
      if (card.id !== card_id) {
        await card.update({ card_position: pos++ });
      }
    }
  }

  static async insertCardToColumn(
    card_id: string,
    column_id: string,
    card_position: number
  ): Promise<void> {
    const cards = await Cards.findAll({
      where: { column_id },
      order: [["card_position", "ASC"]],
    });
    for (let i = cards.length - 1; i >= card_position - 1; i--) {
      await cards[i].update({ card_position: cards[i].card_position + 1 });
    }
    await Cards.update(
      { column_id, card_position },
      { where: { id: card_id } }
    );
  }
  static async getAllCardsWithColumnSort(
    userId: string,
    columnId?: string,
    sort?: string,
    organizationId?: string
  ): Promise<Cards[]> {
    const cards = await Cards.findAll({
      where: { assigned_to: userId, organization_id: organizationId },
      include: [
        { model: KanbanColumn, as: "column" },
        {
          model: Inquiry,
          as: "inquiry",
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
            // { model: Customers, as: "customer" },
          ],
        },
        { model: Customers, as: "customer" },
        { model: Quote, as: "quote" },
        { model: Decision, as: "decision" },
      ],
      order: [
        ["column_id", "ASC"],
        ["card_position", "ASC"],
      ],
    });

    if (columnId && sort) {
      const [rawKey, directionRaw] = sort.split(":");
      const direction =
        directionRaw && directionRaw.toLowerCase() === "desc" ? "DESC" : "ASC";

      const mapping = sortFieldMap[rawKey];

      if (mapping) {
        const targetCards = cards.filter((c) => c.column_id === columnId);
        const otherCards = cards.filter((c) => c.column_id !== columnId);

        targetCards.sort((a: any, b: any) => {
          let aVal, bVal;

          if (mapping.assoc) {
            aVal = (a as any)[mapping.assoc]?.[mapping.field];
            bVal = (b as any)[mapping.assoc]?.[mapping.field];
          } else {
            aVal = (a as any)[mapping.field];
            bVal = (b as any)[mapping.field];
          }

          if (aVal == null) return 1;
          if (bVal == null) return -1;

          if (aVal < bVal) return direction === "ASC" ? -1 : 1;
          if (aVal > bVal) return direction === "ASC" ? 1 : -1;
          return 0;
        });

        return [...otherCards, ...targetCards];
      }
    }

    return cards;
  }
}
