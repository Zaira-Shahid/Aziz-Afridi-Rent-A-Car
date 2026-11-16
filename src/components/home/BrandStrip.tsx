import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const brands = [
  { name: "Toyota", image: "/brands/toyota-logo.webp" },
  { name: "Honda", image: "/brands/honda-logo.webp" },
  { name: "Suzuki", image: "/brands/suzuki-logo.webp" },
  { name: "Kia", image: "/brands/kia-logo.webp" },
  { name: "Hyundai", image: "/brands/hyundai-logo.webp" },
  { name: "Mercedes", image: "/brands/mercedes-logo.webp" },
  { name: "Audi", image: "/brands/audi-logo.webp" },
  { name: "Lexus", image: "/brands/lexus-logo.webp" },
  { name: "Changan", image: "/brands/changan-logo.webp" },
  { name: "Haval", image: "/brands/haval-logo.jfif.webp" },
] as const;

/** Slow logo marquee made of capsule chips. It pauses on hover and stops for reduced-motion users. */
export function BrandStrip() {
  // Three copies so the loop (translated by one third) never shows a gap.
  const loop = [...brands, ...brands, ...brands];

  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Brands"
          title="Trusted car brands"
          description="Popular brands available for daily, weekly, and monthly rental."
          align="center"
          className="px-4"
        />
      </Reveal>

      <div className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-4 py-3" style={{ animationDuration: "50s" }}>
          {loop.map((item, index) => (
            <li
              key={`${item.name}-${index}`}
              aria-hidden={index >= brands.length ? true : undefined}
              className="flex h-16 w-40 shrink-0 items-center justify-center rounded-full border border-line bg-white px-6 shadow-soft sm:h-[4.5rem] sm:w-48"
            >
              <Image
                src={item.image}
                alt={index < brands.length ? item.name : ""}
                width={140}
                height={56}
                className="h-11 w-auto max-w-full object-contain sm:h-12"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
