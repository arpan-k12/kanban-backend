import { Decision } from "models/decision.model";
import { DecisionCreateAttributes } from "types/models/decision.types";

export class DecisionRepository {
  static async createDecision(
    data: DecisionCreateAttributes
  ): Promise<Decision | null> {
    return Decision.create(data);
  }
  static async updateDecision(
    id: string,
    data: Partial<DecisionCreateAttributes>
  ): Promise<Decision | null> {
    const decision = await Decision.findByPk(id);
    if (!decision) {
      return null;
    }
    await decision.update(data);
    return decision;
  }
}
