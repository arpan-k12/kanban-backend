import { QuoteController } from "controllers/quote.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { checkPermission } from "middlewares/checkPermission";

export class QuoteRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      checkPermission("quote", "can_create"),
      (req: Request, res: Response, next: NextFunction) => {
        QuoteController.create(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      checkPermission("quote", "can_edit"),
      (req: Request, res: Response, next: NextFunction) => {
        QuoteController.update(req, res, next);
      }
    );
  }
}
export default new QuoteRouter().router;
