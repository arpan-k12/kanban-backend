export interface CustomersAttributes {
  id: string;
  c_name: string;
  c_email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type CustomersCreateAttributes = Partial<CustomersAttributes>;
