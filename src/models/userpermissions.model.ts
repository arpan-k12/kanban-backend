import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  Model,
  BelongsTo,
} from "sequelize-typescript";
import { Users } from "./users.model";
import { Permission } from "./permission.model";
import { Features } from "./features.model";
import {
  UserPermissionsAttributes,
  UserPermissionsCreateAttributes,
} from "types/models/userPermissions.type";
import { UsersAttributes } from "types/models/users.types";
import { PermissionAttributes } from "types/models/permission.type";
import { FeaturesAttributes } from "types/models/feature.type";

@Table({
  tableName: "userPermissions",
  timestamps: true,
  paranoid: true,
})
export class UserPermissions
  extends Model<UserPermissionsAttributes, UserPermissionsCreateAttributes>
  implements UserPermissionsAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  user_id!: string;

  @ForeignKey(() => Permission)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  permission_id!: string;

  @ForeignKey(() => Features)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  feature_id!: string;

  @Column({
    field: "createdAt",
    type: DataType.DATE,
  })
  createdAt!: Date;

  @Column({
    field: "updatedAt",
    type: DataType.DATE,
  })
  updatedAt!: Date;

  @Column({
    field: "deletedAt",
    type: DataType.DATE,
  })
  deletedAt?: Date | null;

  // Relations
  @BelongsTo(() => Users)
  user!: UsersAttributes;

  @BelongsTo(() => Permission)
  permission!: PermissionAttributes;

  @BelongsTo(() => Features)
  feature!: FeaturesAttributes;
}
