export const userSchemas = {
  UserSchema: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      user_name: { type: "string", maxLength: 30 },
      email: { type: "string", format: "email", maxLength: 40 },
      role: {
        type: "string",
        enum: ["0", "1"],
        description: "0 for user, 1 for admin",
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "email", "createdAt", "updatedAt"],
  },

  UserSignupSchema: {
    type: "object",
    required: ["user_name", "email", "password", "confirmPassword", "role"],
    properties: {
      user_name: {
        type: "string",
        maxLength: 30,
        example: "JohnDoe",
      },

      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "StrongPassword123!",
      },
      confirmPassword: {
        type: "string",
        format: "password",
        example: "StrongPassword123!",
      },
      role: {
        type: "string",
        enum: ["0", "1"],
        description: "0 for user, 1 for admin",
        example: "0",
      },
    },
  },

  UserLoginSchema: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "StrongPassword123!",
      },
    },
  },

  MessageWithUserSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "User created",
      },
      user: {
        $ref: "#/components/schemas/UserSchema",
      },
    },
  },
};
