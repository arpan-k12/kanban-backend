export interface QuoteAttributes {
  id: string;
  card_id: string;
  amount: number;
  valid_until: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type QuoteCreateAttributes = Partial<QuoteAttributes>;
