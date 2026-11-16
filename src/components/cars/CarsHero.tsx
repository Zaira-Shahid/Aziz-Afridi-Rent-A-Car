import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type CarsHeroStat = {
  label: string;
  value: string;
};

type CarsHeroProps = {
  badge?: string;
  title: string;
  accent?: string;
  description: string;
  image: string;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  stats?: CarsHeroStat[];
  className?: string;
};

/** Page hero for the car pages: navy panel with text on the left and a framed car photo on the right. */
export function CarsHero({
  badge = "Our Fleet",
  title,
  accent,
  description,
  image,
  imageAlt = title,
  primaryCta = { label: "Book Now", href: "/contact" },
  secondaryCta = { label: "WhatsApp", href: `https://wa.me/${brand.whatsapp}` },
  stats,
  className,
}: CarsHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-navy-deep text-white", className)}>
      <span
        aria-hidden="true"
        className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15"
      />
      <span
        aria-hidden="true"
        className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60"
      />

      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-green">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-green" />
            {badge}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
            {accent ? <span className="text-green"> {accent}</span> : null}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href} variant="light" pill size="lg">
              {primaryCta.label}
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
            <ButtonLink
              href={secondaryCta.href}
              variant="outline"
              pill
              size="lg"
              className="border-white/60 text-white hover:border-white hover:bg-white hover:text-navy-deep"
              target={secondaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={secondaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-[#e6ecf3] shadow-lift">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {stats?.length ? (
        <Container className="pb-10 sm:pb-12">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-card border border-white/15 bg-white/5 p-4">
                <dt className="order-2 text-xs font-semibold uppercase tracking-wider text-white/75">{stat.label}</dt>
                <dd className="mt-1 font-heading text-xl font-extrabold italic text-green sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      ) : null}
    </section>
  );
}
