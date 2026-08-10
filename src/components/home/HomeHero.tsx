"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookingBar } from "@/components/home/BookingBar";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80",
    alt: "Premium black luxury sedan for rent in Islamabad",
    heading: "Best Rent a Car in Islamabad & Rawalpindi",
    description:
      "Need a reliable rent a car in Islamabad or Rawalpindi? Signature Rent A Car provides affordable daily, weekly, and monthly car rentals with professional chauffeurs. Choose from economy cars, executive sedans, luxury vehicles, SUVs, Hiace, Coaster, and Grand Cabin rentals for business, family, and travel needs.",
    ctaLabel: "Book Your Car Today",
    ctaHref: "/contact",
  },
  {
    src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80",
    alt: "Luxury executive BMW sedan rental",
    heading: "Luxury Car Rental in Islamabad for Every Occasion",
    description:
      "Experience premium travel with the best luxury car rental in Islamabad. Rent Mercedes, Audi, Prado, Fortuner, Civic, Corolla, Land Cruiser, and executive vehicles with professional drivers for weddings, corporate meetings, VIP guests, airport transfers, and business travel throughout Islamabad and Rawalpindi.",
    ctaLabel: "View Luxury Fleet",
    ctaHref: "/cars",
  },
  {
    src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1920&q=80",
    alt: "Airport transfer luxury vehicle with chauffeur",
    heading: "Airport Transfer & Corporate Car Rental Services",
    description:
      "Book trusted airport transfer services in Islamabad and professional corporate car rental solutions. We offer punctual pick-up and drop-off, executive chauffeur services, monthly company rentals, staff transportation, and VIP travel with clean, insured, and well-maintained vehicles.",
    ctaLabel: "Reserve Your Ride",
    ctaHref: "/services/airport-pick-drop",
  },
  {
    src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80",
    alt: "SUV ready for northern areas road trip",
    heading: "Daily, Monthly & Northern Areas Car Rental",
    description:
      "Planning a trip? Rent cars for Murree, Naran, Kaghan, Hunza, Skardu, Swat, and destinations across Pakistan. We provide daily and monthly rentals, SUVs, 4x4 vehicles, Hiace, Coaster, and Grand Cabin with experienced drivers for family tours, corporate events, and group travel.",
    ctaLabel: "Get Instant Quote",
    ctaHref: "/contact",
  },
  {
    src: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1920&q=80",
    alt: "Wedding and VIP luxury car convoy",
    heading: "Wedding & VIP Chauffeur Car Rental",
    description:
      "Make every occasion unforgettable with Signature’s decorated wedding fleets and VIP chauffeur service. From baraat convoys to executive guest transfers, we deliver spotless luxury vehicles with professional drivers on time.",
    ctaLabel: "Book Wedding Fleet",
    ctaHref: "/services/wedding-car-rental",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80",
    alt: "Premium rental car on open highway",
    heading: "Intercity & Monthly Car Rental Plans",
    description:
      "Travel between cities or keep a dedicated car for the month. Signature offers flexible intercity packages and corporate monthly plans with reliable chauffeurs, transparent pricing, and 24/7 agent support across Pakistan.",
    ctaLabel: "View Monthly Plans",
    ctaHref: "/services/monthly-car-rental",
  },
] as const;

export function HomeHero() {
  const [active, setActive] = useState(0);
  const slide = HERO_SLIDES[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-0 items-center overflow-x-clip py-12 sm:min-h-[85vh] sm:py-20 lg:min-h-[90vh] lg:py-24">
      <div className="absolute inset-0 overflow-hidden">
        {HERO_SLIDES.map((item, index) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            priority={index === 0}
            className={cn(
              "object-cover transition-opacity duration-700",
              index === active ? "opacity-100" : "opacity-0",
            )}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/30" />
      </div>

      <Container className="relative z-10 grid min-w-0 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 text-white lg:col-span-7">
          <h1
            key={`heading-${active}`}
            className="hero-shadow animate-fade-up font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl xl:text-[52px] xl:leading-[1.15]"
          >
            {slide.heading}
          </h1>
          <p
            key={`desc-${active}`}
            className="animate-fade-up-delay mt-4 line-clamp-3 max-w-xl text-sm text-white/90 sm:mt-6 sm:line-clamp-none sm:text-base lg:text-lg"
          >
            {slide.description}
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
            <Link
              key={`cta-${active}`}
              href={slide.ctaHref}
              className="inline-flex w-full items-center justify-center rounded-[10px] bg-accent px-6 py-3.5 text-sm font-semibold text-primary transition hover:brightness-95 sm:w-auto"
            >
              {slide.ctaLabel}
            </Link>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === active ? "w-8 bg-accent" : "w-2 bg-white/45 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-up-delay-2 relative z-20 w-full min-w-0 lg:col-span-5">
          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
