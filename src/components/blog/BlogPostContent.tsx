import Link from "next/link";
import { BlogPostImage } from "@/components/blog/BlogPostImage";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { blogCategories, blogPosts } from "@/data";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

type BlogPostContentProps = {
  post: BlogPost;
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  const category = blogCategories.find((item) => item.slug === post.category);
  const related = blogPosts
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <Reveal>
            {category ? (
              <Link
                href={`/blog/${category.slug}`}
                className="mb-4 inline-flex min-h-11 w-fit items-center rounded-full bg-green-strong px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-green-deep"
              >
                {category.name}
              </Link>
            ) : null}
            <h1 className="max-w-3xl font-heading text-3xl font-extrabold italic leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{post.excerpt}</p>
            <p className="mt-6 text-sm font-medium text-white/80">
              By {post.author} • {post.date} • {post.readTime}
            </p>
          </Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <BlogPostImage src={post.image} alt={post.title} priority sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </Container>
      </header>

      <section className="border-b border-line bg-white">
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 py-1 text-xs text-muted">
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-navy-deep">
              Home
            </Link>
            <Icon name="chevron-right" size={14} />
            <Link href="/blog" className="inline-flex min-h-11 items-center hover:text-navy-deep">
              Blog
            </Link>
            {category ? (
              <>
                <Icon name="chevron-right" size={14} />
                <Link href={`/blog/${category.slug}`} className="inline-flex min-h-11 items-center hover:text-navy-deep">
                  {category.name}
                </Link>
              </>
            ) : null}
            <Icon name="chevron-right" size={14} />
            <span aria-current="page" className="line-clamp-1 font-semibold text-navy-deep">
              {post.title}
            </span>
          </nav>
        </Container>
      </section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-fg sm:text-lg">
                {post.content.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {post.tips && post.tips.length > 0 ? (
              <Reveal delay={80}>
                <div className="mt-10 rounded-panel rounded-tr-[3.5rem] bg-navy-deep p-6 text-white sm:p-8">
                  <h2 className="font-heading text-xl font-extrabold italic">Quick tips</h2>
                  <ul className="mt-4 space-y-3">
                    {post.tips.map((tip) => (
                      <li key={tip} className="flex gap-3 text-sm text-white/90 sm:text-base">
                        <Icon name="check-circle" size={22} className="mt-0.5 shrink-0 text-green" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            {post.cta ? (
              <Reveal delay={120}>
                <p className="mt-10 border-l-4 border-green-strong pl-5 text-base font-medium text-navy-deep sm:text-lg">
                  {post.cta}
                </p>
              </Reveal>
            ) : null}
          </article>

          <aside className="space-y-8 lg:col-span-4">
            <Reveal delay={60}>
              <div className="rounded-card border border-line bg-white p-6 shadow-soft sm:p-8">
                <h2 className="border-b border-line pb-4 font-heading text-lg font-bold text-navy-deep">Categories</h2>
                <ul className="mt-3">
                  {blogCategories.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/blog/${item.slug}`}
                        className={cn(
                          "inline-flex min-h-11 items-center text-sm transition hover:text-green-strong",
                          item.slug === post.category ? "font-bold text-green-strong" : "text-muted",
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {related.length > 0 ? (
              <Reveal delay={100}>
                <div className="rounded-card border border-line bg-white p-6 shadow-soft sm:p-8">
                  <h2 className="border-b border-line pb-4 font-heading text-lg font-bold text-navy-deep">
                    Related reads
                  </h2>
                  <div className="mt-5 space-y-5">
                    {related.map((item) => (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-4">
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg rounded-tr-2xl">
                          <BlogPostImage
                            src={item.image}
                            alt=""
                            sizes="64px"
                            className="transition motion-safe:group-hover:scale-110"
                          />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-navy-deep transition group-hover:text-green-strong">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted">{item.date}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </aside>
        </div>
      </Section>

      <CtaBanner
        title="Plan your next trip with Aziz Afridi"
        description="Book a sedan, SUV, or chauffeur for city days, airport transfers, and mountain weekends."
      />
    </>
  );
}
