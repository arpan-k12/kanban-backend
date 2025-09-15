export interface CategoriesAttributes {
  id: string;
  name: string;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type CategoriesCreateAttributes = Partial<CategoriesAttributes>;
