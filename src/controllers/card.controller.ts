import { Request, Response, NextFunction } from "express";
import { CardRepository } from "repositories/cardRepository";
import { KanbanColumnRepository } from "repositories/kanbanColumnRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class CardController {
  static async updateCardPosition(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { columnId } = req.body;
      const card_id = req.params.id;
      if (!card_id || !columnId) {
        return next(new AppError("card_id and position are required", 400));
      }
      const column = await KanbanColumnRepository.getColumnById(columnId);
      if (!column) {
        return next(new AppError("Target column not found", 404));
      }
      const updatedCard = await CardRepository.updateCard(card_id, {
        column_id: column.id,
      });
      if (!updatedCard) {
        return next(new AppError("Card not found or update failed", 404));
      }
      return sendSuccess(
        res,
        "Card position updated successfully",
        updatedCard,
        200
      );
    } catch (err) {
      next(err);
    }
  }

  static async addUpdateSummary(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { summary } = req.body;
      const card_id = req.params.id;
      if (!card_id || !summary) {
        return next(new AppError("card_id and summary are required", 400));
      }

      const updatedCard = await CardRepository.updateCard(card_id, {
        summary,
      });
      if (!updatedCard) {
        return next(new AppError("Card not found or update failed", 404));
      }
      return sendSuccess(
        res,
        "Card summary added successfully",
        updatedCard,
        200
      );
    } catch (err) {
      next(err);
    }
  }
  static async getAllCard(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await CardRepository.getAllCards();
      if (!cards) {
        return next(new AppError("No cards found", 404));
      }
      return sendSuccess(res, "Cards retrieved successfully", cards);
    } catch (error) {
      next(error);
    }
  }
}
