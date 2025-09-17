import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  Model,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Users } from "./users.model";
import { Permission } from "./permission.model";
import { Features } from "./features.model";

import { UsersAttributes } from "types/models/users.types";
import { PermissionAttributes } from "types/models/permission.types";
import { FeaturesAttributes } from "types/models/feature.types";
import {
  ProductAttributes,
  ProductCreateAttributes,
} from "types/models/product.types";
import { Categories } from "./categories.model";
import { CategoriesAttributes } from "types/models/categories.types";
import { InquiryItem } from "./inquiryitem.model";

@Table({
  tableName: "products",
  timestamps: true,
  paranoid: true,
})
export class Product
  extends Model<ProductAttributes, ProductCreateAttributes>
  implements ProductAttributes
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

  @ForeignKey(() => Categories)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  category_id!: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  image!: string[];

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  price!: number;

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

  // Relations
  @BelongsTo(() => Categories)
  categories!: CategoriesAttributes;

  // @HasMany(() => InquiryItem, { foreignKey: "product_id" })
  // inquiryItems!: InquiryItem[];
}
