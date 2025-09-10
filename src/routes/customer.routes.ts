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
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      CustomerController.create(req, res, next);
    });
    this.router.patch(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        CustomerController.update(req, res, next);
      }
    );
    this.router.delete(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        CustomerController.delete(req, res, next);
      }
    );
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      CustomerController.getAllCustomer(req, res, next);
    });
    this.router.get(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        CustomerController.getCustomerById(req, res, next);
      }
    );
  }
}

export default new CustomerRouter().router;
