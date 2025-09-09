import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppError from "../utils/appError";
import { Users } from "models/users.model";
import { sendSuccess } from "utils/commonResponse";
import { generateToken } from "helper/jwtToken";
import { comparePasswords } from "helper/bcrypthelper";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user_name,
        email,
        password,
        confirmPassword,
        role = "1",
      } = req.body;

      if (!user_name || !email || !password || !role) {
        return next(new AppError("All fields are required", 400));
      }

      if (!["0", "1"].includes(role)) {
        throw new AppError("Invalid user Type", 400);
      }

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        return next(new AppError("Email already registered", 400));
      }

      const { userPlain, permissionsByFeature, flat } =
        await UserRepository.createUserWithPermissions({
          user_name,
          email,
          password,
          confirmPassword,
          role,
        });

      const token = generateToken({ id: userPlain.id });

      return sendSuccess(
        res,
        "User created successfully",
        {
          ...userPlain,
          permissions: { byFeature: permissionsByFeature, flat },
        },
        201,
        token
      );
    } catch (err) {
      next(err);
    }
  }

  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new AppError("Email and password are required", 400));
      }

      const user: Users | null = await UserRepository.findByEmailSignin(email);

      if (!user) {
        return next(new AppError("Invalid credentials", 401));
      }

      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        return next(new AppError("Invalid credentials", 401));
      }

      const { userPlain, permissionsByFeature, flat } =
        await UserRepository.buildUserWithPermissions(user);

      const token = generateToken({ id: user.id });

      return sendSuccess(
        res,
        "Login successful",
        {
          ...userPlain,
          permissions: { byFeature: permissionsByFeature, flat },
        },
        200,
        token
      );
    } catch (err) {
      next(err);
    }
  }
}

// // controllers/userPermissions.controller.ts
// import { Request, Response, NextFunction } from "express";
// import { Op } from "sequelize";
// import { v4 as uuidv4 } from "uuid";

// import { Users } from "models/users.model";
// import { UserPermissions } from "models/userpermissions.model";
// import { Permission } from "models/permission.model";
// import { Features } from "models/features.model";

// import AppError from "utils/appError";
// import { sendSuccess } from "utils/commonResponse";

// /**
//  * Expected request/response shapes:
//  * GET  /users/:id/permissions
//  *  -> { features: [{ id, name, permissions: [{ id, name, assigned, userPermissionId | null }] }] }
//  *
//  * PATCH /users/:id/permissions
//  *  Body:
//  *    { permissionsByFeature: { "<featureId>": ["<permissionId>", ...], ... } }
//  *  -> returns same shape as GET after update
//  */

// export class UserPermissionsController {
//   // Helper: fetch structured permission data for a user
//   private static async fetchUserPermissionData(
//     userId: string,
//     transaction?: any
//   ) {
//     // load all features & permissions (master lists)
//     const [allFeatures, allPermissions, userPermRows] = await Promise.all([
//       Features.findAll({
//         attributes: ["id", "feature_name"],
//         transaction,
//       }),
//       Permission.findAll({
//         attributes: ["id", "name"],
//         transaction,
//       }),
//       UserPermissions.findAll({
//         where: { user_id: { [Op.eq]: userId } },
//         attributes: ["id", "feature_id", "permission_id"],
//         transaction,
//       }),
//     ]);

//     // map existing user assignments for quick lookup: key = `${featureId}:${permissionId}` -> userPermissionId
//     const existingMap = new Map<string, string>();
//     for (const r of userPermRows) {
//       existingMap.set(`${r.feature_id}:${r.permission_id}`, r.id);
//     }

//     // Build feature/permission structure consumers need
//     const features = allFeatures.map((f) => {
//       const perms = allPermissions.map((p) => {
//         const key = `${f.id}:${p.id}`;
//         return {
//           id: p.id,
//           name: p.name,
//           assigned: existingMap.has(key),
//           userPermissionId: existingMap.get(key) ?? null,
//         };
//       });

//       return {
//         id: f.id,
//         name: (f as any).feature_name,
//         permissions: perms,
//       };
//     });

//     return { features };
//   }

//   // GET /users/:id/permissions
//   static async getUserPermissions(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const userId = req.params.id;
//     try {
//       // validate user exists
//       const user = await Users.findByPk(userId);
//       if (!user) return next(new AppError("User not found", 404));

//       const data = await this.fetchUserPermissionData(userId);
//       return sendSuccess(res, "User permissions fetched", data);
//     } catch (err) {
//       next(err);
//     }
//   }

//   // PATCH /users/:id/permissions
//   // body: { permissionsByFeature: Record<string, string[]> }
//   static async updateUserPermissions(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const userId = req.params.id;
//     const body = req.body as {
//       permissionsByFeature?: Record<string, string[]>;
//     };

