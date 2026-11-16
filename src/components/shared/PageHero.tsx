import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  /** Part of `title` to show in brand green. Must be a substring of `title`. */
  highlight?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional photo, shown in a framed panel next to the text. */
  image?: string;
  imageAlt?: string;
  className?: string;
};

function renderTitle(title: string, highlight?: string) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-green">{highlight}</span>
      {title.slice(at + highlight.length)}
    </>
  );
}

/** Page hero: navy panel with the title, text and call-to-action, and an optional framed photo. */
export function PageHero({
  title,
  highlight,
  description,
  ctaLabel = "Book Now",
  ctaHref = "/contact",
  image,
  imageAlt = "",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-navy-deep text-white", className)}>
      <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
      <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />

      <Container
        className={cn("py-14 sm:py-16 lg:py-20", image && "grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14")}
      >
        <div>
          <h1 className="animate-fade-up max-w-3xl font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {renderTitle(title, highlight)}
          </h1>
          {description ? (
            <p className="animate-fade-up-delay mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {description}
            </p>
          ) : null}
          {ctaHref ? (
            <div className="animate-fade-up-delay-2 mt-8">
              <ButtonLink href={ctaHref} variant="green" pill size="lg">
                {ctaLabel}
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
            </div>
          ) : null}
        </div>

        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
