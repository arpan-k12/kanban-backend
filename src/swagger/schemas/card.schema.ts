export const cardSchemas = {
  CardSchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      column_id: { type: "string", format: "uuid" },
      customer_id: { type: "string", format: "uuid" },
      inquiry_id: { type: "string", format: "uuid" },
      assigned_to: { type: "string", format: "uuid" },
      summary: { type: "string", example: "Urgent steel inquiry" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "column_id", "createdAt", "updatedAt"],
  },

  CardUpdatePositionSchema: {
    type: "object",
    required: ["position"],
    properties: {
      position: {
        type: "integer",
        example: 2,
        description: "Target column position",
      },
    },
  },

  CardUpdateSummarySchema: {
    type: "object",
    required: ["summary"],
    properties: {
      summary: {
        type: "string",
        example: "Updated summary for this inquiry",
      },
    },
  },

  MessageWithCardSchema: {
    type: "object",
    properties: {
      message: { type: "string", example: "Card updated successfully" },
      card: { $ref: "#/components/schemas/CardSchema" },
    },
  },
};
