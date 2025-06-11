// Load environment variables from root .env file
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import cors from "cors";
import { PrismaClient } from "@boilerplate/database";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// Get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, authorEmail } = req.body;

    // First get or create a user
    let author = await prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (!author) {
      author = await prisma.user.create({
        data: {
          email: authorEmail,
          name: authorEmail.split("@")[0], // Use part of email as name
        },
      });
    }

    // Create the post with the author
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: author.id,
      },
      include: {
        author: true,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
