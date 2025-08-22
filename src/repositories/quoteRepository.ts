import { Quote } from "models/quotes.model";
import { QuoteCreateAttributes } from "types/models/quote.types";

export class QuoteRepository {
  static async createQuote(data: QuoteCreateAttributes): Promise<Quote | null> {
    return Quote.create(data);
  }
  static async updateQuote(
    id: string,
    data: Partial<QuoteCreateAttributes>
  ): Promise<Quote | null> {
    const quote = await Quote.findByPk(id);
    if (!quote) {
      return null;
    }
    await quote.update(data);
    return quote;
  }
}
