// models/inquiryItem.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Inquiry } from "./inquiry.model";
import { Product } from "./product.model";
import {
  InquiryItemAttributes,
  InquiryItemCreateAttributes,
} from "types/models/inquiryItem.types";

@Table({
  tableName: "inquiry_items",
  paranoid: true,
  timestamps: true,
})
export class InquiryItem
  extends Model<InquiryItemAttributes, InquiryItemCreateAttributes>
  implements InquiryItemAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Inquiry)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  inquiry_id!: string;

  @BelongsTo(() => Inquiry)
  inquiry!: Inquiry;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column({ type: DataType.UUID })
  product_id!: string;

  @BelongsTo(() => Product)
  product!: Product;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  quantity!: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  price!: number;

  @Column({ field: "createdAt", type: DataType.DATE })
  createdAt!: Date;

  @Column({ field: "updatedAt", type: DataType.DATE })
  updatedAt!: Date;

  @Column({ field: "deletedAt", type: DataType.DATE })
  deletedAt?: Date | null;
}
