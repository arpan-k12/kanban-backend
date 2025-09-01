import { Sequelize } from "sequelize-typescript";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "./dotenv.config";
import { Users } from "models/users.model";
import { Customers } from "models/customer.model";
import { Inquiry } from "models/inquiry.model";
import { KanbanColumn } from "models/kanbanColumn.model";
import { Cards } from "models/cards.model";
import { Decision } from "models/decision.model";
import { Quote } from "models/quotes.model";
import { Organization } from "models/organization.model";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: +(DB_PORT || 5432),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  models: [
    Organization,
    Users,
    Customers,
    Inquiry,
    KanbanColumn,
    Quote,
    Decision,
    Cards,
  ],
  define: {
    underscored: true,
  },
});
export { sequelize };
