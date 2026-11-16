import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { HeroBackdrop, HeroSwoosh } from "./HeroBackdrop";
import { HomeSearch } from "./HomeSearch";

export function HomeHero() {
  return (
    <>
      <section aria-labelledby="home-hero-heading" className="relative isolate overflow-hidden bg-white">
        <HeroBackdrop />
        <Container className="grid items-center gap-2 pb-20 pt-8 sm:pb-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:pb-36 lg:pt-14">
          <div className="relative z-10">
            <h1
              id="home-hero-heading"
              className="font-heading text-[2.5rem] font-extrabold italic leading-[1.06] tracking-tight text-navy-deep sm:text-5xl lg:text-[3.3rem]"
            >
              Premium Rides for <span className="block text-green">Every Journey</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg sm:text-lg">
              Luxury vehicles, exceptional comfort, reliable service, and seamless bookings — all in one place.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact" variant="green" pill size="lg">
                Book Your Ride Now
                <Icon name="arrow-right" size={20} />
              </ButtonLink>
              <ButtonLink href="/cars" variant="outline" pill size="lg" className="border-navy-deep/60 bg-white/70">
                <span className="grid size-6 place-items-center rounded-full bg-navy text-white">
                  <Icon name="play" size={12} />
                </span>
                Our Fleet
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[56rem] lg:-mr-10">
            <Image
              src="/images/hero-cars-transparent.webp"
              alt="Premium sedans and SUVs ready for your next journey"
              width={1920}
              height={666}
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,32,72,0.18)]"
            />
          </div>
        </Container>
        <HeroSwoosh />
      </section>

      {/* The search card floats over the swoosh. */}
      <div className="relative z-10 -mt-12 bg-white sm:-mt-14">
        <Container>
          <HomeSearch />
        </Container>
      </div>
    </>
  );
}
