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

import { Customers } from "./customer.model";
import { Inquiry } from "./inquiry.model";
import { Users } from "./users.model";
import { KanbanColumn } from "./kanbanColumn.model";
import {
  UsersOrganizationAttributes,
  UsersOrganizationCreateAttributes,
} from "types/models/user_organization.type";
import { Quote } from "./quotes.model";
import { Decision } from "./decision.model";
import { Organization } from "./organization.model";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "cards",
  paranoid: true,
  timestamps: true,
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
