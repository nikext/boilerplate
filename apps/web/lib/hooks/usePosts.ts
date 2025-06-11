"use client";

import { useState, useEffect, useCallback } from "react";
import { postsApi } from "../api";
import { Post, CreatePostRequest, ApiError } from "../api/types";

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createPost: (data: CreatePostRequest) => Promise<Post | null>;
  deletePost: (id: string) => Promise<boolean>;
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsApi.getAllPosts();

      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch posts");
      }
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : "Failed to fetch posts";
      setError(errorMessage);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(
    async (data: CreatePostRequest): Promise<Post | null> => {
      try {
        const response = await postsApi.createPost(data);

        if (response.success && response.data) {
          setPosts((prev) => [...prev, response.data!]);
          return response.data;
        } else {
          throw new Error(response.error || "Failed to create post");
        }
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : "Failed to create post";
        setError(errorMessage);
        console.error("Error creating post:", err);
        return null;
      }
    },
    []
  );

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await postsApi.deletePost(id);

      if (response.success) {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        return true;
      } else {
        throw new Error(response.error || "Failed to delete post");
      }
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : "Failed to delete post";
      setError(errorMessage);
      console.error("Error deleting post:", err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    createPost,
    deletePost,
  };
}

interface UsePostReturn {
  post: Post | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePost(id: string): UsePostReturn {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await postsApi.getPostById(id);

      if (response.success && response.data) {
        setPost(response.data);
      } else {
        throw new Error(response.error || "Failed to fetch post");
      }
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : "Failed to fetch post";
      setError(errorMessage);
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  };
}
