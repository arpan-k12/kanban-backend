export interface PermissionAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type PermissionCreateAttributes = Partial<PermissionAttributes>;
