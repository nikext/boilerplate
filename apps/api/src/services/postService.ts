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

  async createPostWithEmail(data: {
    title: string;
    content?: string;
    authorEmail: string;
  }): Promise<PostWithAuthor> {
    // First get or create a user
    let author = await prisma.user.findUnique({
      where: { email: data.authorEmail },
    });

    if (!author) {
      author = await prisma.user.create({
        data: {
          email: data.authorEmail,
          name: data.authorEmail.split("@")[0], // Use part of email as name
        },
      });
    }

    // Create the post with the author
    return await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: author.id,
      },
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
