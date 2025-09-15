import { Categories } from "models/categories.model";

export class CategoryRepository {
  static async getAllCategories(): Promise<Categories[]> {
    return Categories.findAll();
  }
}
