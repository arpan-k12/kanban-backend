export interface DecisionAttributes {
  id: string;
  decision: string;
  reason?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type DecisionCreateAttributes = Partial<DecisionAttributes>;
