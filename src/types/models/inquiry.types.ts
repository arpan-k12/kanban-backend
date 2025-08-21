export interface InquiryAttributes {
  id: string;
  customer_id: string;
  commodity: string;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type InquiryCreateAttributes = Partial<InquiryAttributes>;
