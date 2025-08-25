import { inquirySchemas } from "../schemas/inquiry.schema";

export const inquiryPaths = {
  "/api/inquiries": {
    post: {
      tags: ["Inquiry"],
      summary: "Create a new inquiry",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: inquirySchemas.InquiryCreateSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Inquiry created",
          content: {
            "application/json": {
              schema: inquirySchemas.MessageWithInquirySchema,
            },
          },
        },
        400: {
          description: "Validation error or missing customer",
        },
        500: { description: "Server error" },
      },
    },
    get: {
      tags: ["Inquiry"],
      summary: "Get all inquiries",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of inquiries",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: inquirySchemas.InquirySchema,
              },
            },
          },
        },
        500: { description: "Server error" },
      },
    },
  },

  "/api/inquiries/{id}": {
    get: {
      tags: ["Inquiry"],
      summary: "Get inquiry by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: {
          description: "Inquiry details",
          content: {
            "application/json": {
              schema: inquirySchemas.InquirySchema,
            },
          },
        },
        404: { description: "Inquiry not found" },
      },
    },
    patch: {
      tags: ["Inquiry"],
      summary: "Update inquiry by ID",
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
            schema: inquirySchemas.InquiryUpdateSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Inquiry updated",
          content: {
            "application/json": {
              schema: inquirySchemas.MessageWithInquirySchema,
            },
          },
        },
        400: { description: "Validation error" },
        404: { description: "Inquiry not found" },
      },
    },
    delete: {
      tags: ["Inquiry"],
      summary: "Delete inquiry by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: {
          description: "Inquiry deleted",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Inquiry deleted" },
                },
              },
            },
          },
        },
        404: { description: "Inquiry not found" },
      },
    },
  },
};
