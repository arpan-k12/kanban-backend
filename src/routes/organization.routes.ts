import { OrganizationController } from "controllers/organization.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class OrganizationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.create(req, res, next);
      }
    );
    this.router.get(
      "/",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.get(req, res, next);
      }
    );
  }
}

export default new OrganizationRouter().router;
