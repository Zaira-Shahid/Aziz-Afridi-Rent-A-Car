import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { carImage } from "@/data";
import { cn } from "@/lib/utils";

const tiles = [
  {
    title: "Luxury SUV",
    text: "Premium comfort with a touch of luxury.",
    href: "/categories/luxury",
    image: carImage("lx-black.webp"),
    alt: "Black Lexus LX luxury SUV",
    dark: true,
  },
  {
    title: "Prado / Land Cruiser",
    text: "Power, space, and reliability for every trip.",
    href: "/categories/executive-suv",
    image: carImage("lc-whiite.webp"),
    alt: "White Toyota Land Cruiser",
    dark: false,
  },
  {
    title: "Economy Cars",
    text: "Affordable, reliable, and fuel-efficient options.",
    href: "/categories/economy",
    image: carImage("yaris-white.webp"),
    alt: "White Toyota Yaris economy sedan",
    dark: false,
  },
  {
    title: "4x4 / Vigo",
    text: "Rugged, powerful, and ready for any terrain.",
    href: "/categories/premium",
    image: carImage("revo-white.webp"),
    alt: "White Toyota Revo 4x4 pickup",
    dark: false,
  },
] as const;

export function ExploreFleet() {
  return (
    <Section tone="white" className="pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:flex lg:items-end lg:gap-8">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-green-strong sm:text-sm">
              Our Vehicles
            </p>
            <h2 className="font-heading text-3xl font-extrabold italic leading-tight tracking-tight text-navy-deep sm:text-4xl">
              Explore Our Fleet
            </h2>
          </div>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted lg:mt-0 lg:border-l lg:border-line lg:pl-8 lg:text-base">
            A premium selection of SUVs, 4x4s, and economy cars to match your travel needs — for business, family,
            or adventure.
          </p>
        </div>
        <ButtonLink href="/cars" variant="outline" pill size="md" className="w-fit">
          View All Vehicles
          <Icon name="arrow-right" size={18} />
        </ButtonLink>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.title}>
            <Link
              href={tile.href}
              className={cn(
                "group relative flex h-full min-h-[10.5rem] overflow-hidden rounded-card border shadow-soft transition duration-300 hover:shadow-lift sm:min-h-[12rem]",
                tile.dark ? "border-navy bg-navy text-white" : "border-line bg-white text-navy-deep",
              )}
            >
              <div className="relative z-10 flex w-[56%] flex-col justify-between p-3.5 pr-1 sm:p-5 sm:pr-2">
                <div>
                  <h3 className="font-heading text-base font-bold italic leading-tight sm:text-xl">{tile.title}</h3>
                  <p className={cn("mt-1.5 text-xs leading-snug sm:text-sm", tile.dark ? "text-white/80" : "text-muted")}>
                    {tile.text}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-3 grid size-9 place-items-center rounded-full bg-white text-green-strong shadow-soft transition group-hover:bg-green-strong group-hover:text-white"
                >
                  <Icon name="arrow-right" size={18} />
                </span>
              </div>
              <div className="absolute inset-y-0 right-0 w-[52%] bg-[#e6ecf3] [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]">
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover object-[65%_60%] mix-blend-multiply transition duration-500 motion-safe:group-hover:scale-105"
                />
              </div>
              <span className="sr-only">View {tile.title} cars</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
