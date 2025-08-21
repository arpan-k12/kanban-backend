import { UserController } from "controllers/users.controller";
import { Router, Request, Response, NextFunction } from "express";

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/signup",
      (req: Request, res: Response, next: NextFunction) => {
        UserController.signup(req, res, next);
      }
    );
    this.router.post(
      "/signin",
      (req: Request, res: Response, next: NextFunction) => {
        UserController.signin(req, res, next);
      }
    );
  }
}

export default new AuthRouter().router;
