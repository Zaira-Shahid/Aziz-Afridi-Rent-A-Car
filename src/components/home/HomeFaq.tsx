"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data";
import { cn } from "@/lib/utils";

/** Home FAQ: heading on the left, numbered accordion on the right. */
export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const uid = useId();

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-green-strong sm:text-sm">Support</p>
          <h2 className="font-heading text-3xl font-extrabold italic leading-tight tracking-tight text-navy-deep sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Answers to common questions about chauffeur-driven car rental with Aziz Afridi.
          </p>
        </Reveal>

        <ul className="space-y-3">
          {homeFaqs.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${uid}-panel-${index}`;
            const buttonId = `${uid}-button-${index}`;
            return (
              <li key={item.question}>
                <Reveal delay={Math.min(index, 5) * 60}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-card border bg-white transition-colors",
                      open ? "border-green-strong shadow-soft" : "border-line",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? -1 : index)}
                        className="flex min-h-14 w-full items-center gap-4 px-4 py-3 text-left sm:px-5"
                      >
                        <span className="font-heading text-sm font-extrabold italic text-green-strong">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-base font-semibold text-navy-deep">{item.question}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-full transition",
                            open ? "bg-green-strong text-white" : "bg-surface text-navy-deep",
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
                      hidden={!open}
                      className="px-4 pb-5 pl-14 pr-5 text-sm leading-relaxed text-muted sm:px-5 sm:pl-[3.75rem] sm:text-base"
                    >
                      {item.answer}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
