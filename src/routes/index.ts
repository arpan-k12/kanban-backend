import { Router } from "express";
import authRouter from "./auth.routes";
import customerRouter from "./customer.routes";

export class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/api/auth", authRouter);
    this.router.use("/api/customer", customerRouter);
  }
}

export default new IndexRouter().router;
