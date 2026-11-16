"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { postMatchesQuery } from "@/components/blog/BlogPageContent";
import { BlogPostImage } from "@/components/blog/BlogPostImage";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { blogCategories, blogPosts } from "@/data";
import { cn } from "@/lib/utils";
import type { BlogCategory, BlogPost } from "@/types";

type BlogCategoryContentProps = {
  category: BlogCategory;
  posts: BlogPost[];
};

export function BlogCategoryContent({ category, posts }: BlogCategoryContentProps) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => posts.filter((post) => postMatchesQuery(post, query)), [posts, query]);
  const heroImage =
    posts[0]?.image ??
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80";

  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-green">Category</p>
            <h1 className="max-w-2xl font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              {posts.length} {posts.length === 1 ? "article" : "articles"} with practical rental and travel advice.
            </p>
          </Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <BlogPostImage src={heroImage} alt={category.name} priority sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </Container>
      </header>

      <BlogFilters
        activeSlug={category.slug}
        query={query}
        onQueryChange={setQuery}
        intro={`${posts.length} curated ${posts.length === 1 ? "article" : "articles"} in ${category.name} — tips and guides from Aziz Afridi.`}
      />

      <Section tone="surface">
        {posts.length === 0 ? (
          <p className="text-center text-muted">No articles in this category yet.</p>
        ) : visible.length === 0 ? (
          <p role="status" className="text-center text-muted">
            No articles match your search.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <li key={post.slug}>
                <BlogCard post={post} index={index} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-8">
          <h2 className="font-heading text-lg font-bold text-navy-deep">Browse all categories</h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {blogCategories.map((item) => {
              const active = item.slug === category.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
                      active ? "bg-navy text-white" : "border border-line bg-surface text-navy-deep hover:border-navy",
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        active ? "bg-white/20 text-white" : "bg-navy/10 text-navy",
                      )}
                    >
                      {blogPosts.filter((post) => post.category === item.slug).length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <CtaBanner
        title="Need a car for your next trip?"
        description="Get transparent rates for daily, weekly, and chauffeur rentals across Pakistan."
      />
    </>
  );
}
