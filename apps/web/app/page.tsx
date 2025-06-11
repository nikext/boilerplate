"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  author: User;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch("http://localhost:3001/api/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
      toast({
        title: "Success",
        description: `Fetched ${data.length} posts`,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch posts. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !authorEmail) {
      toast({
        title: "Error",
        description: "Title and author email are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, authorEmail }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const newPost = await response.json();
      setPosts((prev) => [...prev, newPost]);
      setTitle("");
      setContent("");
      setAuthorEmail("");

      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Database Connection Test - Blog Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter post title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setContent(e.target.value)
                  }
                  placeholder="Enter post content"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorEmail">Author Email</Label>
                <Input
                  id="authorEmail"
                  type="email"
                  value={authorEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthorEmail(e.target.value)
                  }
                  placeholder="Enter author email"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create Post"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Posts List</CardTitle>
            <Button
              variant="outline"
              onClick={fetchPosts}
              disabled={fetchLoading}
            >
              {fetchLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No posts found
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm mt-1">
                      {post.content || "No content"}
                    </p>
                    <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                      <p>Author: {post.author.name || post.author.email}</p>
                      <p>
                        Created: {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Total Posts: {posts.length}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
