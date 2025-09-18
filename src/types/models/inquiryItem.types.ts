export interface InquiryItemAttributes {
  id: string;
  inquiry_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type InquiryItemCreateAttributes = Partial<InquiryItemAttributes>;

export interface InquiryItems {
  product_id: string;
  quantity: number;
  unit_price?: number;
  total_price: number;
}
