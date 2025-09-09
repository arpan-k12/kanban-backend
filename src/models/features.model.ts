import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  DefaultScope,
  Model,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import {
  FeaturesAttributes,
  FeaturesCreateAttributes,
} from "types/models/feature.type";
import { UserPermissions } from "./userpermissions.model";
import { Users } from "./users.model";
import { Permission } from "./permission.model";
import { UserPermissionsAttributes } from "types/models/userPermissions.type";
import { UsersAttributes } from "types/models/users.types";
import { PermissionAttributes } from "types/models/permission.type";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "features",
  paranoid: true,
  timestamps: true,
})
export class Features
  extends Model<FeaturesAttributes, FeaturesCreateAttributes>
  implements FeaturesAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  feature_name!: string;

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

  @HasMany(() => UserPermissions)
  userPermissions!: UserPermissionsAttributes[];

  @BelongsToMany(() => Users, () => UserPermissions)
  users!: UsersAttributes[];

  @BelongsToMany(() => Permission, () => UserPermissions)
  permissions!: PermissionAttributes[];
}
