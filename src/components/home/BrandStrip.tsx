import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const brands = [
  { name: "Toyota", icon: "T" },
  { name: "Honda", icon: "H" },
  { name: "Suzuki", icon: "S" },
  { name: "Kia", icon: "K" },
  { name: "Hyundai", icon: "Hy" },
] as const;

function BrandItem({ name, icon }: { name: string; icon: string }) {
  return (
    <Link
      href="/cars"
      className="mx-2 flex min-w-[148px] shrink-0 items-center gap-3 rounded-[12px] border border-primary/8 bg-background px-4 py-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white hover:shadow-md sm:min-w-[168px]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-primary text-sm font-semibold text-accent transition duration-300 group-hover:scale-105">
        {icon}
      </span>
      <span>
        <span className="block font-heading text-sm font-semibold text-primary">{name}</span>
        <span className="mt-0.5 block text-xs text-primary/45">Available</span>
      </span>
    </Link>
  );
}

export function BrandStrip() {
  const loop = [...brands, ...brands, ...brands];

  return (
    <Section className="overflow-hidden bg-white py-10 sm:py-12">
      <Reveal>
        <div className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Brands</p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Trusted car brands
          </h2>
          <p className="mx-auto mt-2 max-w-xl px-2 text-sm text-primary/60 sm:text-base">
            Popular brands available for daily, weekly, and monthly rental.
          </p>
        </div>
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

        <div className="marquee-track flex w-max">
          {loop.map((item, index) => (
            <BrandItem key={`${item.name}-${index}`} name={item.name} icon={item.icon} />
          ))}
        </div>
      </div>
    </Section>
  );
}
