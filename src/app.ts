import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import { sequelize } from "./config/sequelize";

import globalErrorHandler from "./middlewares/errorHandler";
import routes from "routes";
import swagger from "swagger";

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swagger, {
    swaggerOptions: {
      displayRequestDuration: true,
      tryItOutEnabled: true,
      supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
      docExpansion: "list",
    },
  })
);

app.use(express.json());

app.use("/", routes);

app.use(globalErrorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
})();

export default app;
