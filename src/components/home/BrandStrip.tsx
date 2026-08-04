import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const brands = [
  { name: "Toyota", image: "/brands/toyota-logo.png" },
  { name: "Honda", image: "/brands/honda-logo.png" },
  { name: "Suzuki", image: "/brands/suzuki-logo.png" },
  { name: "Kia", image: "/brands/kia-logo.png" },
  { name: "Hyundai", image: "/brands/hyundai-logo.png" },
  { name: "Mercedes", image: "/brands/mercedes-logo.png" },
  { name: "Audi", image: "/brands/audi-logo.png" },
  { name: "Lexus", image: "/brands/lexus-logo.png" },
  { name: "Changan", image: "/brands/changan-logo.png" },
  { name: "Haval", image: "/brands/haval-logo.jfif.jpeg" },
] as const;

function BrandItem({ name, image }: { name: string; image: string }) {
  return (
    <Link
      href="/cars"
      className="brand-logo-card group relative mx-2 block h-[110px] w-[110px] shrink-0 sm:mx-3 sm:h-[140px] sm:w-[140px]"
      aria-label={`${name} available`}
    >
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[16px] bg-white p-3 sm:p-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-3 transition duration-300 group-hover:scale-105 sm:p-4"
          sizes="140px"
        />
      </span>
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

      <div className="relative z-10 overflow-hidden pb-2 pt-2">
        <div className="marquee-track flex w-max">
          {loop.map((item, index) => (
            <BrandItem key={`${item.name}-${index}`} name={item.name} image={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
