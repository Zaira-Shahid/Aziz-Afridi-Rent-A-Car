import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type PromoBannerProps = {
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
};

export function PromoBanner({
  title = "Flash Sale",
  description = "Limited-time deals on economy and SUV rentals. Book now before slots fill up.",
  href = "/cars",
  ctaLabel = "Explore Deals",
}: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      <Image
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80"
        alt=""
        fill
        className="object-cover opacity-35 transition duration-[4000ms] hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/55" />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Limited Offer
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-sm text-white/70 sm:text-base lg:text-lg">{description}</p>
            <div className="mt-8">
              <ButtonLink href={href} variant="accent" size="lg" className="hover:-translate-y-0.5">
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
