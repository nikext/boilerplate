"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePostRequest } from "@/lib/api/types";

interface CreatePostFormProps {
  onSubmit: (data: CreatePostRequest) => Promise<void>;
  loading?: boolean;
}

export function CreatePostForm({
  onSubmit,
  loading = false,
}: CreatePostFormProps) {
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: "",
    content: "",
    authorEmail: "",
  });
  const [errors, setErrors] = useState<Partial<CreatePostRequest>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreatePostRequest> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.authorEmail.trim()) {
      newErrors.authorEmail = "Author email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.authorEmail)) {
      newErrors.authorEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);

      // Reset form on success
      setFormData({
        title: "",
        content: "",
        authorEmail: "",
      });
      setErrors({});
    } catch (error) {
      // Error handling is done in the parent component
      console.error("Form submission error:", error);
    }
  };

  const handleChange =
    (field: keyof CreatePostRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange("title")}
              placeholder="Enter post title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleChange("content")}
              placeholder="Enter post content"
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorEmail">Author Email *</Label>
            <Input
              id="authorEmail"
              type="email"
              value={formData.authorEmail}
              onChange={handleChange("authorEmail")}
              placeholder="Enter author email"
              className={errors.authorEmail ? "border-red-500" : ""}
            />
            {errors.authorEmail && (
              <p className="text-sm text-red-500">{errors.authorEmail}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
