import Image from "next/image";
import Link from "next/link";
import { CarCard } from "@/components/cars/CarCard";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { fleetSections, getCarsBySlugs } from "@/data";

/** The six fleets shown on the home page, with an icon each. Their order comes from fleetSections. */
const homeFleets: { slug: string; icon: IconName }[] = [
  { slug: "economy", icon: "wallet" },
  { slug: "standard", icon: "car" },
  { slug: "executive-suv", icon: "crown" },
  { slug: "suv-hybrid", icon: "car-sparkles" },
  { slug: "premium", icon: "star" },
  { slug: "luxury", icon: "shield-check" },
];

export function DiscoverDrive() {
  // Follow the central fleet order from data/cars.ts.
  const fleets = fleetSections.flatMap((section) => {
    const home = homeFleets.find((item) => item.slug === section.slug);
    if (!home) return [];
    return [{ ...section, icon: home.icon, cars: getCarsBySlugs(section.carSlugs.slice(0, 3)) }];
  });

  return (
    <Section>
      <Reveal>
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-green-strong sm:text-sm">
            Explore Options
          </p>
          <h2 className="font-heading text-3xl font-extrabold italic leading-tight tracking-tight text-navy-deep sm:text-4xl lg:text-[2.6rem]">
            Discover Your <span className="text-green-strong">Drive</span>
          </h2>
        </div>
      </Reveal>

      <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {fleets.map((fleet) => (
          <li key={fleet.slug} className="w-[72%] shrink-0 snap-center sm:w-auto">
            <a
              href={`#fleet-${fleet.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-card bg-navy-deep shadow-soft sm:aspect-[5/4]"
            >
              {fleet.cars[0] ? (
                <Image
                  src={fleet.cars[0].image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 72vw"
                  className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
                />
              ) : null}
              <span className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/10" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                <span className="flex min-w-0 items-center gap-2 text-white">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/15 text-white sm:size-9">
                    <Icon name={fleet.icon} size={18} />
                  </span>
                  <span className="min-w-0 font-heading text-sm font-bold italic leading-tight sm:text-base">
                    {fleet.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/70 text-white transition group-hover:border-green group-hover:bg-green"
                >
                  <Icon name="arrow-right" size={16} />
                </span>
              </span>
              <span className="sr-only">Jump to {fleet.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
        {fleets.map((fleet) => (
          <div key={fleet.slug} id={`fleet-${fleet.slug}`}>
            <Reveal>
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-heading text-xl font-extrabold italic text-navy-deep sm:text-2xl">{fleet.name}</h3>
                  <p className="mt-1 text-sm text-muted sm:text-base">{fleet.description}</p>
                </div>
                <Link
                  href={`/categories/${fleet.slug}`}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-green-strong hover:underline"
                >
                  View {fleet.name}
                  <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </Reveal>

            <div
              role="group"
              aria-label={`${fleet.name} cars`}
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
            >
              {fleet.cars.map((car) => (
                <div key={car.slug} className="w-[82%] shrink-0 snap-center sm:w-auto">
                  <CarCard car={car} variant="featured" badge={fleet.name} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
