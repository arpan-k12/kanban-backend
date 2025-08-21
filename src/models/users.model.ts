import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DefaultScope,
  BeforeCreate,
  Default,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import AppError from "../utils/appError";
import {
  UsersAttributes,
  UsersCreateAttributes,
} from "../types/models/users.types";

@DefaultScope(() => ({
  attributes: { exclude: ["password"] },
}))
@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
export class Users
  extends Model<UsersAttributes, UsersCreateAttributes>
  implements UsersAttributes
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("0", "1"))
  role!: "0" | "1";

  @AllowNull(false)
  @Column(DataType.STRING)
  user_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.VIRTUAL)
  confirmPassword?: string;

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

  @BeforeCreate
  static async hashPassword(instance: Users) {
    if (!instance.confirmPassword) {
      throw new AppError("Confirm password is required", 400);
    }
    if (instance.password !== instance.confirmPassword) {
      throw new AppError("Password and confirm password must match", 400);
    }

    if (instance.password.length < 7) {
      throw new AppError("Password must be at least 7 characters long", 400);
    }

    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
