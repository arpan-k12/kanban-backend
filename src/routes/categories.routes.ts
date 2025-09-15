import { CategoryController } from "controllers/category.controller";
import { Router, Request, Response, NextFunction } from "express";

export class categoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      CategoryController.getAllCategories(req, res, next);
    });
  }
}

export default new categoryRouter().router;
