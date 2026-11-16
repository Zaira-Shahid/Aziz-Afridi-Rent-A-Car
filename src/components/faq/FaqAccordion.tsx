"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type FaqCategory = { slug: string; label: string };
type FaqEntry = { question: string; answer: string; category: string };

type FaqAccordionProps = {
  categories: FaqCategory[];
  faqs: FaqEntry[];
};

/** Topic list on the left (a swipeable row on phones) and the answers of the chosen topic on the right. */
export function FaqAccordion({ categories, faqs }: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug ?? "");
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  const filtered = faqs.filter((item) => item.category === activeCategory);

  function selectCategory(slug: string) {
    setActiveCategory(slug);
    setOpenIndex(0);
  }

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <nav aria-label="FAQ topics" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const active = category.slug === activeCategory;
            return (
              <li key={category.slug} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => selectCategory(category.slug)}
                  aria-pressed={active}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between gap-3 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition lg:rounded-xl",
                    active
                      ? "bg-navy text-white shadow-soft"
                      : "border border-line bg-white text-navy-deep hover:border-navy",
                  )}
                >
                  {category.label}
                  <Icon name="chevron-right" size={16} className="hidden lg:block" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0 space-y-3">
        {filtered.map((item, index) => {
          const open = openIndex === index;
          const buttonId = `${baseId}-q-${activeCategory}-${index}`;
          const panelId = `${baseId}-a-${activeCategory}-${index}`;
          return (
            <div
              key={item.question}
              className={cn(
                "overflow-hidden rounded-card border bg-white transition",
                open ? "border-green-strong shadow-soft" : "border-line",
              )}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                  aria-controls={panelId}
                >
                  <span className="min-w-0 font-semibold text-navy-deep sm:text-lg">{item.question}</span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition",
                      open ? "bg-green-strong text-white" : "bg-navy/10 text-navy",
                    )}
                  >
                    <Icon name={open ? "minus" : "plus"} size={16} />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:text-base">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
