"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookingBar } from "@/components/home/BookingBar";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80",
    alt: "Luxury sedan ready for rental",
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80",
    alt: "Premium sports car on display",
  },
  {
    src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2000&q=80",
    alt: "SUV for family and city travel",
  },
  {
    src: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=2000&q=80",
    alt: "Executive car rental fleet",
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-primary text-white sm:min-h-[85vh] lg:min-h-[88vh]">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          className={cn(
            "object-cover transition-opacity duration-700",
            index === active ? "hero-slide-active opacity-100" : "opacity-0",
          )}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/45" />

      <Container className="relative flex min-h-[78vh] flex-col justify-end pb-8 pt-24 sm:min-h-[85vh] sm:pb-12 sm:pt-28 lg:min-h-[88vh] lg:pb-14 lg:pt-32">
        <div className="max-w-3xl">
          <p className="animate-fade-up font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
            Signature <span className="text-secondary">Rent A Car</span>
          </p>
          <h1 className="animate-fade-up-delay mt-3 font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            Drive premium.
            <span className="mt-1 block text-accent">Book with confidence.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-sm text-white/75 sm:mt-5 sm:text-base lg:text-lg">
            Self-drive and chauffeur cars for cities, airports, and tourist destinations across Pakistan.
          </p>
        </div>

        <div className="animate-fade-up-delay-2 mt-8 w-full sm:mt-10">
          <BookingBar />
        </div>

        <div className="mt-5 flex items-center gap-2 sm:mt-6">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === active ? "dot-pulse w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
