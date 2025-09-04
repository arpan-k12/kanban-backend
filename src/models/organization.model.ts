import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  DefaultScope,
  BelongsToMany,
} from "sequelize-typescript";

import {
  OrganizationAttributes,
  OrganizationCreateAttributes,
} from "../types/models/organization.types";
import { Users } from "./users.model";
import { UsersOrganization } from "./usersOrganization.model";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "organizations",
  paranoid: true,
  timestamps: true,
})
export class Organization
  extends Model<OrganizationAttributes, OrganizationCreateAttributes>
  implements OrganizationAttributes
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

  @BelongsToMany(() => Users, () => UsersOrganization)
  users!: Users[];

  @AllowNull(false)
  @Column(DataType.TEXT)
  address!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  industry!: string;

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
