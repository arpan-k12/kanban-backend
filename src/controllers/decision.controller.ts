import { Request, Response, NextFunction } from "express";
import { DecisionRepository } from "repositories/decisionRepository";

export class DecisionController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { card_id, decision, reason } = req.body;
      if (!card_id || !decision) {
        return res
          .status(400)
          .json({ message: "card_id and decision are required" });
      }

      const newDecision = await DecisionRepository.createDecision({
        card_id,
        decision,
        reason,
      });

      return res.status(201).json(newDecision);
    } catch (error) {
      next(error);
    }
  }
  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const decision_id = req.params.id;
      const { decision, reason } = req.body;

      if (!decision_id || !decision) {
        return res
          .status(400)
          .json({ message: "decision_id and decision are required" });
      }

      const updatedDecision = await DecisionRepository.updateDecision(
        decision_id,
        {
          decision,
          reason,
        }
      );

      if (!updatedDecision) {
        return res
          .status(404)
          .json({ message: "Decision not found or update failed" });
      }

      return res.status(200).json(updatedDecision);
    } catch (error) {
      next(error);
    }
  }
}
