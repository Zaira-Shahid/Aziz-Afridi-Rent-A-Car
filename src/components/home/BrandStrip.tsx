import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const brands = [
  {
    name: "Toyota",
    image: "https://images.unsplash.com/photo-1623869675780-70babeac8cd3?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Honda",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Suzuki",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kia",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Hyundai",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80",
  },
] as const;

function BrandItem({ name, image }: { name: string; image: string }) {
  return (
    <Link
      href="/cars"
      className="brand-gold-card group relative mx-2 block h-[110px] w-[110px] shrink-0 sm:mx-3 sm:h-[140px] sm:w-[140px]"
      aria-label={`${name} available`}
    >
      <span className="relative block h-full w-full overflow-hidden rounded-[16px]">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="140px"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-2 pb-2.5 pt-8 text-center">
          <span className="font-heading text-xs font-semibold text-white sm:text-sm">{name}</span>
        </span>
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
