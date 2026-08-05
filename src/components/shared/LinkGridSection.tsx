"use client";

import { CardLink } from "@/components/ui/CardLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LinkGridItem = {
  href: string;
  title: string;
  description?: string;
};

type LinkGridSectionProps = {
  title: string;
  description?: string;
  items: LinkGridItem[];
};

export function LinkGridSection({ title, description, items }: LinkGridSectionProps) {
  return (
    <Section>
      <Reveal>
        <SectionHeading title={title} description={description} className="mb-8" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.href} delay={Math.min(index, 5) * 70}>
            <CardLink href={item.href} title={item.title} description={item.description} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
