import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { cities } from "@/data";

export function LocationsStrip() {
  const featured = cities.filter((city) => city.type === "primary" || city.type === "tourist").slice(0, 12);

  return (
    <Section className="bg-background">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Where we operate
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary/65">
          City coverage and tourist destinations across Pakistan.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {featured.map((city) => (
          <Link
            key={city.slug}
            href={`/rent-a-car/${city.slug}`}
            className="rounded-[10px] border border-primary/10 bg-white px-4 py-2 text-sm text-primary/75 transition hover:border-secondary hover:text-secondary"
          >
            Rent a Car {city.name}
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/city-services" variant="secondary">
          View All Cities
        </ButtonLink>
      </div>
    </Section>
  );
}
