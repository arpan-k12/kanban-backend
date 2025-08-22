import { QuoteController } from "controllers/quote.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class QuoteRouter {
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
        QuoteController.create(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        QuoteController.update(req, res, next);
      }
    );
  }
}
export default new QuoteRouter().router;
