import { KanbanColumn } from "models/kanbanColumn.model";
import { KanbanColumnCreateAttributes } from "types/models/kanbanColumn.types";

export class KanbanColumnRepository {
  static async createColumn(
    data: KanbanColumnCreateAttributes
  ): Promise<KanbanColumn | null> {
    return KanbanColumn.create(data);
  }
  static async updateColumn(
    id: string,
    data: Partial<KanbanColumnCreateAttributes>
  ): Promise<KanbanColumn | null> {
    const column = await KanbanColumn.findByPk(id);
    if (!column) {
      return null;
    }
    await column.update(data);
    return column;
  }
  static async getColumnByPosition(
    position: number
  ): Promise<KanbanColumn | null> {
    return KanbanColumn.findOne({ where: { position } });
  }
  static async getColumnById(id: string): Promise<KanbanColumn | null> {
    return KanbanColumn.findByPk(id);
  }
  static async getAllColumns(): Promise<KanbanColumn[]> {
    return KanbanColumn.findAll({ order: [["position", "ASC"]] });
  }
}
