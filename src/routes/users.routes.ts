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
      authentication,
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        UserController.getAllUsers(req, res, next);
      }
    );
  }
}

export default new UsersRouter().router;
