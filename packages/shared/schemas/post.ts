import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  published: z.boolean().default(false),
  authorId: z.string(),
});

export const UpdatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PostWithAuthorSchema = PostSchema.extend({
  author: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable(),
  }),
});

export type CreatePost = z.infer<typeof CreatePostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
export type Post = z.infer<typeof PostSchema>;
export type PostWithAuthor = z.infer<typeof PostWithAuthorSchema>; 