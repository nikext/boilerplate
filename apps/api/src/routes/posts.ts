import { Router } from "express";
import { postController } from "../controllers/postController";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

// GET /api/posts
router.get("/", asyncHandler(postController.getAllPosts.bind(postController)));

// GET /api/posts/:id
router.get(
  "/:id",
  asyncHandler(postController.getPostById.bind(postController))
);

// POST /api/posts
router.post("/", asyncHandler(postController.createPost.bind(postController)));

// PUT /api/posts/:id
router.put(
  "/:id",
  asyncHandler(postController.updatePost.bind(postController))
);

// DELETE /api/posts/:id
router.delete(
  "/:id",
  asyncHandler(postController.deletePost.bind(postController))
);

export { router as postRoutes };
