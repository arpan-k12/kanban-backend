import { userOrganizationController } from "controllers/userOrganization.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { AuthMiddleware } from "middlewares/AuthMiddleware";

export class userOrganizationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/assign-org",
      authentication,
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        userOrganizationController.assignOrganization(req, res, next);
      }
    );
  }
}

export default new userOrganizationRouter().router;
