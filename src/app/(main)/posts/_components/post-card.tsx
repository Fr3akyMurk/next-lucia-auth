"use client";

import { EyeOpenIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import * as React from "react";

interface PostCardProps {
  post: RouterOutputs["post"]["myPosts"][number];
  userName?: string;
  setOptimisticPosts: (action: {
    action: "add" | "delete" | "update";
    post: RouterOutputs["post"]["myPosts"][number];
  }) => void;
}

export const PostCard = ({
  post,
  userName,
}: PostCardProps) => {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-base">{post.title}</CardTitle>
        <CardDescription className="line-clamp-1 text-sm">
          {userName ? <span>{userName} at</span> : null}
          {new Date(post.createdAt.toJSON()).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="line-clamp-3 text-sm">{post.excerpt}</CardContent>
      <CardFooter className="flex-row-reverse gap-2">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/${post.id}`}>
            <EyeOpenIcon className="mr-1 h-4 w-4" />
            <span>View</span>
          </Link>
        </Button>
        <Badge variant="outline" className="mr-auto rounded-lg capitalize">
          {post.status} Post
        </Badge>
      </CardFooter>
    </Card>
  );
};
