export interface UsersOrganizationAttributes {
  id: string;
  user_id: string;
  organization_id: string;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type UsersOrganizationCreateAttributes =
  Partial<UsersOrganizationAttributes>;
