import { ProductController } from "controllers/product.controller";
import { Router, Request, Response, NextFunction } from "express";
import { uploadMultiple } from "helper/fileUpload";

export class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      uploadMultiple,
      (req: Request, res: Response, next: NextFunction) => {
        ProductController.create(req, res, next);
      }
    );
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      ProductController.get(req, res, next);
    });
    this.router.get(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        ProductController.getProductById(req, res, next);
      }
    );
    this.router.patch(
      "/:id",
      uploadMultiple,
      (req: Request, res: Response, next: NextFunction) => {
        ProductController.updateProduct(req, res, next);
      }
    );

    this.router.delete(
      "/:id",
      (req: Request, res: Response, next: NextFunction) => {
        ProductController.deleteProduct(req, res, next);
      }
    );
  }
}

export default new ProductRouter().router;
