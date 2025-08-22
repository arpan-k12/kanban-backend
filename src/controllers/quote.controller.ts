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
      const card = await CardRepository.getCardById(card_id);
      if (!card) {
        return next(new AppError("Card not found", 404));
      }
      const newQuote = await QuoteRepository.createQuote({
        card_id,
        amount,
        valid_until,
      });
      return sendSuccess(res, "Quote created successfully", newQuote, 201);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const quote_id = req.params.id;
      const { amount, valid_until } = req.body;

      if (!quote_id || !amount || !valid_until) {
        return next(
          new AppError("Quote ID, amount, and valid_until are required", 400)
        );
      }

      const updatedQuote = await QuoteRepository.updateQuote(quote_id, {
        amount,
        valid_until,
      });

      if (!updatedQuote) {
        return next(new AppError("Quote not found or update failed", 404));
      }

      return sendSuccess(res, "Quote updated successfully", updatedQuote, 200);
    } catch (err) {
      next(err);
    }
  }
}
