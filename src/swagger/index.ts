// import { cartPaths } from "./paths/cart.paths";
// import { categoryPaths } from "./paths/categories.path";
// import { productsPaths } from "./paths/products.path";
import { userPaths } from "./paths/users.path";
// import { wishlistPaths } from "./paths/wishlists.path";
// import { cartSchemas } from "./schemas/cart.schema";
// import { categorySchemas } from "./schemas/categories.schema";
// import { productsSchemas } from "./schemas/products.schema";
// import { userSchemas } from "./schemas/users.schema";
// import { wishlistSchemas } from "./schemas/wishlists.schema";

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
    { name: "Kanbancolumns", description: "Kanbancolumns endpoints" },
    { name: "Card", description: "Card endpoints" },
    { name: "Quote", description: "Quote endpoints" },
    { name: "Decision", description: "Decision endpoints" },
  ],
  paths: {
    ...userPaths,
    // ...categoryPaths,
    // ...productsPaths,
    // ...wishlistPaths,
    // ...cartPaths,
  },
  components: {
    schemas: {
      //   ...userSchemas,
      //   ...categorySchemas,
      //   ...productsSchemas,
      //   ...wishlistSchemas,
      //   ...cartSchemas,
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
