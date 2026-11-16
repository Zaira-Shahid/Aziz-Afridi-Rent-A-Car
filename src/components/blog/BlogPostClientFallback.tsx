"use client";

import { useEffect, useState } from "react";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
      <div role="status" className="flex min-h-[40vh] items-center justify-center bg-surface">
        <p className="text-sm text-muted">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-surface px-4 text-center">
        <h1 className="font-heading text-3xl font-extrabold italic text-navy-deep">Article not found</h1>
        <p className="max-w-md text-sm text-muted">This post may have been removed from Firebase.</p>
        <ButtonLink href="/blog" variant="green" pill size="md">
          Back to Blog
        </ButtonLink>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
}
