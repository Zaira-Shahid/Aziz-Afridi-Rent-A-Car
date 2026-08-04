import type { CarModel } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type CarGridSectionProps = {
  title: string;
  description?: string;
  cars: CarModel[];
  viewAllHref?: string;
  viewAllLabel?: string;
  showViewAll?: boolean;
  className?: string;
  dark?: boolean;
};

export function CarGridSection({
  title,
  description,
  cars,
  viewAllHref = "/cars",
  viewAllLabel = "View All Cars",
  showViewAll = true,
  className,
  dark = false,
}: CarGridSectionProps) {
  if (cars.length === 0) return null;

  return (
    <Section className={cn(dark ? "bg-primary" : "bg-background", className)}>
      <Reveal>
        <div className={cn("mb-8 text-center sm:mb-10", dark && "text-white")}>
          <p className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-secondary" : "text-secondary")}>
            Our Fleet
          </p>
          <h2
            className={cn(
              "font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl",
              dark && "text-white",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className={cn("mx-auto mt-3 max-w-2xl text-sm sm:text-base", dark ? "text-white/65" : "text-primary/65")}>
              {description}
            </p>
          ) : null}
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, index) => (
          <Reveal key={car.slug} delay={Math.min(index * 60, 300)}>
            <CarCard car={car} />
          </Reveal>
        ))}
      </div>

      {showViewAll ? (
        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <ButtonLink
              href={viewAllHref}
              variant={dark ? "accent" : "secondary"}
              size="lg"
              className="hover:-translate-y-0.5"
            >
              {viewAllLabel}
            </ButtonLink>
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
