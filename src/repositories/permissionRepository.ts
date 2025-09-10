import { Permission } from "models/permission.model";

export class permissionRepository {
  static async findByName(name: string): Promise<Permission | null> {
    return Permission.findOne({
      where: { name },
      attributes: ["id"],
    });
  }
}
