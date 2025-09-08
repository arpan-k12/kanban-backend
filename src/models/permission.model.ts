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
  PermissionAttributes,
  PermissionCreateAttributes,
} from "types/models/permission.type";
import { UserPermissions } from "./userpermissions.model";
import { Users } from "./users.model";
import { Features } from "./features.model";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "permissions",
  paranoid: true,
  timestamps: true,
})
export class Permission
  extends Model<PermissionAttributes, PermissionCreateAttributes>
  implements PermissionAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

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
  userPermissions!: UserPermissions[];

  @BelongsToMany(() => Users, () => UserPermissions)
  users!: Users[];

  @BelongsToMany(() => Features, () => UserPermissions)
  features!: Features[];
}
