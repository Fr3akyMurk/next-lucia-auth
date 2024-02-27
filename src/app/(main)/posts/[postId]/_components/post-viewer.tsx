"use client";
import { z } from "zod";
import { type RouterOutputs } from "@/trpc/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostPreview } from "./post-preview";
import { notFound } from 'next/navigation'

interface Props {
  post: RouterOutputs["post"]["get"];
}

const schema = z.object({
  title: z.string().min(3).max(255),
  excerpt: z.string().min(3).max(255),
  content: z
    .string()
    .min(3)
    .max(2048 * 2),
});

export const PostEditor = ({ post }: Props) => {
  if (!post) return null;
  if (post.status !== "published") return notFound();
  const form = useForm({
    defaultValues: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
    },
    resolver: zodResolver(schema),
  });

  return (
    <>
      <div className="flex items-center gap-2">
        {/*<EyeOpenIcon className="h-5 w-5" />*/}
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <PostPreview text={form.watch("excerpt") || post.excerpt} />
      <div className="mt-8 prose prose-sm min-h-[200px] max-w-[none] dark:prose-invert">
        <PostPreview text={form.watch("content") || post.content} />
      </div>
    </>
  );
};