import { Features } from "models/features.model";

export class featureRepository {
  static async findByName(feature_name: string): Promise<Features | null> {
    return Features.findOne({
      where: { feature_name },
      attributes: ["id"],
    });
  }
}
