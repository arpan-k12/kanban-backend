export const quoteSchemas = {
  QuoteSchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      card_id: { type: "string", format: "uuid" },
      amount: { type: "number", example: 15000 },
      valid_until: { type: "string", format: "date", example: "2025-12-31" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: [
      "id",
      "card_id",
      "amount",
      "valid_until",
      "createdAt",
      "updatedAt",
    ],
  },

  QuoteCreateSchema: {
    type: "object",
    required: ["card_id", "amount", "valid_until"],
    properties: {
      card_id: {
        type: "string",
        format: "uuid",
        example: "3f29f4dd-5bca-4af7-b671-9a0a7cb47e2d",
      },
      amount: { type: "number", example: 15000 },
      valid_until: {
        type: "string",
        format: "date",
        example: "2025-12-31",
      },
    },
  },

  QuoteUpdateSchema: {
    type: "object",
    properties: {
      amount: { type: "number", example: 20000 },
      valid_until: { type: "string", format: "date", example: "2026-01-15" },
    },
  },

  MessageWithQuoteSchema: {
    type: "object",
    properties: {
      message: { type: "string", example: "Quote created successfully" },
      quote: { $ref: "#/components/schemas/QuoteSchema" },
    },
  },
};
