import type { ServiceTestimonial } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

type ServiceTestimonialsProps = {
  items: ServiceTestimonial[];
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ServiceTestimonials({ items }: ServiceTestimonialsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={item.name} delay={index * 90} className="h-full">
          <figure className="relative flex h-full flex-col rounded-card rounded-tr-[3rem] border border-line bg-white p-7 shadow-soft sm:p-8">
            <Icon name="quote" size={34} className="text-green" />
            <div className="mt-4 flex gap-1 text-green-strong" role="img" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" size={18} />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-navy-deep">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white"
              >
                {initials(item.name)}
              </span>
              <span>
                <span className="block font-semibold text-navy-deep">{item.name}</span>
                <span className="block text-xs uppercase tracking-wide text-muted">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
