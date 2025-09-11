import { UsersOrganization } from "models/usersOrganization.model";
import { Users } from "../models/users.model";
import { Organization } from "models/organization.model";
import { Permission } from "models/permission.model";
import { Features } from "models/features.model";
import { UserPermissions } from "models/userpermissions.model";
import AppError from "utils/appError";
import { Otp } from "models/otp.model";
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

  static async saveOtp(user_id: string, otp: string, expiry: Date) {
    return Otp.create({ user_id, otp, expiry });
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

  static async fetchUserPermissionData(userId: string, transaction?: any) {
    const [allFeatures, allPermissions, userPermRows] = await Promise.all([
      Features.findAll({
        attributes: ["id", "feature_name"],
        transaction,
      }),
      Permission.findAll({
        attributes: ["id", "name"],
        transaction,
      }),
      UserPermissions.findAll({
        where: { user_id: { [Op.eq]: userId } },
        attributes: ["id", "feature_id", "permission_id"],
        transaction,
      }),
    ]);

    const existingMap = new Map<string, string>();
    for (const r of userPermRows) {
      existingMap.set(`${r.feature_id}:${r.permission_id}`, r.id);
    }

    const features = allFeatures.map((f) => {
      const perms = allPermissions.map((p) => {
        const key = `${f.id}:${p.id}`;
        return {
          id: p.id,
          name: p.name,
          assigned: existingMap.has(key),
          userPermissionId: existingMap.get(key) ?? null,
        };
      });

      return {
        id: f.id,
        name: (f as any).feature_name,
        permissions: perms,
      };
    });

    return { features };
  }

  static async updateUserPermissions(
    userId: string,
    permissionsByFeature: Record<string, string[]>
  ) {
    const featureIds = Object.keys(permissionsByFeature);
    const permissionIdSet = new Set<string>();
    for (const perms of Object.values(permissionsByFeature)) {
      if (!Array.isArray(perms)) {
        throw new AppError(
          "Each feature must map to an array of permission IDs",
          400
        );
      }
      for (const pid of perms) permissionIdSet.add(pid);
    }
    const permissionIds = Array.from(permissionIdSet);

    const sequelize = Users.sequelize!;
    await sequelize.transaction(async (t) => {
      if (featureIds.length > 0) {
        const foundFeatures = await Features.findAll({
          where: { id: { [Op.in]: featureIds } },
          transaction: t,
        });
        if (foundFeatures.length !== featureIds.length) {
          const foundIds = new Set(foundFeatures.map((f) => f.id));
          const missing = featureIds.filter((id) => !foundIds.has(id));
          throw new AppError(
            `Some features not found: ${missing.join(", ")}`,
            400
          );
        }
      }

      if (permissionIds.length > 0) {
        const foundPerms = await Permission.findAll({
          where: { id: { [Op.in]: permissionIds } },
          transaction: t,
        });
        if (foundPerms.length !== permissionIds.length) {
          const foundIds = new Set(foundPerms.map((p) => p.id));
          const missing = permissionIds.filter((id) => !foundIds.has(id));
          throw new AppError(
            `Some permissions not found: ${missing.join(", ")}`,
            400
          );
        }
      }

      const existingRows = await UserPermissions.findAll({
        where: { user_id: { [Op.eq]: userId } },
        attributes: ["id", "feature_id", "permission_id"],
        transaction: t,
      });

      const existingMap = new Map<string, string>();
      for (const r of existingRows) {
        existingMap.set(`${r.feature_id}:${r.permission_id}`, r.id);
      }

      const desiredSet = new Set<string>();
      for (const [featureId, perms] of Object.entries(permissionsByFeature)) {
        for (const permId of perms) {
          desiredSet.add(`${featureId}:${permId}`);
        }
      }

      const now = new Date();

      const toCreate: Array<{
        id: string;
        user_id: string;
        feature_id: string;
        permission_id: string;
        createdAt: Date;
        updatedAt: Date;
      }> = [];

      for (const key of desiredSet) {
        if (!existingMap.has(key)) {
          const [feature_id, permission_id] = key.split(":");
          toCreate.push({
            id: uuidv4(),
            user_id: userId,
            feature_id,
            permission_id,
            createdAt: now,
            updatedAt: now,
          });
        }
      }

      const toDeleteIds: string[] = [];
      for (const [key, rowId] of existingMap.entries()) {
        if (!desiredSet.has(key)) {
          toDeleteIds.push(rowId);
        }
      }

      if (toDeleteIds.length) {
        await UserPermissions.destroy({
          where: { id: { [Op.in]: toDeleteIds } },
          transaction: t,
        });
      }

      if (toCreate.length) {
        await UserPermissions.bulkCreate(toCreate, { transaction: t });
      }
    });
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
