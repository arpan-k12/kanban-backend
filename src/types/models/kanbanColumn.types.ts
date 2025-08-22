export interface KanbanColumnAttributes {
  id: string;
  name: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type KanbanColumnCreateAttributes = Partial<KanbanColumnAttributes>;
