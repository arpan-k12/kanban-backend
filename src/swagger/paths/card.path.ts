import { cardSchemas } from "../schemas/card.schema";

export const cardPaths = {
  "/api/card": {
    get: {
      tags: ["Card"],
      summary: "Get all cards for logged-in user",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Cards retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: cardSchemas.CardSchema,
              },
            },
          },
        },
        403: { description: "Unauthorized: No user id found" },
        404: { description: "No cards found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/card/{id}": {
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

  "/api/card/summary/{id}": {
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
