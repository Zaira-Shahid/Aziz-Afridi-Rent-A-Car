"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BlogAdminPanel } from "@/components/blog/BlogAdminPanel";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Container } from "@/components/ui/Container";
import { blogCategories } from "@/data";
import { getStoredBlogPosts } from "@/lib/blog-storage";
import type { BlogPost } from "@/types";

type BlogPageContentProps = {
  initialPosts: BlogPost[];
};

function PostImage({ src, alt }: { src: string; alt: string }) {
  const isLocal = src.startsWith("/");
  if (isLocal) {
    return <Image src={src} alt={alt} fill className="object-cover transition duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, 33vw" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
  );
}

export function BlogPageContent({ initialPosts }: BlogPageContentProps) {
  const [customPosts, setCustomPosts] = useState<BlogPost[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setCustomPosts(getStoredBlogPosts());
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

  const featured = posts[0] ?? initialPosts[0];

  return (
    <>
      <section className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[520px] lg:min-h-[600px]">
        {featured ? (
          featured.image.startsWith("/") ? (
            <Image src={featured.image} alt={featured.title} fill priority className="object-cover" sizes="100vw" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
          )
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <Container className="relative z-10 flex min-h-[420px] flex-col justify-end py-12 sm:min-h-[520px] sm:py-16 lg:min-h-[600px] lg:pb-20">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:brightness-110 sm:mb-6"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            Featured Article
          </button>
          {featured ? (
            <>
              <h1 className="hero-shadow animate-fade-up max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {featured.title}
              </h1>
              <p className="animate-fade-up-delay mt-4 max-w-xl text-sm text-white/80 sm:text-base lg:text-lg">
                {featured.excerpt}
              </p>
              <div className="animate-fade-up-delay-2 mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-primary transition hover:brightness-95 sm:w-auto"
                >
                  Read Featured Story
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <span className="text-sm font-medium text-white/70">
                  By {featured.author} • {featured.readTime}
                </span>
              </div>
            </>
          ) : null}
        </Container>
      </section>

      <BlogFilters intro="Practical guides on renting, driving, and exploring Pakistan — city tips, northern routes, and travel advice from our concierge team." />

      <section className="bg-[#f8f9fa] py-14 sm:py-20 lg:py-[100px]">
        <Container>
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">Latest Stories</h2>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <span className="material-symbols-outlined text-[18px]">edit_square</span>
              Add Blog
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {posts.map((post, index) => {
              const category = blogCategories.find((item) => item.slug === post.category);
              return (
                <AnimateIn key={post.slug} delay={Math.min(index, 5) * 60}>
                  <article className="luxury-card-shadow group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/8 bg-white transition hover:-translate-y-1">
                    <div className="relative h-52 overflow-hidden sm:h-56">
                      <PostImage src={post.image} alt={post.title} />
                      {category ? (
                        <span className="absolute left-4 top-4 rounded-lg bg-secondary px-3 py-1 text-[12px] font-semibold text-white">
                          {category.name}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <h3 className="font-heading text-lg font-semibold leading-tight text-primary sm:text-xl">
                        <Link href={`/blog/${post.slug}`} className="transition hover:text-secondary">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-sm text-muted">{post.excerpt}</p>
                      <div className="mt-5 border-t border-primary/8 pt-5">
                        <span className="text-xs text-muted">
                          {post.date} • {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-5 w-full rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:!text-white"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                </AnimateIn>
              );
            })}
          </div>
        </Container>
      </section>

      <BlogAdminPanel
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onPostsChange={(posts) => setCustomPosts(posts)}
      />
    </>
  );
}
