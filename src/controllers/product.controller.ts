import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { ProductRepository } from "repositories/productRepository";
import { ProductCreateAttributes } from "types/models/product.types";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category_id, description, price } = req.body;

      if (!name || !category_id || !description || !price) {
        return next(new AppError("all fields are required", 400));
      }

      const files = req.files as Express.Multer.File[];
      const imagePaths = files.map((file) => `/productImg/${file.filename}`);

      const payload: ProductCreateAttributes = {
        name,
        category_id,
        description,
        price,
        image: imagePaths.length ? imagePaths : [],
      };

      const product = await ProductRepository.createProduct(payload);

      return sendSuccess(res, "product created successfully", product, 201);
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductRepository.getAllProduct();

      if (!products) {
        return next(new AppError("No Product mappings found", 400));
      }

      return sendSuccess(res, "product fetched successfully", products, 200);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new AppError("product ID is required", 400));
      }
      const product = await ProductRepository.getProductById(id);

      if (!product) {
        return next(new AppError("Product not found", 400));
      }

      return sendSuccess(res, "product fetched successfully", product, 200);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, category_id, description, price, keepImages } = req.body;

      if (!name || !category_id || !description || !price) {
        return next(new AppError("All fields are required", 400));
      }

      const product = await ProductRepository.getProductById(id);
      if (!product) {
        return next(new AppError("Product not found", 404));
      }

      let keepImagesArray: string[] = [];
      if (keepImages) {
        keepImagesArray = JSON.parse(keepImages);
      }

      const files = req.files as Express.Multer.File[] | undefined;
      const newImagePaths = files
        ? files.map((file) => `/productImg/${file.filename}`)
        : [];

      const finalImages = [...keepImagesArray, ...newImagePaths];

      const removedImages =
        product.image?.filter(
          (img: string) => !keepImagesArray.includes(img)
        ) || [];

      removedImages.forEach((imgPath: string) => {
        const absolutePath = path.join(
          __dirname,
          `../../${imgPath.replace(/^\//, "")}`
        );
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
      });

      const updateData: any = {
        name,
        category_id,
        description,
        price,
        image: finalImages,
      };

      const updatedProduct = await ProductRepository.updateProduct(
        id,
        updateData
      );

      return sendSuccess(
        res,
        "Product updated successfully",
        updatedProduct,
        200
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedProduct = await ProductRepository.deleteProduct(id);

      if (!deletedProduct) {
        return next(new AppError("Product not found", 404));
      }
      return sendSuccess(
        res,
        "Product deleted successfully",
        deletedProduct,
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
