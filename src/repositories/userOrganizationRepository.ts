import { Organization } from "models/organization.model";
import { Users } from "models/users.model";
import { UsersOrganization } from "models/usersOrganization.model";

export class userOrganizationRepository {
  // static async assignUserToOrganization(
  //   user_id: string,
  //   organization_id: string
  // ) {
  //   const existing = await UsersOrganization.findOne({
  //     where: { user_id },
  //   });

  //   if (existing) {
  //     existing.organization_id = organization_id;
  //     await existing.save();
  //     return existing;
  //   }

  //   return await UsersOrganization.create({ user_id, organization_id });
  // }

  static async getAllUserOrganizations() {
    return await Users.findAll({
      include: [
        {
          model: Organization,
          through: { attributes: [] },
        },
      ],
    });
  }
  static async getUserOrganizationById(id: string) {
    return await Users.findByPk(id, {
      include: [
        {
          model: Organization,
          through: { attributes: [] },
        },
      ],
    });
  }

  static async checkUserInOrganization(id: string, organization_id: string) {
    return await UsersOrganization.findOne({
      where: {
        user_id: id,
        organization_id: organization_id,
      },
    });
  }
}
