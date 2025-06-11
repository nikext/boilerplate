// API Client
export { apiClient } from "./client";

// Types
export * from "./types";

// Endpoints
export { postsApi } from "./endpoints/posts";

// Re-export for convenience
export type {
  Post,
  User,
  CreatePostRequest,
  UpdatePostRequest,
  ApiResponse,
} from "./types";
