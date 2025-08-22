import { DecisionController } from "controllers/decision.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class DecisionRouter {
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
        DecisionController.create(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        DecisionController.update(req, res, next);
      }
    );
  }
}

export default new DecisionRouter().router;
