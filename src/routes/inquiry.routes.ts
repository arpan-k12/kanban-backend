import { InquiryController } from "controllers/inquiry.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class InquiryRouter {
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
        InquiryController.create(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.update(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.delete(req, res, next);
      }
    );

    this.router.get(
      "/",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.getAllInquiry(req, res, next);
      }
    );
    this.router.get(
      "/:id",
      authentication,
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.getInquiryById(req, res, next);
      }
    );
  }
}

export default new InquiryRouter().router;
