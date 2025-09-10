import { Router } from "express";
import authRouter from "./auth.routes";
import customerRouter from "./customer.routes";
import inquiryRouter from "./inquiry.routes";
import kanbanColumnRouter from "./kanbanColumn.routes";
import cardRouter from "./card.routes";
import decisionRouter from "./decision.route";
import quoteRouter from "./quote.routes";
import organizationRouter from "./organization.routes";
import usersRouter from "./users.routes";
import userOrganizationRouter from "./userOrganization.routes";
import { authentication } from "middlewares/authentication";

export class IndexRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/api/auth", authRouter);
    this.router.use("/api/customer", authentication, customerRouter);
    this.router.use("/api/inquiry", authentication, inquiryRouter);
    this.router.use("/api/kanbancolumns", authentication, kanbanColumnRouter);
    this.router.use("/api/card", authentication, cardRouter);
    this.router.use("/api/quote", authentication, quoteRouter);
    this.router.use("/api/decision", authentication, decisionRouter);
    this.router.use("/api/organization", authentication, organizationRouter);
    this.router.use("/api/users", authentication, usersRouter);
    this.router.use(
      "/api/user-organization",
      authentication,
      userOrganizationRouter
    );
  }
}

export default new IndexRouter().router;
