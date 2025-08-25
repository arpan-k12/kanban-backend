import { quoteSchemas } from "../schemas/quote.schema";

export const quotePaths = {
  "/api/quotes": {
    post: {
      tags: ["Quote"],
      summary: "Create a new quote",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: quoteSchemas.QuoteCreateSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Quote created",
          content: {
            "application/json": {
              schema: quoteSchemas.MessageWithQuoteSchema,
            },
          },
        },
        400: { description: "Missing card_id, amount, or valid_until" },
        404: { description: "Card not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/quotes/{id}": {
    patch: {
      tags: ["Quote"],
      summary: "Update quote by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: quoteSchemas.QuoteUpdateSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Quote updated",
          content: {
            "application/json": {
              schema: quoteSchemas.MessageWithQuoteSchema,
            },
          },
        },
        400: { description: "Validation error" },
        404: { description: "Quote not found" },
      },
    },
  },
};
