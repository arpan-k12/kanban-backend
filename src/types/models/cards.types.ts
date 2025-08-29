export interface CardAttributes {
  id: string;
  column_id: string;
  card_position: number;
  customer_id: string;
  inquiry_id: string;
  quote_id: string;
  decision_id: string;
  summary: string;
  assigned_to: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type CardCreateAttributes = Partial<CardAttributes>;
