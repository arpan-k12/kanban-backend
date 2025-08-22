import { Router } from "express";
import authRouter from "./auth.routes";
import customerRouter from "./customer.routes";
import inquiryRouter from "./inquiry.routes";
import kanbanColumnRouter from "./kanbanColumn.routes";
import cardRouter from "./card.routes";
import decisionRouter from "./decision.route";
import quoteRouter from "./quote.routes";

export class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/api/auth", authRouter);
    this.router.use("/api/customer", customerRouter);
    this.router.use("/api/inquiry", inquiryRouter);
    this.router.use("/api/kanbancolumns", kanbanColumnRouter);
    this.router.use("/api/card", cardRouter);
    this.router.use("/api/quote", quoteRouter);
    this.router.use("/api/decision", decisionRouter);
  }
}

export default new IndexRouter().router;
