// Load environment variables from root .env file
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { postRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { ApiResponse } from "./types/apiResponse";
import { config } from "./config";

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(helmet());
app.use(morgan(config.isDevelopment ? "dev" : "combined"));

// Health check
app.get("/", (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: "API is running",
  };
  res.json(response);
});

// API Routes
app.use("/api/posts", postRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
