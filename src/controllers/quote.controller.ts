import { Request, Response, NextFunction } from "express";
import { CardRepository } from "repositories/cardRepository";
import { QuoteRepository } from "repositories/quoteRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class QuoteController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { card_id, amount, valid_until } = req.body;

      if (!card_id || !amount || !valid_until) {
        return next(
          new AppError("Card ID, amount, and valid_until are required", 400)
        );
      }
      const quotes = await QuoteRepository.createQuote({
        amount,
        valid_until,
      });
      if (!quotes) {
        return next(new AppError("Quote creation failed", 500));
      }

      const updatedCard = await CardRepository.updateCard(card_id, {
        quote_id: quotes?.id,
      });
      if (!updatedCard) {
        return next(new AppError("Card not found or update failed", 404));
      }

      return sendSuccess(res, "Quote created successfully", updatedCard, 201);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount, valid_until } = req.body;
      const { id } = req.params;

      if (!id || !amount || !valid_until) {
        return next(
          new AppError("Card ID, amount, and valid_until are required", 400)
        );
      }

      const updatedQuote = await QuoteRepository.updateQuote(id, {
        amount,
        valid_until,
      });

      if (!updatedQuote) {
        return next(new AppError("Quote not found or update failed", 404));
      }

      return sendSuccess(res, "Quote updated successfully", updatedQuote);
    } catch (err) {
      next(err);
    }
  }
}
