"use client";

import { CtaBanner, PageHero } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

type ContentPageProps = {
  title: string;
  description: string;
  body?: string[];
};

/** Simple text page (Privacy and service fallbacks): hero, paragraphs as numbered rows, closing banner. */
export function ContentPage({ title, description, body = [] }: ContentPageProps) {
  return (
    <>
      <PageHero title={title} description={description} />
      {body.length > 0 ? (
        <Section tone="white">
          <ol className="mx-auto max-w-3xl space-y-5">
            {body.map((paragraph, index) => (
              <li key={paragraph}>
                <Reveal delay={index * 80}>
                  <div className="flex gap-5 rounded-card rounded-tr-[2.5rem] border border-line bg-surface p-6 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="font-heading text-4xl font-extrabold italic leading-none text-green-strong/40 sm:text-5xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-relaxed text-fg sm:text-lg">{paragraph}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}
      <CtaBanner />
    </>
  );
}
