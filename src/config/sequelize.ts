import { Sequelize } from "sequelize-typescript";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "./dotenv.config";
import { Users } from "models/users.model";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: +(DB_PORT || 5432),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  models: [Users],
  define: {
    underscored: true,
  },
});
export { sequelize };
