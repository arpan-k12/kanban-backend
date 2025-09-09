export interface FeaturesAttributes {
  id: string;
  feature_name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type FeaturesCreateAttributes = Partial<FeaturesAttributes>;
