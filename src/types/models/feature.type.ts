export interface FeaturesAttributes {
  id: string;
  featureName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type FeaturesCreateAttributes = Partial<FeaturesAttributes>;
