import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "middlewares/authentication";
import { CardRepository } from "repositories/cardRepository";
import { CustomerRepository } from "repositories/customerRepository";
import { InquiryRepository } from "repositories/inquiryRepository";
import { KanbanColumnRepository } from "repositories/kanbanColumnRepository";
import { userOrganizationRepository } from "repositories/userOrganizationRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class InquiryController {
  static async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { organization_id, customer_id, commodity, budget } = req.body;
      const id = req.user?.id;
      if (!organization_id || !customer_id || !commodity || !budget) {
        return next(new AppError("all fields are required", 400));
      }
      if (!id) {
        return next(new AppError("Unauthorized: No user id found", 403));
      }

      const userOrg = await userOrganizationRepository.checkUserInOrganization(
        id,
        organization_id
      );

      if (!userOrg) {
        return next(
          new AppError(
            "User does not belong to this organization. Access denied.",
            403
          )
        );
      }
      const customer = await CustomerRepository.getCustomerById(customer_id);
      if (!customer) {
        return next(new AppError("Customer not exits", 404));
      }
      const newInquiry = await InquiryRepository.createInquiry({
        customer_id,
        commodity,
        budget,
      });

      const column = await KanbanColumnRepository.getColumnByPosition(1);
      if (!column) {
        return res.status(400).json({ message: "Default column not found" });
      }

      await CardRepository.incrementCardPositions(column.id);

      const card = await CardRepository.createCard({
        organization_id: organization_id,
        column_id: column.id,
        customer_id: newInquiry?.customer_id,
        inquiry_id: newInquiry?.id,
        assigned_to: req?.user?.id,
        summary: req.body.summary || "",
        card_position: 1,
      });

      if (!card) {
        return next(new AppError("Card creation failed", 500));
      }

      return sendSuccess(
        res,
        "Inquiry created successfully",
        { newInquiry, card },
        201
      );
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedInquiry = await InquiryRepository.deleteInquiry(id);
      if (!deletedInquiry) {
        return next(new AppError("Inquiry not found or delete failed", 404));
      }
      return sendSuccess(
        res,
        "Inquiry deleted successfully",
        deletedInquiry,
        200
      );
    } catch (err) {
      next(err);
    }
  }

  static async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { customer_id, commodity, budget } = req.body;
      if (!customer_id || !commodity || !budget) {
        return next(
          new AppError("Customer ID, commodity, and budget are required", 400)
        );
      }
      const customer = await CustomerRepository.getCustomerById(customer_id);
      if (!customer) {
        return next(new AppError("Customer not exits", 404));
      }
      const updatedInquiry = await InquiryRepository.updateInquiry(id, {
        customer_id,
        commodity,
        budget,
      });
      if (!updatedInquiry) {
        return next(new AppError("Inquiry not found or update failed", 404));
      }

      const existingCard = await CardRepository.getCardByInquiryId(id);

      let updatedCard = null;
      if (existingCard) {
        updatedCard = await CardRepository.updateCard(existingCard.id, {
          customer_id: updatedInquiry.customer_id,
          inquiry_id: updatedInquiry.id,
          assigned_to: req.user?.id,
        });
      } else {
        return next(new AppError("Card not found for the inquiry", 404));
      }

      return sendSuccess(
        res,
        "Inquiry updated successfully",
        updatedInquiry,
        200
      );
    } catch (err) {
      next(err);
    }
  }

  static async getAllInquiry(req: any, res: Response, next: NextFunction) {
    try {
      const inquiries = await InquiryRepository.getAllInquiries();
      return sendSuccess(res, "Inquiries fetched successfully", inquiries, 200);
    } catch (err) {
      next(err);
    }
  }

  static async getInquiryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const inquiry = await InquiryRepository.getInquiryById(id);
      if (!inquiry) {
        return next(new AppError("Inquiry not found", 404));
      }
      return sendSuccess(res, "Inquiry fetched successfully", inquiry, 200);
    } catch (err) {
      next(err);
    }
  }
}
