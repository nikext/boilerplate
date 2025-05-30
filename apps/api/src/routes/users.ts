import { Router } from "express";
import { prisma } from "@boilerplate/database";
import { CreateUserSchema, UpdateUserSchema, ApiResponse } from "@boilerplate/shared";
import type { User } from "@boilerplate/shared";

const router = Router();

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    const response: ApiResponse<User[]> = {
      success: true,
      data: users,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
    });
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const response: ApiResponse<User> = {
      success: true,
      data: user,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
    });
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const validatedData = CreateUserSchema.parse(req.body);

    const user = await prisma.user.create({
      data: validatedData,
    });

    const response: ApiResponse<User> = {
      success: true,
      data: user,
      message: "User created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateUserSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id },
      data: validatedData,
    });

    const response: ApiResponse<User> = {
      success: true,
      data: user,
      message: "User updated successfully",
    };

    res.json(response);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
      message: "User deleted successfully",
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    });
  }
});

export { router as userRoutes }; 