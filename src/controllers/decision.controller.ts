import { Request, Response, NextFunction } from "express";
import { CardRepository } from "repositories/cardRepository";
import { DecisionRepository } from "repositories/decisionRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class DecisionController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { card_id, decision, reason } = req.body;

      const newDecision = await DecisionRepository.createDecision({
        decision,
        reason,
      });
      if (!newDecision) {
        return next(new AppError("Decision creation failed", 500));
      }

      const updatedCard = await CardRepository.updateCard(card_id, {
        decision_id: newDecision?.id,
      });
      if (!updatedCard) {
        return next(new AppError("Card not found or update failed", 404));
      }
      return sendSuccess(
        res,
        "Decision created successfully",
        updatedCard,
        201
      );
    } catch (error) {
      next(error);
    }
  }
  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const decision_id = req.params.id;
      const { decision, reason } = req.body;

      if (!decision_id || !decision || !reason) {
        return next(
          new AppError("Decision ID, decision, and reason are required", 400)
        );
      }

      const updatedDecision = await DecisionRepository.updateDecision(
        decision_id,
        {
          decision,
          reason,
        }
      );

      if (!updatedDecision) {
        return next(new AppError("Decision not found or update failed", 404));
      }

      return res.status(200).json(updatedDecision);
    } catch (error) {
      next(error);
    }
  }
}
