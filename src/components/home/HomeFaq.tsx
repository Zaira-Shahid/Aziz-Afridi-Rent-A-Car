"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section className="bg-background">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Support</p>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-primary/65">Answers to common questions before you book.</p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {homeFaqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delay={Math.min(index, 5) * 60}>
              <div
                className="overflow-hidden rounded-[12px] border border-primary/8 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                >
                  <span className="font-medium text-primary">{item.question}</span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary transition",
                      open && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-primary/65">{item.answer}</p>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
