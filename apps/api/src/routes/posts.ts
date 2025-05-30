import { Router } from "express";
import { prisma } from "@boilerplate/database";
import { CreatePostSchema, UpdatePostSchema, ApiResponse } from "@boilerplate/shared";
import type { PostWithAuthor } from "@boilerplate/shared";

const router = Router();

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
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
});

// GET /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
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
});

// POST /api/posts
router.post("/", async (req, res) => {
  try {
    const validatedData = CreatePostSchema.parse(req.body);

    const post = await prisma.post.create({
      data: validatedData,
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
});

// PUT /api/posts/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = UpdatePostSchema.parse(req.body);

    const post = await prisma.post.update({
      where: { id },
      data: validatedData,
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
});

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id },
    });

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
});

export { router as postRoutes }; 