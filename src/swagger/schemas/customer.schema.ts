export const customerSchemas = {
  CustomerSchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      c_name: { type: "string", maxLength: 50, example: "Acme Corporation" },
      c_email: {
        type: "string",
        format: "email",
        example: "contact@acme.com",
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "c_name", "c_email", "createdAt", "updatedAt"],
  },

  CustomerCreateSchema: {
    type: "object",
    required: ["c_name", "c_email"],
    properties: {
      c_name: {
        type: "string",
        maxLength: 50,
        example: "Acme Corporation",
      },
      c_email: {
        type: "string",
        format: "email",
        example: "contact@acme.com",
      },
    },
  },

  CustomerUpdateSchema: {
    type: "object",
    properties: {
      c_name: {
        type: "string",
        maxLength: 50,
        example: "Updated Company Name",
      },
      c_email: {
        type: "string",
        format: "email",
        example: "updated@company.com",
      },
    },
  },

  MessageWithCustomerSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Customer created successfully",
      },
      customer: {
        $ref: "#/components/schemas/CustomerSchema",
      },
    },
  },
};
