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
  DecisionAttributes,
  DecisionCreateAttributes,
} from "../types/models/decision.types";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "decisions",
  paranoid: true,
  timestamps: true,
})
export class Decision
  extends Model<DecisionAttributes, DecisionCreateAttributes>
  implements DecisionAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  decision!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  reason?: string;

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
