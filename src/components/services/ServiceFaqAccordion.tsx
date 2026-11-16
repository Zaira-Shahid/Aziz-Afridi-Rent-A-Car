"use client";

import { useId, useState } from "react";
import type { ServiceFaq } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type ServiceFaqAccordionProps = {
  items: ServiceFaq[];
};

export function ServiceFaqAccordion({ items }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
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
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span className="font-semibold text-navy-deep">{item.question}</span>
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
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
