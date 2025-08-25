import { customerSchemas } from "../schemas/customer.schema";

export const customerPaths = {
  "/api/customers": {
    post: {
      tags: ["Customer"],
      summary: "Create a new customer",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: customerSchemas.CustomerCreateSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Customer created",
          content: {
            "application/json": {
              schema: customerSchemas.MessageWithCustomerSchema,
            },
          },
        },
        400: {
          description: "Validation error",
        },
        500: {
          description: "Server error",
        },
      },
    },
    get: {
      tags: ["Customer"],
      summary: "Get all customers",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of customers",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: customerSchemas.CustomerSchema,
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/api/customers/{id}": {
    get: {
      tags: ["Customer"],
      summary: "Get customer by ID",
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
          description: "Customer details",
          content: {
            "application/json": {
              schema: customerSchemas.CustomerSchema,
            },
          },
        },
        404: { description: "Customer not found" },
      },
    },
    patch: {
      tags: ["Customer"],
      summary: "Update customer by ID",
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
            schema: customerSchemas.CustomerUpdateSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Customer updated",
          content: {
            "application/json": {
              schema: customerSchemas.MessageWithCustomerSchema,
            },
          },
        },
        400: { description: "Validation error" },
        404: { description: "Customer not found" },
      },
    },
    delete: {
      tags: ["Customer"],
      summary: "Delete customer by ID",
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
          description: "Customer deleted",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Customer deleted" },
                },
              },
            },
          },
        },
        404: { description: "Customer not found" },
      },
    },
  },
};
