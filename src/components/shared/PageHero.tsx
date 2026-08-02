import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export function PageHero({
  title,
  description,
  ctaLabel = "Book Now",
  ctaHref = "/contact",
  className,
}: PageHeroProps) {
  const showCta = Boolean(ctaHref);

  return (
    <section className={cn("bg-primary text-white", className)}>
      <Container className="py-16 sm:py-20 lg:py-24">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">{description}</p>
        ) : null}
        {showCta ? (
          <div className="mt-8">
            <ButtonLink href={ctaHref} variant="accent" size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
