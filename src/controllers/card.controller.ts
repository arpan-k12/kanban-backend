import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
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
      const { columnId, card_position } = req.body;
      const card_id = req.params.id;

      // if (!card_id || !columnId) {
      //   return next(new AppError("card_id and position are required", 400));
      // }
      // const column = await KanbanColumnRepository.getColumnById(columnId);
      // if (!column) {
      //   return next(new AppError("Target column not found", 404));
      // }
      // const updatedCard = await CardRepository.updateCard(card_id, {
      //   column_id: column.id,
      // });
      // if (!updatedCard) {
      //   return next(new AppError("Card not found or update failed", 404));
      // }

      if (!card_id || !columnId || card_position == null) {
        return next(
          new AppError("card_id, columnId and card_position are required", 400)
        );
      }

      const card = await CardRepository.getCardById(card_id);
      if (!card) {
        return next(new AppError("Card not found", 404));
      }
      const sourceColumnId = card.column_id;

      if (sourceColumnId === columnId) {
        await CardRepository.shiftCardWithinColumn(
          card_id,
          columnId,
          card.card_position,
          card_position
        );
      } else {
        await CardRepository.removeCardFromColumn(card_id, sourceColumnId);
        await CardRepository.insertCardToColumn(
          card_id,
          columnId,
          card_position
        );
        await CardRepository.reorderColumnCards(sourceColumnId);
      }
      await CardRepository.reorderColumnCards(columnId);

      const updatedCards = await CardRepository.getCardsByColumnId(columnId);

      return sendSuccess(
        res,
        "Card position updated successfully",
        updatedCards,
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
  static async getAllCard(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.user?.id;
      if (!id) {
        return next(new AppError("Unauthorized: No user id found", 401));
      }

      const cards = await CardRepository.getAllCards(id);

      if (!cards || cards.length === 0) {
        return next(new AppError("No cards found", 404));
      }

      return sendSuccess(res, "Cards retrieved successfully", cards);
    } catch (error) {
      next(error);
    }
  }
}
