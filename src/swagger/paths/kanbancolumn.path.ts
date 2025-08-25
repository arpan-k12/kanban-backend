import { kanbanColumnSchemas } from "../schemas/kanbanColumn.schema";

export const kanbanColumnPaths = {
  "/api/kanban-columns": {
    post: {
      tags: ["KanbanColumn"],
      summary: "Create a new Kanban column",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: kanbanColumnSchemas.KanbanColumnCreateSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Kanban column created",
          content: {
            "application/json": {
              schema: kanbanColumnSchemas.MessageWithKanbanColumnSchema,
            },
          },
        },
        400: { description: "Validation error (name and position required)" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/kanban-columns/{id}": {
    patch: {
      tags: ["KanbanColumn"],
      summary: "Update Kanban column by ID",
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
            schema: kanbanColumnSchemas.KanbanColumnUpdateSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Kanban column updated",
          content: {
            "application/json": {
              schema: kanbanColumnSchemas.MessageWithKanbanColumnSchema,
            },
          },
        },
        400: { description: "Validation error" },
        404: { description: "Kanban column not found" },
      },
    },
  },
};
