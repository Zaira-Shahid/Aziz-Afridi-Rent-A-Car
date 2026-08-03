"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookingBar } from "@/components/home/BookingBar";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
    alt: "Luxury sports car on the open road",
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
    alt: "Premium black sedan front view",
  },
  {
    src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80",
    alt: "SUV ready for a family trip",
  },
  {
    src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80",
    alt: "Modern rental car fleet",
  },
] as const;

export function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden py-16 sm:min-h-[85vh] sm:py-20 lg:min-h-[90vh] lg:py-24">
      {HERO_SLIDES.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          className={cn(
            "object-cover transition-opacity duration-700",
            index === active ? "opacity-100" : "opacity-0",
          )}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-navy/30" />

      <Container className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="text-white lg:col-span-7">
          <h1 className="hero-shadow animate-fade-up font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-[64px] xl:leading-[72px]">
            Drive the <span className="text-accent">Extraordinary.</span>
          </h1>
          <p className="animate-fade-up-delay mt-4 max-w-xl text-sm text-white/90 sm:mt-6 sm:text-base lg:text-lg">
            Experience the peak of automotive luxury and performance. From executive sedans to premium
            SUVs, we provide a fleet that matches your ambition across Pakistan.
          </p>

          <div className="mt-6 flex items-center gap-2 sm:mt-8">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.src}
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

        <div className="animate-fade-up-delay-2 w-full lg:col-span-5">
          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
