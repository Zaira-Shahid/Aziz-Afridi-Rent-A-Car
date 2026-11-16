import type { CarModel } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type CarGridSectionProps = {
  title: string;
  description?: string;
  cars: CarModel[];
  /** Small label above the title. */
  eyebrow?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  showViewAll?: boolean;
  id?: string;
  className?: string;
  /** Page background: the page surface (default) or white. */
  tone?: "surface" | "white";
};

/** Heading row (title on the left, "view all" on the right) above a three-column car grid. */
export function CarGridSection({
  title,
  description,
  cars,
  eyebrow = "Our Fleet",
  viewAllHref = "/cars",
  viewAllLabel = "View All Cars",
  showViewAll = true,
  id,
  className,
  tone = "surface",
}: CarGridSectionProps) {
  if (cars.length === 0) return null;

  return (
    <Section id={id} tone={tone} className={cn("sm:py-14 lg:py-16", className)}>
      <Reveal>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-green-strong">{eyebrow}</p>
            <h2 className="font-heading text-2xl font-extrabold italic leading-tight tracking-tight text-navy-deep sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            {description ? <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{description}</p> : null}
          </div>
          {showViewAll ? (
            <ButtonLink href={viewAllHref} variant="outline" pill size="md" className="w-fit shrink-0">
              {viewAllLabel}
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          ) : null}
        </div>
      </Reveal>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {cars.map((car) => (
          <li key={car.slug}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
