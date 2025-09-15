import { CategoriesAttributes } from "./categories.types";

export interface ProductAttributes {
  id: string;
  name: string;
  category_id: string;
  image: string[];
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type ProductCreateAttributes = Partial<ProductAttributes>;
