"use client";

import { toast } from "@/components/ui/use-toast";
import { usePosts } from "@/lib/hooks/usePosts";
import { CreatePostForm } from "@/components/posts/CreatePostForm";
import { PostCard } from "@/components/posts/PostCard";
import { CreatePostRequest } from "@/lib/api/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export default function Home() {
  const { posts, loading, error, refetch, createPost, deletePost } = usePosts();

  const handleCreatePost = async (data: CreatePostRequest) => {
    const result = await createPost(data);
    if (result) {
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    const success = await deletePost(id);
    if (success) {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={refetch} className="w-full">
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Modern Blog Application
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Post Form */}
        <CreatePostForm onSubmit={handleCreatePost} loading={loading} />

        {/* Posts List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Posts ({posts.length})</CardTitle>
            <Button
              variant="outline"
              onClick={refetch}
              disabled={loading}
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </CardHeader>
          <CardContent>
            {loading && posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
                <p className="text-muted-foreground mt-4">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No posts found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create your first post to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                    showActions={true}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
