import { UsersOrganization } from "models/usersOrganization.model";
import { Users } from "../models/users.model";
import { Organization } from "models/organization.model";
import { Permission } from "models/permission.model";
import { Features } from "models/features.model";
import { UserPermissions } from "models/userpermissions.model";
const { Op } = require("sequelize");

const { v4: uuidv4 } = require("uuid");

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

  // static async findAll(): Promise<Users[]> {
  //   return Users.findAll();
  // }

  static async findAll(): Promise<any[]> {
    const users = await Users.findAll();
    const results: any[] = [];

    for (const user of users) {
      const withPerms = await this.buildUserWithPermissions(user);
      results.push({
        ...withPerms.userPlain,
        permissions: {
          byFeature: withPerms.permissionsByFeature,
          flat: withPerms.flat,
        },
      });
    }

    return results;
  }

  static async createUserWithPermissions(data: {
    user_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "0" | "1";
  }) {
    const sequelize = Users.sequelize!;
    const transaction = await sequelize.transaction();

    try {
      const user = await Users.create(data, { transaction });

      const [perms, feats] = await Promise.all([
        Permission.findAll({ transaction }),
        Features.findAll({ transaction }),
      ]);

      const now = new Date();
      const rows = [];
      for (const p of perms) {
        for (const f of feats) {
          rows.push({
            user_id: user.id,
            permission_id: p.id,
            feature_id: f.id,
            createdAt: now,
            updatedAt: now,
          });
        }
      }
      if (rows.length) await UserPermissions.bulkCreate(rows, { transaction });

      await transaction.commit();

      return await this.buildUserWithPermissions(user);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  static async buildUserWithPermissions(user: Users) {
    const userPermissions = await UserPermissions.findAll({
      where: { user_id: { [Op.eq]: user.id } },
      include: [Permission, Features],
    });

    const permissionsByFeature: Record<string, string[]> = {};
    const flatSet = new Set<string>();

    for (const up of userPermissions) {
      const perm = (up.permission as Permission)?.name;
      const feat = (up.feature as Features)?.feature_name;

      if (perm && feat) {
        flatSet.add(perm);
        permissionsByFeature[feat] ??= [];
        if (!permissionsByFeature[feat].includes(perm)) {
          permissionsByFeature[feat].push(perm);
        }
      }
    }

    const userPlain = user.get({ plain: true }) as Users | any;
    delete userPlain.password;
    delete userPlain.confirmPassword;
    delete userPlain.deletedAt;

    return {
      userPlain,
      permissionsByFeature,
      flat: Array.from(flatSet),
    };
  }

  // static async findOrganizationByUserId(user_id: string) {
  //   return await UsersOrganization.findOne({
  //     where: { user_id },
  //     include: [
  //       {
  //         model: Organization,
  //         attributes: ["id", "name", "industry"],
  //       },
  //     ],
  //   });
  // }
}
