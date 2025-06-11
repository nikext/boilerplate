import { Request, Response } from "express";
import { postService } from "../services/postService";
import { CreatePostSchema, UpdatePostSchema } from "@boilerplate/shared";
import { ApiResponse } from "../types/apiResponse";
import type { PostWithAuthor } from "@boilerplate/shared";

export class PostController {
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts();

      const response: ApiResponse<PostWithAuthor[]> = {
        success: true,
        data: posts,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch posts",
      });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Post ID is required",
        });
      }

      const post = await postService.getPostById(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          error: "Post not found",
        });
      }

      const response: ApiResponse<PostWithAuthor> = {
        success: true,
        data: post,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch post",
      });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const { title, content, authorEmail } = req.body;

      if (!title || !authorEmail) {
        return res.status(400).json({
          success: false,
          error: "Title and author email are required",
        });
      }

      // Handle authorEmail by finding or creating user (for backwards compatibility)
      const post = await postService.createPostWithEmail({
        title,
        content,
        authorEmail,
      });

      const response: ApiResponse<PostWithAuthor> = {
        success: true,
        data: post,
        message: "Post created successfully",
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to create post",
      });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Post ID is required",
        });
      }

      const validatedData = UpdatePostSchema.parse(req.body);
      const post = await postService.updatePost(id, validatedData);

      const response: ApiResponse<PostWithAuthor> = {
        success: true,
        data: post,
        message: "Post updated successfully",
      };

      res.json(response);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to update post",
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Post ID is required",
        });
      }

      await postService.deletePost(id);

      const response: ApiResponse = {
        success: true,
        message: "Post deleted successfully",
      };

      res.json(response);
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete post",
      });
    }
  }
}

export const postController = new PostController();
