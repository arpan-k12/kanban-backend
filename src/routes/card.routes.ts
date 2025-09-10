import { CardController } from "controllers/card.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { checkPermission } from "middlewares/checkPermission";

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
      (req: Request, res: Response, next: NextFunction) => {
        CardController.updateCardPosition(req, res, next);
      }
    );
    this.router.patch(
      "/summary/:id",
      checkPermission("discussion", "can_create"),
      (req: Request, res: Response, next: NextFunction) => {
        CardController.addUpdateSummary(req, res, next);
      }
    );
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      CardController.getAllCard(req, res, next);
    });
  }
}

export default new CardRouter().router;
