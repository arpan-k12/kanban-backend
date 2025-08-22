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
} from "sequelize-typescript";
import {
  InquiryAttributes,
  InquiryCreateAttributes,
} from "../types/models/inquiry.types";
import { Customers } from "./customer.model";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "inquiries",
  paranoid: true,
  timestamps: true,
})
export class Inquiry
  extends Model<InquiryAttributes, InquiryCreateAttributes>
  implements InquiryAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Customers)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  customer_id!: string;

  @BelongsTo(() => Customers)
  customer!: Customers;

  @AllowNull(false)
  @Column(DataType.STRING)
  commodity!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  budget!: number;

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
