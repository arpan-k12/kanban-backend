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
  CategoriesAttributes,
  CategoriesCreateAttributes,
} from "../types/models/categories.types";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "categories",
  paranoid: true,
  timestamps: true,
})
export class Categories
  extends Model<CategoriesAttributes, CategoriesCreateAttributes>
  implements CategoriesAttributes
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
