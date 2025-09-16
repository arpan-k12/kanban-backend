import { Categories } from "models/categories.model";
import { Product } from "models/product.model";
import { ProductCreateAttributes } from "types/models/product.types";
import { Op } from "sequelize";

export class ProductRepository {
  static async createProduct(
    data: ProductCreateAttributes
  ): Promise<Product | null> {
    return Product.create(data);
  }

  static async getAllProduct(search?: any): Promise<Product[]> {
    const where: any = {};

    if (search) {
      const orConditions: any[] = [{ name: { [Op.iLike]: `%${search}%` } }];

      if (!isNaN(Number(search))) {
        orConditions.push({ price: Number(search) });
      }

      where[Op.or] = orConditions;
    }
    return await Product.findAll({
      where,
      include: [
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "image",
        "createdAt",
        "updatedAt",
      ],
    });
  }
  static async getProductById(id: string): Promise<Product | null> {
    return await Product.findByPk(id, {
      include: [
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "image",
        "createdAt",
        "updatedAt",
      ],
    });
  }

  static async updateProduct(
    id: string,
    updateData: Partial<Product>
  ): Promise<Product | null> {
    const [rowsUpdated, [updatedProduct]] = await Product.update(updateData, {
      where: { id },
      returning: true,
    });

    if (rowsUpdated === 0) return null;
    return updatedProduct;
  }

  static async deleteProduct(id: string): Promise<Product | null> {
    const product = await Product.findByPk(id);
    if (!product) {
      return null;
    }
    await product.destroy();
    3;
    return product;
  }
}
