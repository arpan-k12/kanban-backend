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
import { CardAttributes, CardCreateAttributes } from "types/models/cards.types";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "cards",
  paranoid: true,
  timestamps: true,
})
export class Cards
  extends Model<CardAttributes, CardCreateAttributes>
  implements CardAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => KanbanColumn)
  @Column({
    type: DataType.UUID,
  })
  column_id!: string;

  @BelongsTo(() => KanbanColumn)
  column!: KanbanColumn;

  @ForeignKey(() => Customers)
  @Column({
    type: DataType.UUID,
  })
  customer_id!: string;

  @BelongsTo(() => Customers)
  customer!: Customers;

  @ForeignKey(() => Inquiry)
  @Column({
    type: DataType.UUID,
  })
  inquiry_id!: string;

  @BelongsTo(() => Inquiry)
  inquiry!: Inquiry;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  assigned_to!: string;

  @BelongsTo(() => Users)
  assignee!: Users;

  @AllowNull(true)
  @Column(DataType.STRING)
  summary!: string;

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
