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
  KanbanColumnAttributes,
  KanbanColumnCreateAttributes,
} from "../types/models/kanbanColumn.types";

@DefaultScope(() => ({
  attributes: { exclude: [] },
}))
@Table({
  tableName: "kanbanColumns",
  paranoid: true,
  timestamps: true,
})
export class KanbanColumn
  extends Model<KanbanColumnAttributes, KanbanColumnCreateAttributes>
  implements KanbanColumnAttributes
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

  @AllowNull(false)
  @Column(DataType.INTEGER)
  position!: number;

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
