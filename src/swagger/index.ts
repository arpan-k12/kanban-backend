import { cardPaths } from "./paths/card.path";
import { customerPaths } from "./paths/customer.path";
import { decisionPaths } from "./paths/decision.path";
import { inquiryPaths } from "./paths/inquiry.path";
import { kanbanColumnPaths } from "./paths/kanbancolumn.path";
import { quotePaths } from "./paths/quote.path";
import { userPaths } from "./paths/users.path";
import { cardSchemas } from "./schemas/card.schema";
import { customerSchemas } from "./schemas/customer.schema";
import { decisionSchemas } from "./schemas/decision.schema";
import { inquirySchemas } from "./schemas/inquiry.schema";
import { kanbanColumnSchemas } from "./schemas/kanbanColumn.schema";
import { quoteSchemas } from "./schemas/quote.schema";
import { userSchemas } from "./schemas/users.schema";

const swagger = {
  openapi: "3.0.0",
  info: {
    title: "kanaban board API",
    version: "1.0.0",
  },
  tags: [
    { name: "Users", description: "Users endpoints" },
    { name: "Customer", description: "Customer endpoints" },
    { name: "Inquiry", description: "Inquiry endpoints" },
    { name: "KanbanColumn", description: "KanbanColumn endpoints" },
    { name: "Card", description: "Card endpoints" },
    { name: "Quote", description: "Quote endpoints" },
    { name: "Decision", description: "Decision endpoints" },
  ],
  paths: {
    ...userPaths,
    ...customerPaths,
    ...inquiryPaths,
    ...kanbanColumnPaths,
    ...cardPaths,
    ...quotePaths,
    ...decisionPaths,
  },
  components: {
    schemas: {
      ...userSchemas,
      ...customerSchemas,
      ...inquirySchemas,
      ...kanbanColumnSchemas,
      ...cardSchemas,
      ...quoteSchemas,
      ...decisionSchemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export default swagger;
