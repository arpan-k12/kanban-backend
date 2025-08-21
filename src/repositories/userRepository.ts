import { Users } from "../models/users.model";

export class UserRepository {
  static async findByEmail(email: string): Promise<Users | null> {
    return Users.findOne({ where: { email } });
  }

  static async createUser(data: Partial<Users>): Promise<Users | null> {
    return Users.create(data);
  }
}
