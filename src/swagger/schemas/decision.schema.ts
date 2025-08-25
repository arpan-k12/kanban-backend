export const decisionSchemas = {
  DecisionSchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      card_id: { type: "string", format: "uuid" },
      decision: {
        type: "string",
        enum: ["approved", "rejected", "pending"],
        example: "approved",
      },
      reason: { type: "string", example: "Customer meets all criteria" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "card_id", "decision", "createdAt", "updatedAt"],
  },

  DecisionCreateSchema: {
    type: "object",
    required: ["card_id", "decision"],
    properties: {
      card_id: {
        type: "string",
        format: "uuid",
        example: "d8c1a3f2-4a77-4f94-bb3f-3c928a7ef122",
      },
      decision: {
        type: "string",
        enum: ["approved", "rejected", "pending"],
        example: "rejected",
      },
      reason: { type: "string", example: "Insufficient documents provided" },
    },
  },

  DecisionUpdateSchema: {
    type: "object",
    required: ["decision"],
    properties: {
      decision: {
        type: "string",
        enum: ["approved", "rejected", "pending"],
        example: "approved",
      },
      reason: { type: "string", example: "Credit score updated successfully" },
    },
  },

  MessageWithDecisionSchema: {
    type: "object",
    properties: {
      message: { type: "string", example: "Decision created successfully" },
      decision: { $ref: "#/components/schemas/DecisionSchema" },
    },
  },
};
