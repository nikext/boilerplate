import { apiClient } from "../client";
import {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  ApiResponse,
} from "../types";

export class PostsApi {
  private readonly basePath = "/api/posts";

  /**
   * Get all posts
   */
  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    return apiClient.get<Post[]>(this.basePath);
  }

  /**
   * Get a single post by ID
   */
  async getPostById(id: string): Promise<ApiResponse<Post>> {
    return apiClient.get<Post>(`${this.basePath}/${id}`);
  }

  /**
   * Create a new post
   */
  async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    return apiClient.post<Post>(this.basePath, data);
  }

  /**
   * Update an existing post
   */
  async updatePost(
    id: string,
    data: UpdatePostRequest
  ): Promise<ApiResponse<Post>> {
    return apiClient.put<Post>(`${this.basePath}/${id}`, data);
  }

  /**
   * Delete a post
   */
  async deletePost(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Get posts with pagination (future enhancement)
   */
  async getPostsPaginated(
    params: {
      page?: number;
      limit?: number;
      search?: string;
    } = {}
  ): Promise<ApiResponse<Post[]>> {
    return apiClient.get<Post[]>(this.basePath, {
      params: params as Record<string, string>,
    });
  }
}

// Export singleton instance
export const postsApi = new PostsApi();
