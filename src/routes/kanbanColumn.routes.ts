import { KanbanColumnController } from "controllers/kanbanColumn.controller";
import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "middlewares/authentication";

export class KanbanColumnRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) => {
      KanbanColumnController.create(req, res, next);
    });
    this.router.patch(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        KanbanColumnController.update(req, res, next);
      }
    );
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      KanbanColumnController.getAllColumn(req, res, next);
    });
  }
}

export default new KanbanColumnRouter().router;
