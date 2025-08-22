import { userSchemas } from "../schemas/users.schema";

export const userPaths = {
  "/api/auth/signup": {
    post: {
      tags: ["Users"],
      summary: "Signup a new user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: userSchemas.UserSignupSchema,
          },
        },
      },
      responses: {
        201: {
          description: "User created",
          content: {
            "application/json": {
              schema: userSchemas.MessageWithUserSchema,
            },
          },
        },
        400: {
          description: "Email already in use or validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Email already in use",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/signin": {
    post: {
      tags: ["Users"],
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: userSchemas.UserLoginSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: userSchemas.MessageWithUserSchema,
            },
          },
        },
        401: {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Invalid credentials",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
