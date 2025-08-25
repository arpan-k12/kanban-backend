export const inquirySchemas = {
  InquirySchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      customer_id: { type: "string", format: "uuid" },
      commodity: { type: "string", example: "Steel" },
      budget: { type: "number", example: 50000 },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: [
      "id",
      "customer_id",
      "commodity",
      "budget",
      "createdAt",
      "updatedAt",
    ],
  },

  InquiryCreateSchema: {
    type: "object",
    required: ["customer_id", "commodity", "budget"],
    properties: {
      customer_id: {
        type: "string",
        format: "uuid",
        example: "d2fddf9e-12f4-43b1-a4e8-67b3a3ac08b5",
      },
      commodity: {
        type: "string",
        example: "Steel",
      },
      budget: {
        type: "number",
        example: 50000,
      },
      summary: {
        type: "string",
        example: "Urgent requirement for steel pipes",
      },
    },
  },

  InquiryUpdateSchema: {
    type: "object",
    properties: {
      commodity: { type: "string", example: "Updated Commodity" },
      budget: { type: "number", example: 75000 },
      summary: { type: "string", example: "Updated summary" },
    },
  },

  MessageWithInquirySchema: {
    type: "object",
    properties: {
      message: { type: "string", example: "Inquiry created successfully" },
      inquiry: { $ref: "#/components/schemas/InquirySchema" },
      card: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          summary: { type: "string", example: "Inquiry card summary" },
          assigned_to: { type: "string", format: "uuid" },
        },
      },
    },
  },
};
