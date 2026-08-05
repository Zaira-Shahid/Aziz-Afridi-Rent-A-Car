import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { blogCategories, blogPosts } from "@/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: "Car rental tips, travel guides, and company updates from Signature Rent A Car.",
  path: "/blog",
  keywords: ["car rental tips", "Pakistan travel guide"],
});


const FEATURED_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCi-ndTegXz92ZOPBS7tCROXMLevIDwNzLDAQzT7XzwPLORdEBH3brK1GQHj5RstsVtOO6nARzzY4tzhhbYmlLBD57-_nXk--ucpjisOaEp7WAzeVezq3sPs0xf4_irrAaJny4V9yd6VgUc3X4nKYrQk9PM9taVktRl-E7-PSJKIZT_Z69ZTQc6rLfjCKo3cM82ugNrq6O12jcIHC1JuXUwrVOtGdqyou1JgOc2HDB9vcM0o5qT18Xn";

export default function BlogPage() {
  return (
    <>
      <section className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[520px] lg:min-h-[600px]">
        <Image
          src={FEATURED_IMAGE}
          alt="Black luxury sedan parked at a modern glass villa during golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <Container className="relative z-10 flex min-h-[420px] flex-col justify-end py-12 sm:min-h-[520px] sm:py-16 lg:min-h-[600px] lg:pb-20">
          <span className="mb-4 inline-block w-fit rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white sm:mb-6">
            Featured Article
          </span>
          <h1 className="hero-shadow animate-fade-up max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Mastering Luxury: The Ultimate Guide to Renting Supercars in Islamabad
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base lg:text-lg">
            From route planning to insurance intricacies, discover everything you need for a seamless high-end
            driving experience in the capital.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              href="/blog/mastering-luxury-islamabad"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-primary transition hover:brightness-95 sm:w-auto"
            >
              Read Featured Story
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <span className="text-sm font-medium text-white/70">By Ahmed Malik • 5 min read</span>
          </div>
        </Container>
      </section>

      <section className="border-b border-primary/8 bg-[#f3f4f5] py-8 sm:py-10">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted sm:mb-8">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-medium text-primary">Blog</span>
          </nav>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-3 overflow-x-auto pb-1">
              <span className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white sm:px-6 sm:py-3">
                All Stories
              </span>
              {blogCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/${category.slug}`}
                  className="shrink-0 rounded-xl border border-primary/12 bg-white px-5 py-2.5 text-sm font-semibold text-muted transition hover:border-secondary hover:text-secondary sm:px-6 sm:py-3"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <label className="relative w-full max-w-xs shrink-0">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                search
              </span>
              <input
                type="search"
                placeholder="Search insights..."
                className="w-full rounded-xl border border-primary/12 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-secondary sm:py-3"
              />
            </label>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Signature travel insights: practical guides on renting, driving, and exploring Pakistan — from
            city-specific tips and northern route planning to fleet updates and company news, curated by our
            concierge and operations team.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="grid gap-8 sm:grid-cols-2">
                {blogPosts.map((post) => {
                  const category = blogCategories.find((item) => item.slug === post.category);
                  return (
                    <article
                      key={post.slug}
                      className="luxury-card-shadow group flex flex-col overflow-hidden rounded-xl border border-primary/8 bg-white transition hover:-translate-y-1"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        {category ? (
                          <span className="absolute left-4 top-4 rounded-lg bg-secondary px-3 py-1 text-[12px] font-semibold text-white">
                            {category.name}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-8">
                        <h3 className="font-heading text-lg font-semibold leading-tight text-primary sm:text-xl">
                          <Link href={`/blog/${post.slug}`} className="transition hover:text-secondary">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-3 flex-1 text-sm text-muted">{post.excerpt}</p>
                        <div className="mt-6 flex items-center justify-between border-t border-primary/8 pt-6">
                          <span className="text-xs text-muted">
                            {post.date} • {post.readTime}
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-6 w-full rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:!text-white"
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="space-y-10 lg:col-span-4">
              <div className="relative overflow-hidden rounded-xl bg-navy p-8 text-white">
                <div className="relative z-10">
                  <h4 className="font-heading text-lg font-semibold sm:text-xl">Stay Ahead of the Curve</h4>
                  <p className="mt-3 text-sm text-white/60">
                    Join our readers receiving monthly luxury travel and maintenance insights.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="button"
                      className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-primary transition hover:brightness-95"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
              </div>

              <div className="luxury-card-shadow rounded-xl border border-primary/8 bg-white p-8">
                <h4 className="border-b border-primary/8 pb-4 font-heading text-lg font-semibold">Popular Reads</h4>
                <div className="mt-6 space-y-6">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition group-hover:scale-110"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-primary transition group-hover:text-secondary">
                          {post.title}
                        </h5>
                        <span className="text-xs text-muted">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="luxury-card-shadow rounded-xl border border-primary/8 bg-white p-8">
                <h4 className="border-b border-primary/8 pb-4 font-heading text-lg font-semibold">Categories</h4>
                <ul className="mt-6 space-y-4">
                  {blogCategories.map((category) => (
                    <li key={category.slug}>
                      <Link href={`/blog/${category.slug}`} className="group flex items-center justify-between">
                        <span className="text-sm text-muted transition group-hover:text-primary">{category.name}</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f5] text-xs font-semibold text-primary">
                          {blogPosts.filter((post) => post.category === category.slug).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
