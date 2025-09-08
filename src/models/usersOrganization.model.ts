import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  DefaultScope,
  ForeignKey,
  BelongsTo,
  Default,
} from "sequelize-typescript";

import { Users } from "./users.model";
import {
  UsersOrganizationAttributes,
  UsersOrganizationCreateAttributes,
} from "types/models/user_organization.type";
import { Organization } from "./organization.model";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "users_organizations",
  paranoid: true,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["user_id", "organization_id"],
    },
  ],
})
export class UsersOrganization
  extends Model<UsersOrganizationAttributes, UsersOrganizationCreateAttributes>
  implements UsersOrganizationAttributes
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

  @BelongsTo(() => Users)
  user!: Users;

  @ForeignKey(() => Organization)
  @Column({
    type: DataType.UUID,
  })
  organization_id!: string;

  @BelongsTo(() => Organization)
  organization!: Organization;

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
}
