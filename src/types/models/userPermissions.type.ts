export interface UserPermissionsAttributes {
  id: string;
  user_id: string;
  permission_id: string;
  feature_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type UserPermissionsCreateAttributes =
  Partial<UserPermissionsAttributes>;
