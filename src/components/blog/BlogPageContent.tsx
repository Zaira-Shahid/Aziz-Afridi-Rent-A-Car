"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogPostImage } from "@/components/blog/BlogPostImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogCategories } from "@/data";
import { fetchFirebaseBlogPosts } from "@/lib/blog-firestore";
import type { BlogPost } from "@/types";

type BlogPageContentProps = {
  initialPosts: BlogPost[];
};

/** A post matches when the search text appears in its title or excerpt (case-insensitive). */
export function postMatchesQuery(post: BlogPost, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
}

export function BlogPageContent({ initialPosts }: BlogPageContentProps) {
  const [customPosts, setCustomPosts] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchFirebaseBlogPosts()
      .then((items) => {
        if (!cancelled) setCustomPosts(items);
      })
      .catch(() => {
        if (!cancelled) setCustomPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = useMemo(() => {
    const seen = new Set<string>();
    const merged: BlogPost[] = [];
    for (const post of [...customPosts, ...initialPosts]) {
      if (seen.has(post.slug)) continue;
      seen.add(post.slug);
      merged.push(post);
    }
    return merged;
  }, [customPosts, initialPosts]);

  const visible = useMemo(() => posts.filter((post) => postMatchesQuery(post, query)), [posts, query]);
  const featured = posts[0] ?? initialPosts[0];

  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        {featured ? (
          <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
            <div>
              <h1 className="animate-fade-up max-w-2xl font-heading text-3xl font-extrabold italic leading-[1.1] tracking-tight sm:text-5xl">
                {featured.title}
              </h1>
              <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {featured.excerpt}
              </p>
              <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <ButtonLink href={`/blog/${featured.slug}`} variant="green" pill size="lg">
                  Read Featured Story
                  <Icon name="arrow-right" size={18} />
                </ButtonLink>
                <span className="text-sm font-medium text-white/80">
                  By {featured.author} • {featured.readTime}
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
              <BlogPostImage src={featured.image} alt={featured.title} priority sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Container>
        ) : null}
      </header>

      <BlogFilters
        query={query}
        onQueryChange={setQuery}
        intro="Practical guides on renting, driving, and exploring Pakistan — city tips, northern routes, and travel advice from our concierge team."
      />

      <Section tone="surface">
        <SectionHeading title="Latest Stories" className="mb-8 sm:mb-10" />
        {visible.length === 0 ? (
          <p role="status" className="py-10 text-center text-muted">
            No articles match your search.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <li key={post.slug}>
                <BlogCard
                  post={post}
                  index={index}
                  categoryName={blogCategories.find((item) => item.slug === post.category)?.name}
                />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
