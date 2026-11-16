import { CarGridSection } from "@/components/cars/CarGridSection";
import { Container } from "@/components/ui/Container";
import { fleetSections } from "@/data";
import type { CarModel } from "@/types";

type CarsCatalogProps = {
  cars: CarModel[];
};

/** Every car, grouped by its fleet category, with a row of category links on top. */
export function CarsCatalog({ cars }: CarsCatalogProps) {
  const groups = fleetSections
    .map((section) => ({ section, cars: cars.filter((car) => car.category === section.slug) }))
    .filter((group) => group.cars.length > 0);

  return (
    <div id="all-models" className="bg-white pb-6 pt-12 sm:pt-16">
      <Container>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-green-strong">Our Fleet</p>
        <h2 className="font-heading text-3xl font-extrabold italic leading-tight tracking-tight text-navy-deep sm:text-4xl">
          All models
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
          Every car in our fleet — named and priced for daily or monthly rental.
        </p>
        <nav aria-label="Fleet categories" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {groups.map(({ section }) => (
              <li key={section.slug}>
                <a
                  href={`#cars-${section.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-navy-deep transition hover:border-green-strong hover:text-green-strong"
                >
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {groups.map(({ section, cars: groupCars }, index) => (
        <CarGridSection
          key={section.slug}
          id={`cars-${section.slug}`}
          title={section.name}
          description={section.description}
          cars={groupCars}
          eyebrow="Our Cars"
          viewAllHref={`/categories/${section.slug}`}
          viewAllLabel={`View ${section.name}`}
          tone="white"
          className={index === 0 ? "pt-8" : undefined}
        />
      ))}
    </div>
  );
}
