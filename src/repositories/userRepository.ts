import { Users } from "../models/users.model";

export class UserRepository {
  static async findByEmail(email: string): Promise<Users | null> {
    return Users.findOne({ where: { email } });
  }
  static async findByEmailSignin(email: string): Promise<Users | null> {
    return await Users.unscoped().findOne({
      where: { email },
      attributes: { include: ["password"] },
    });
  }

  static async createUser(data: Partial<Users>): Promise<Users | null> {
    return Users.create(data);
  }

  static async UserFindByPk(id: string | any): Promise<Users | null> {
    return Users.findByPk(id);
  }
}
