export interface InquiryItemAttributes {
  id: string;
  inquiry_id: string;
  product_id: string;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type InquiryItemCreateAttributes = Partial<InquiryItemAttributes>;
