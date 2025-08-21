import { sequelize } from "../config/sequelize";
import { Users } from "./users.model";

export const db = {
  sequelize,
  Users,
};
