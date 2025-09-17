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
  HasMany,
} from "sequelize-typescript";
import {
  InquiryAttributes,
  InquiryCreateAttributes,
} from "../types/models/inquiry.types";
import { Customers } from "./customer.model";
import { Product } from "./product.model";
import { InquiryItem } from "./inquiryitem.model";

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

  // @ForeignKey(() => Product)
  // @AllowNull(false)
  // @Column({
  //   type: DataType.UUID,
  // })
  // product_id!: string;

  // @BelongsTo(() => Product)
  // product!: Product;

  // @AllowNull(false)
  // @Column(DataType.STRING)
  // commodity!: string;

  // @AllowNull(false)
  // @Column(DataType.DECIMAL)
  // quantity!: number;

  // @AllowNull(false)
  // @Column(DataType.DECIMAL)
  // price!: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  budget!: number;

  @AllowNull(false)
  @Column(DataType.STRING(6))
  identification_code!: string;

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

  // Relations
  @HasMany(() => InquiryItem)
  items!: InquiryItem[];
}
