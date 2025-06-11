import { prisma } from "../config/database";
import type {
  CreatePostSchema,
  UpdatePostSchema,
  PostWithAuthor,
} from "@boilerplate/shared";
import { z } from "zod";

export class PostService {
  async getAllPosts(): Promise<PostWithAuthor[]> {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getPostById(id: string): Promise<PostWithAuthor | null> {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async createPost(
    data: z.infer<typeof CreatePostSchema>
  ): Promise<PostWithAuthor> {
    return await prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async updatePost(
    id: string,
    data: z.infer<typeof UpdatePostSchema>
  ): Promise<PostWithAuthor> {
    return await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  }
}

export const postService = new PostService();
