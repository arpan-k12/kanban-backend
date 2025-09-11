import { FeaturesAttributes } from "./feature.types";
import { PermissionAttributes } from "./permission.types";
import { UsersAttributes } from "./users.types";

export interface UserPermissionsAttributes {
  id: string;
  user_id: string;
  permission_id: string;
  feature_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  user?: UsersAttributes;
  permission?: PermissionAttributes;
  feature?: FeaturesAttributes;
}

export type UserPermissionsCreateAttributes =
  Partial<UserPermissionsAttributes>;
