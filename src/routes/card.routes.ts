import { CardController } from "controllers/card.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class CardRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(
    //   "/",
    //   authentication,
    //   (req: Request, res: Response, next: NextFunction) => {
    //     CardController.create(req, res, next);
    //   }
    // );
    this.router.patch(
      "/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        CardController.updateCardPosition(req, res, next);
      }
    );
    this.router.patch(
      "/summary/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        CardController.addUpdateSummary(req, res, next);
      }
    );
  }
}

export default new CardRouter().router;
