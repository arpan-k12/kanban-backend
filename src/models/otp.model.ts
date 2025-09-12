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
  @AllowNull(true)
  @Column({
    type: DataType.UUID,
  })
  user_id!: string | null;

  @AllowNull(false)
  @Column(DataType.STRING(6))
  otp!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiry!: Date;

  @AllowNull(true)
  @Column(DataType.STRING)
  user_name?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  email?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  password?: string;

  @AllowNull(true)
  @Column(DataType.ENUM("0", "1"))
  role!: "0" | "1";

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