//     try {
//       if (!body || typeof body.permissionsByFeature !== "object") {
//         return next(
//           new AppError(
//             "Invalid payload. Expect { permissionsByFeature: { <featureId>: [<permissionId>] } }",
//             400
//           )
//         );
//       }

//       const permissionsByFeature = body.permissionsByFeature!;

//       // validate user exists
//       const user = await Users.findByPk(userId);
//       if (!user) return next(new AppError("User not found", 404));

//       // collect unique ids from payload
//       const featureIds = Object.keys(permissionsByFeature);
//       const permissionIdSet = new Set<string>();
//       for (const perms of Object.values(permissionsByFeature)) {
//         if (!Array.isArray(perms)) {
//           return next(new AppError("Each feature must map to an array of permission IDs", 400));
//         }
//         for (const pid of perms) permissionIdSet.add(pid);
//       }
//       const permissionIds = Array.from(permissionIdSet);

//       // basic sanity: if no features or permissions provided, we treat as clearing all perms
//       const sequelize = Users.sequelize!;
//       await sequelize.transaction(async (t) => {
//         // optional validation: ensure provided feature ids & permission ids exist in DB
//         if (featureIds.length > 0) {
//           const foundFeatures = await Features.findAll({
//             where: { id: { [Op.in]: featureIds } },
//             transaction: t,
//           });
//           if (foundFeatures.length !== featureIds.length) {
//             const foundIds = new Set(foundFeatures.map((f) => f.id));
//             const missing = featureIds.filter((id) => !foundIds.has(id));
//             throw new AppError(
//               `Some features not found: ${missing.join(", ")}`,
//               400
//             );
//           }
//         }

//         if (permissionIds.length > 0) {
//           const foundPerms = await Permission.findAll({
//             where: { id: { [Op.in]: permissionIds } },
//             transaction: t,
//           });
//           if (foundPerms.length !== permissionIds.length) {
//             const foundIds = new Set(foundPerms.map((p) => p.id));
//             const missing = permissionIds.filter((id) => !foundIds.has(id));
//             throw new AppError(
//               `Some permissions not found: ${missing.join(", ")}`,
//               400
//             );
//           }
//         }

//         // load existing user permission rows
//         const existingRows = await UserPermissions.findAll({
//           where: { user_id: { [Op.eq]: userId } },
//           attributes: ["id", "feature_id", "permission_id"],
//           transaction: t,
//         });

//         const existingMap = new Map<string, string>(); // key -> row.id
//         for (const r of existingRows) {
//           existingMap.set(`${r.feature_id}:${r.permission_id}`, r.id);
//         }

//         // build desired key set from payload
//         const desiredSet = new Set<string>();
//         for (const [featureId, perms] of Object.entries(permissionsByFeature)) {
//           for (const permId of perms) {
//             desiredSet.add(`${featureId}:${permId}`);
//           }
//         }

//         const now = new Date();

//         // rows to create: desired - existing
//         const toCreate: Array<{
//           id: string;
//           user_id: string;
//           feature_id: string;
//           permission_id: string;
//           createdAt: Date;
//           updatedAt: Date;
//         }> = [];

//         for (const key of desiredSet) {
//           if (!existingMap.has(key)) {
//             const [feature_id, permission_id] = key.split(":");
//             toCreate.push({
//               id: uuidv4(),
//               user_id: userId,
//               feature_id,
//               permission_id,
//               createdAt: now,
//               updatedAt: now,
//             });
//           }
//         }

//         // rows to delete: existing - desired -> delete by id (safe)
//         const toDeleteIds: string[] = [];
//         for (const [key, rowId] of existingMap.entries()) {
//           if (!desiredSet.has(key)) {
//             toDeleteIds.push(rowId);
//           }
//         }

//         // execute delete & create
//         if (toDeleteIds.length) {
//           await UserPermissions.destroy({
//             where: { id: { [Op.in]: toDeleteIds } },
//             transaction: t,
//           });
//         }

//         if (toCreate.length) {
//           await UserPermissions.bulkCreate(toCreate, { transaction: t });
//         }
//       });

//       // return updated data (fresh)
//       const data = await this.fetchUserPermissionData(userId);
//       return sendSuccess(res, "Permissions updated successfully", data);
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// -----------------------

// // routes/users.ts or routes/userPermissions.ts
// import { Router } from "express";
// import { UserPermissionsController } from "controllers/userPermissions.controller";
// import { authenticate } from "middlewares/authentication"; // if you have auth

// const router = Router();

// router.get("/:id/permissions", /* authenticate, */ UserPermissionsController.getUserPermissions);
// router.patch("/:id/permissions", /* authenticate, */ UserPermissionsController.updateUserPermissions);

// export default router;
