// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User Types
export interface User {
  id: string;
  name: string | null;
  email: string;
}

// Post Types
export interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: User;
}

// Request Types
export interface CreatePostRequest {
  title: string;
  content?: string;
  authorEmail: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  published?: boolean;
}

// API Error Type
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}
