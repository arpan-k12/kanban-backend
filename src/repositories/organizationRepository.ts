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
}
