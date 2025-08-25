export const kanbanColumnSchemas = {
  KanbanColumnSchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string", maxLength: 100, example: "To Do" },
      position: { type: "integer", example: 1 },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "name", "position", "createdAt", "updatedAt"],
  },

  KanbanColumnCreateSchema: {
    type: "object",
    required: ["name", "position"],
    properties: {
      name: {
        type: "string",
        maxLength: 100,
        example: "In Progress",
      },
      position: {
        type: "integer",
        example: 2,
      },
    },
  },

  KanbanColumnUpdateSchema: {
    type: "object",
    properties: {
      name: { type: "string", example: "Updated Column Name" },
      position: { type: "integer", example: 3 },
    },
  },

  MessageWithKanbanColumnSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Kanban column created successfully",
      },
      column: { $ref: "#/components/schemas/KanbanColumnSchema" },
    },
  },
};
