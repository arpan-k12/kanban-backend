export interface OrganizationAttributes {
  id: string;
  name: string;
  address: string;
  phone: string;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type OrganizationCreateAttributes = Partial<OrganizationAttributes>;
