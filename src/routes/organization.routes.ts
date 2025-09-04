import { OrganizationController } from "controllers/organization.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { AuthMiddleware } from "middlewares/AuthMiddleware";

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
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.create(req, res, next);
      }
    );
    this.router.get(
      "/",
      authentication,
      // AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.get(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      authentication,
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.update(req, res, next);
      }
    );

    this.router.delete(
      "/:id",
      authentication,
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.delete(req, res, next);
      }
    );

    this.router.get(
      "/:id",
      authentication,
      AuthMiddleware.restrictTo("0"),
      (req: Request, res: Response, next: NextFunction) => {
        OrganizationController.getOrgById(req, res, next);
      }
    );
  }
}

export default new OrganizationRouter().router;
