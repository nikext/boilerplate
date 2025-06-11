import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Post } from "@/lib/api/types";

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
  onEdit?: (post: Post) => void;
  showActions?: boolean;
}

export function PostCard({
  post,
  onDelete,
  onEdit,
  showActions = true,
}: PostCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {post.content || "No content available"}
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Author: {post.author.name || post.author.email}</p>
          <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Status: {post.published ? "Published" : "Draft"}</p>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="flex gap-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(post)}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
