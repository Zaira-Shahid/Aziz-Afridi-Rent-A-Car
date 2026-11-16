"use client";

import Link from "next/link";
import { useId } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { blogCategories } from "@/data";
import { cn } from "@/lib/utils";

type BlogFiltersProps = {
  activeSlug?: string | null;
  intro?: string;
  /** Current search text. When both search props are given the box filters the posts below. */
  query?: string;
  onQueryChange?: (value: string) => void;
};

const pill = "inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition";

export function BlogFilters({ activeSlug = null, intro, query = "", onQueryChange }: BlogFiltersProps) {
  const allActive = !activeSlug;
  const searchId = useId();
  const activeName = blogCategories.find((c) => c.slug === activeSlug)?.name;

  return (
    <section className="border-b border-line bg-white py-8 sm:py-10 lg:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted sm:mb-8">
          <Link href="/" className="inline-flex min-h-11 items-center hover:text-navy-deep">
            Home
          </Link>
          <Icon name="chevron-right" size={14} />
          {activeSlug ? (
            <>
              <Link href="/blog" className="inline-flex min-h-11 items-center hover:text-navy-deep">
                Blog
              </Link>
              <Icon name="chevron-right" size={14} />
              <span aria-current="page" className="font-semibold text-navy-deep">
                {activeName ?? "Category"}
              </span>
            </>
          ) : (
            <span aria-current="page" className="font-semibold text-navy-deep">
              Blog
            </span>
          )}
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-green-strong">
              Aziz Afridi Journal
            </span>
            <h2 className="font-heading text-2xl font-extrabold italic tracking-tight text-navy-deep sm:text-3xl">
              {allActive ? "Travel Insights & Guides" : activeName}
            </h2>
            {intro ? <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intro}</p> : null}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <label htmlFor={searchId} className="sr-only">
              Search insights
            </label>
            <Icon name="search" size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-green-strong" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => onQueryChange?.(event.target.value)}
              placeholder="Search insights..."
              className="block min-h-12 w-full rounded-xl border border-line bg-surface py-3 pl-12 pr-4 text-base text-navy-deep placeholder:text-muted focus:border-green-strong focus:bg-white sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
          <Link
            href="/blog"
            className={cn(
              pill,
              allActive ? "bg-navy text-white shadow-soft" : "border border-line bg-surface text-navy-deep hover:border-navy",
            )}
          >
            All Stories
          </Link>
          {blogCategories.map((category) => {
            const active = category.slug === activeSlug;
            return (
              <Link
                key={category.slug}
                href={`/blog/${category.slug}`}
                className={cn(
                  pill,
                  active ? "bg-navy text-white shadow-soft" : "border border-line bg-surface text-navy-deep hover:border-navy",
                )}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
