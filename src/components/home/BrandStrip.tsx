import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

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
      className="brand-gold-card group mx-2 flex h-[100px] w-[100px] shrink-0 flex-col items-center justify-center sm:mx-3 sm:h-[132px] sm:w-[132px]"
      aria-label={`${name} available`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-[11px]">
        Available
      </span>
      <span className="mt-1 font-heading text-2xl font-bold tracking-tight text-accent transition duration-300 group-hover:scale-110 sm:text-3xl">
        {icon}
      </span>
      <span className="mt-1 font-heading text-xs font-semibold text-white sm:text-sm">{name}</span>
    </Link>
  );
}

export function BrandStrip() {
  const loop = [...brands, ...brands, ...brands];

  return (
    <section className="brand-strip-section relative overflow-hidden py-12 sm:py-16">
      <div className="brand-strip-wave" aria-hidden="true" />

      <div className="relative z-10 mx-auto mb-8 max-w-7xl px-4 text-center sm:mb-10 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Brands</p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Trusted car brands
          </h2>
          <p className="mx-auto mt-2 max-w-xl px-2 text-sm text-white/65 sm:text-base">
            Popular brands available for daily, weekly, and monthly rental.
          </p>
        </Reveal>
      </div>

      <div className="relative z-10 pb-2 pt-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#1a3a2a]/90 to-transparent sm:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white/90 to-transparent sm:w-14" />

        <div className="brand-marquee-shadow marquee-track flex w-max">
          {loop.map((item, index) => (
            <BrandItem key={`${item.name}-${index}`} name={item.name} icon={item.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
