import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DefaultScope,
  BeforeCreate,
  Default,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import AppError from "../utils/appError";
import {
  UsersAttributes,
  UsersCreateAttributes,
} from "../types/models/users.types";
import { Organization } from "./organization.model";
import { UsersOrganization } from "./usersOrganization.model";
import { OrganizationAttributes } from "types/models/organization.types";
import { UserPermissions } from "./userpermissions.model";
import { UserPermissionsAttributes } from "types/models/userPermissions.type";
import { Permission } from "./permission.model";
import { PermissionAttributes } from "types/models/permission.type";
import { Features } from "./features.model";
import { FeaturesAttributes } from "types/models/feature.type";

@DefaultScope(() => ({
  attributes: { exclude: ["password"] },
}))
@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
export class Users
  extends Model<UsersAttributes, UsersCreateAttributes>
  implements UsersAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("0", "1"))
  role!: "0" | "1";

  @AllowNull(false)
  @Column(DataType.STRING)
  user_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @BelongsToMany(() => Organization, () => UsersOrganization)
  organizations!: OrganizationAttributes[];

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.VIRTUAL)
  confirmPassword?: string;

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
  deletedAt?: Date;

  @BeforeCreate
  static async hashPassword(instance: Users) {
    if (!instance.confirmPassword) {
      throw new AppError("Confirm password is required", 400);
    }
    if (instance.password !== instance.confirmPassword) {
      throw new AppError("Password and confirm password must match", 400);
    }

    if (instance.password.length < 7) {
      throw new AppError("Password must be at least 7 characters long", 400);
    }

    instance.password = await bcrypt.hash(instance.password, 10);
  }

  // relations
  @HasMany(() => UserPermissions)
  userPermissions!: UserPermissionsAttributes[];

  @BelongsToMany(() => Permission, () => UserPermissions)
  permissions!: PermissionAttributes[];

  @BelongsToMany(() => Features, () => UserPermissions)
  features!: FeaturesAttributes[];
}
