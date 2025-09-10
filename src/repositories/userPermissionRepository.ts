import { UserPermissions } from "models/userpermissions.model";

export class userPermissionRepository {
  static async checkUserPermission(
    user_id: string,
    feature_id: string,
    permission_id: string
  ): Promise<UserPermissions | null> {
    return UserPermissions.findOne({
      where: {
        user_id,
        feature_id,
        permission_id,
      },
    });
  }
}
