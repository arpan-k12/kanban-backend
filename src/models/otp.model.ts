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
import { UsersAttributes } from "../types/models/users.types";
import { Users } from "./users.model";
import { OtpAttributes, OtpCreateAttributes } from "types/models/otp.types";

@Table({
  tableName: "otps",
  paranoid: true,
  timestamps: true,
})
export class Otp
  extends Model<OtpAttributes, OtpCreateAttributes>
  implements OtpAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  user_id!: string;

  @AllowNull(false)
  @Column(DataType.STRING(6))
  otp!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiry!: Date;

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
  @BelongsTo(() => Users)
  user!: UsersAttributes;
}
