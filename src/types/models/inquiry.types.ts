export interface InquiryAttributes {
  id: string;
  customer_id: string;
  budget: number;
  identification_code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type InquiryCreateAttributes = Partial<InquiryAttributes>;
