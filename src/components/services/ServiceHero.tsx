import Image from "next/image";
import type { ServiceHero as ServiceHeroData } from "@/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

type ServiceHeroProps = {
  hero: ServiceHeroData;
  /** A booking form or search card shown beside the text. Without it the hero shows a framed photo. */
  aside?: React.ReactNode;
  /** Extra content under the buttons (for example call and WhatsApp chips). */
  extra?: React.ReactNode;
  /** Mirror the layout (photo or form on the left). */
  flip?: boolean;
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Navy service hero: badge, bold italic title with a green accent, text, two pill buttons and a photo or form. */
export function ServiceHero({ hero, aside, extra, flip = false }: ServiceHeroProps) {
  const secondaryProps = isExternal(hero.secondaryCta.href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header className="relative isolate overflow-hidden bg-navy-deep text-white">
      {aside ? (
        <>
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover opacity-30"
          />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/50" />
        </>
      ) : null}
      <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
      <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />

      <Container
        className={cn(
          "grid items-center gap-10 py-14 sm:py-16 lg:gap-14 lg:py-20",
          aside ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[1.05fr_0.95fr]",
        )}
      >
        <div className={cn(flip && "lg:order-2")}>
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
            <span className="h-2 w-2 rounded-full bg-green" />
            {hero.badge}
          </span>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {hero.title}
            {hero.accent ? (
              <>
                {" "}
                <span className="text-green">{hero.accent}</span>
              </>
            ) : null}
          </h1>
          <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {hero.description}
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} variant="green" pill size="lg">
              {hero.primaryCta.label}
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline"
              pill
              size="lg"
              className="border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep"
              {...secondaryProps}
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          {extra ? <div className="animate-fade-up-delay-2 mt-6">{extra}</div> : null}
        </div>

        {aside ? (
          <div className={cn("animate-fade-up-delay-2", flip && "lg:order-1")}>{aside}</div>
        ) : (
          <div
            className={cn(
              "relative aspect-[4/3] overflow-hidden bg-navy shadow-lift",
              flip ? "rounded-panel rounded-tl-[5rem] lg:order-1" : "rounded-panel rounded-tr-[5rem]",
            )}
          >
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </Container>
    </header>
  );
}

/** Call and WhatsApp pill links used in several heroes. */
export function HeroContactChips({ phoneHref, phoneLabel, whatsappHref }: { phoneHref: string; phoneLabel: string; whatsappHref: string }) {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <a
        href={phoneHref}
        className={buttonClasses({
          variant: "ghost",
          pill: true,
          size: "sm",
          className: "border border-white/30 text-white hover:bg-white/15",
        })}
      >
        <Icon name="phone" size={16} className="text-green" />
        {phoneLabel}
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({
          variant: "ghost",
          pill: true,
          size: "sm",
          className: "border border-white/30 text-white hover:bg-white/15",
        })}
      >
        <Icon name="whatsapp" size={16} className="text-green" />
        WhatsApp
      </a>
    </div>
  );
}
