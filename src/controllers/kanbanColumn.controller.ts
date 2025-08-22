import { Request, Response, NextFunction } from "express";
import { KanbanColumnRepository } from "repositories/kanbanColumnRepository";
import AppError from "utils/appError";
import { sendSuccess } from "utils/commonResponse";

export class KanbanColumnController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, position } = req.body;
      if (!name || !position) {
        return next(new AppError("name and position are required", 400));
      }

      const newcolumn = await KanbanColumnRepository.createColumn({
        name,
        position,
      });

      return sendSuccess(
        res,
        "new kanban column created successfully",
        newcolumn,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, position } = req.body;
      if (!name && !position) {
        return next(new AppError("name or position is required", 400));
      }

      const updatedColumn = await KanbanColumnRepository.updateColumn(id, {
        name,
        position,
      });

      if (!updatedColumn) {
        return next(new AppError("Kanban column not found", 404));
      }

      return sendSuccess(
        res,
        "kanban column updated successfully",
        updatedColumn,
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
