"use client";

import type { ServiceTestimonial } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

type ServiceTestimonialsProps = {
  items: ServiceTestimonial[];
};

export function ServiceTestimonials({ items }: ServiceTestimonialsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={item.name} delay={index * 100}>
          <article className="h-full rounded-3xl border border-primary/8 bg-[#f3f4f5] p-8 sm:p-10">
            <div className="mb-6 flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="mb-8 text-base italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-xs uppercase tracking-wide text-muted">{item.role}</div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
