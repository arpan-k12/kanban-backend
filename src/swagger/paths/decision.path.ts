import { decisionSchemas } from "../schemas/decision.schema";

export const decisionPaths = {
  "/api/decisions": {
    post: {
      tags: ["Decision"],
      summary: "Create a new decision for a card",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: decisionSchemas.DecisionCreateSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Decision created successfully",
          content: {
            "application/json": {
              schema: decisionSchemas.DecisionSchema,
            },
          },
        },
        400: { description: "Missing card_id or decision" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/decisions/{id}": {
    patch: {
      tags: ["Decision"],
      summary: "Update a decision by ID",
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
            schema: decisionSchemas.DecisionUpdateSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Decision updated successfully",
          content: {
            "application/json": {
              schema: decisionSchemas.DecisionSchema,
            },
          },
        },
        400: { description: "Missing decision_id or decision" },
        404: { description: "Decision not found" },
        500: { description: "Server error" },
      },
    },
  },
};
