import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const PROMOS = [
  {
    eyebrow: "Serving Islamabad",
    title: "Best Rent a Car with Driver in Islamabad",
    description:
      "Aziz Afridi Rent A Car specializes in car rental with driver in Islamabad for airport transfers, corporate travel, official visits, weddings, city tours, and family trips. Choose from a wide range of clean, insured, and professionally maintained vehicles driven by experienced chauffeurs, available 24/7 at competitive rates.",
    href: "/rent-a-car/islamabad",
    ctaLabel: "Rent a Car in Islamabad",
    imageSrc: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "Serving Rawalpindi",
    title: "Best Rent a Car with Driver in Rawalpindi",
    description:
      "Aziz Afridi Rent A Car specializes in car rental with driver in Rawalpindi for airport transfers, corporate travel, official visits, weddings, city tours, and family trips. Choose from a wide range of clean, insured, and professionally maintained vehicles driven by experienced chauffeurs, available 24/7 at competitive rates.",
    href: "/rent-a-car/rawalpindi",
    ctaLabel: "Rent a Car in Rawalpindi",
    imageSrc: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80",
  },
] as const;

/** Two wide split panels (photo on one half, text on the other), alternating sides. */
export function PromoBanners() {
  return (
    <Section>
      <div className="space-y-6 sm:space-y-8">
      {PROMOS.map((promo, index) => {
        const dark = index === 0;
        return (
          <Reveal key={promo.href}>
            <article
              className={cn(
                "grid overflow-hidden rounded-panel shadow-soft md:min-h-[26rem] md:grid-cols-2",
                dark ? "bg-navy-deep text-white" : "border border-line bg-white text-navy-deep",
              )}
            >
              <div className={cn("relative min-h-[15rem] md:min-h-full", index % 2 === 1 && "md:order-2")}>
                <Image
                  src={promo.imageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                <p className={cn("text-xs font-bold uppercase tracking-[0.14em] sm:text-sm", dark ? "text-green" : "text-green-strong")}>
                  {promo.eyebrow}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-extrabold italic leading-tight sm:text-3xl lg:text-4xl">
                  {promo.title}
                </h2>
                <p className={cn("mt-4 text-sm leading-relaxed sm:text-base", dark ? "text-white/80" : "text-muted")}>
                  {promo.description}
                </p>
                <div className="mt-7">
                  <ButtonLink href={promo.href} variant="green" pill size="lg" className="w-full sm:w-auto">
                    {promo.ctaLabel}
                    <Icon name="arrow-right" size={18} />
                  </ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
      </div>
    </Section>
  );
}
