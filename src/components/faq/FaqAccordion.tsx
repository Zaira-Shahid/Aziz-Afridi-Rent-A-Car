"use client";

import { AnimatePresence, motion } from "framer-motion";
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
      <div className="-mx-1 flex gap-5 overflow-x-auto border-b border-primary/10 px-1 pb-1 [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const active = category.slug === activeCategory;
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => selectCategory(category.slug)}
              className={cn(
                "whitespace-nowrap border-b-2 pb-3 text-xs font-semibold transition sm:pb-4 sm:text-sm",
                active ? "border-secondary text-secondary" : "border-transparent text-muted hover:text-secondary",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-6 space-y-3 sm:mt-8 sm:space-y-4"
        >
          {filtered.map((item, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.045, ease: "easeOut" }}
                className={cn(
                  "overflow-hidden rounded-xl border border-primary/8 bg-white transition duration-300",
                  open && "shadow-[0_10px_30px_rgba(0,31,38,0.06)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left sm:gap-4 sm:p-6"
                  aria-expanded={open}
                >
                  <span className="font-heading text-sm text-primary sm:text-base lg:text-lg">{item.question}</span>
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
                    "grid transition-all duration-300 ease-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
