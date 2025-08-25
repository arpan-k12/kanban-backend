import { cardSchemas } from "../schemas/card.schema";

export const cardPaths = {
  "/api/cards/{id}": {
    patch: {
      tags: ["Card"],
      summary: "Update card position",
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
            schema: cardSchemas.CardUpdatePositionSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Card position updated",
          content: {
            "application/json": {
              schema: cardSchemas.MessageWithCardSchema,
            },
          },
        },
        400: { description: "Missing card_id or position" },
        404: { description: "Target column or card not found" },
      },
    },
  },

  "/api/cards/summary/{id}": {
    patch: {
      tags: ["Card"],
      summary: "Add or update card summary",
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
            schema: cardSchemas.CardUpdateSummarySchema,
          },
        },
      },
      responses: {
        200: {
          description: "Card summary updated",
          content: {
            "application/json": {
              schema: cardSchemas.MessageWithCardSchema,
            },
          },
        },
        400: { description: "Missing card_id or summary" },
        404: { description: "Card not found" },
      },
    },
  },
};
