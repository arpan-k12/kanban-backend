import { Router } from "express";
import authRouter from "./auth.routes";

export class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/api/auth", authRouter);
  }
}

export default new IndexRouter().router;
