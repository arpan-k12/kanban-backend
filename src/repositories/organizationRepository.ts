import { Organization } from "models/organization.model";
import { OrganizationCreateAttributes } from "types/models/organization.types";

export class OrganizationRepository {
  static async createOrganization(
    data: OrganizationCreateAttributes
  ): Promise<Organization | null> {
    return Organization.create(data);
  }

  static async getAllOrganization(): Promise<Organization[]> {
    return Organization.findAll();
  }

  static async findById(id: string) {
    return await Organization.findByPk(id);
  }

  static async updateOrganization(
    id: string,
    payload: Partial<OrganizationCreateAttributes>
  ) {
    const organization = await Organization.findByPk(id);
    if (!organization) return null;

    await organization.update(payload);
    return organization;
  }

  static async deleteOrganization(id: string) {
    const organization = await Organization.findByPk(id);
    if (!organization) return null;

    await organization.destroy();
    return true;
  }
}
