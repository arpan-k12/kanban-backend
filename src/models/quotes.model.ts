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

import { Cards } from "./cards.model";
import {
  QuoteAttributes,
  QuoteCreateAttributes,
} from "../types/models/quote.types";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "quotes",
  paranoid: true,
  timestamps: true,
})
export class Quote
  extends Model<QuoteAttributes, QuoteCreateAttributes>
  implements QuoteAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Cards)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  card_id!: string;

  @BelongsTo(() => Cards)
  card!: Cards;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  amount!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  valid_until!: Date;

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
}
