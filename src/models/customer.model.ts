import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  DefaultScope,
} from "sequelize-typescript";
import {
  CustomersAttributes,
  CustomersCreateAttributes,
} from "../types/models/customers.types";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "customers",
  paranoid: true,
  timestamps: true,
})
export class Customers
  extends Model<CustomersAttributes, CustomersCreateAttributes>
  implements CustomersAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  c_name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  c_email!: string;

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
