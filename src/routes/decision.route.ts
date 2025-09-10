import { DecisionController } from "controllers/decision.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { checkPermission } from "middlewares/checkPermission";

export class DecisionRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      checkPermission("decision", "can_create"),
      (req: Request, res: Response, next: NextFunction) => {
        DecisionController.create(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      checkPermission("decision", "can_edit"),
      (req: Request, res: Response, next: NextFunction) => {
        DecisionController.update(req, res, next);
      }
    );
  }
}

export default new DecisionRouter().router;
