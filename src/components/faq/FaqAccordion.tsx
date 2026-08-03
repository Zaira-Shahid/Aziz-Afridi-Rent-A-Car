"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqCategory = { slug: string; label: string };
type FaqEntry = { question: string; answer: string; category: string };

type FaqAccordionProps = {
  categories: FaqCategory[];
  faqs: FaqEntry[];
};

export function FaqAccordion({ categories, faqs }: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? "");
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = faqs.filter((item) => item.category === activeCategory);

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    setOpenIndex(0);
  }

  return (
    <div>
      <div className="flex gap-6 overflow-x-auto border-b border-primary/10 pb-1 sm:gap-8">
        {categories.map((category) => {
          const active = category.slug === activeCategory;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => selectCategory(category.slug)}
              className={cn(
                "whitespace-nowrap border-b-2 pb-4 text-sm font-semibold transition",
                active ? "border-secondary text-secondary" : "border-transparent text-muted hover:text-secondary",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        {filtered.map((item, index) => {
          const open = openIndex === index;
          return (
            <div
              key={item.question}
              className={cn(
                "overflow-hidden rounded-xl border border-primary/8 bg-white transition",
                open && "shadow-[0_10px_30px_rgba(0,31,38,0.06)]",
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
                aria-expanded={open}
              >
                <span className="font-heading text-base text-primary sm:text-lg">{item.question}</span>
                <span
                  className={cn(
                    "material-symbols-outlined shrink-0 text-secondary transition-transform duration-300",
                    open && "rotate-180",
                  )}
                >
                  expand_more
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
