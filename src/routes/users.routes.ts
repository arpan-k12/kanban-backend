import { UserController } from "controllers/users.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { AuthMiddleware } from "middlewares/AuthMiddleware";

export class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        UserController.getAllUsers(req, res, next);
      }
    );
    this.router.get(
      "/:id/permission",
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        UserController.getUserPermissions(req, res, next);
      }
    );
    this.router.patch(
      "/:id/permission",
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        UserController.updateUserPermissions(req, res, next);
      }
    );
    // For App Route
    this.router.get(
      "/user-permission",
      (req: Request, res: Response, next: NextFunction) => {
        UserController.getUserPermissionsById(req, res, next);
      }
    );
  }
}

export default new UsersRouter().router;
