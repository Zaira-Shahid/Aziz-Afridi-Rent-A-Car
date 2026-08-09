"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { fetchFirebaseBlogPost } from "@/lib/blog-firestore";
import type { BlogPost } from "@/types";

type BlogPostClientFallbackProps = {
  slug: string;
};

export function BlogPostClientFallback({ slug }: BlogPostClientFallbackProps) {
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetchFirebaseBlogPost(slug)
      .then((item) => {
        if (!cancelled) setPost(item);
      })
      .catch(() => {
        if (!cancelled) setPost(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-muted">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#f8f9fa] px-4 text-center">
        <h1 className="font-heading text-2xl font-semibold text-primary">Article not found</h1>
        <p className="max-w-md text-sm text-muted">This post may have been removed from Firebase.</p>
        <Link href="/blog" className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
}
