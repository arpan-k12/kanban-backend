import { InquiryController } from "controllers/inquiry.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";
import { checkPermission } from "middlewares/checkPermission";

export class InquiryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      checkPermission("card", "can_create"),
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.create(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      checkPermission("inquiry", "can_edit"),
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.update(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.delete(req, res, next);
      }
    );

    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      InquiryController.getAllInquiry(req, res, next);
    });
    this.router.get(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.getInquiryById(req, res, next);
      }
    );
    this.router.get(
      "/code/generate",
      (req: Request, res: Response, next: NextFunction) => {
        InquiryController.getIdentificationCode(req, res, next);
      }
    );
  }
}

export default new InquiryRouter().router;
