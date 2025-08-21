import { CustomerController } from "controllers/customer.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class CustomerRouter {
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
        CustomerController.create(req, res, next);
      }
    );
  }
}

export default new CustomerRouter().router;
