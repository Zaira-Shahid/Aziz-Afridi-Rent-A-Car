"use client";

import { useEffect, useState } from "react";
import type { CarModel } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { FleetAnimatedHeading } from "@/components/cars/FleetAnimatedHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { carCategories } from "@/data";
import { cn } from "@/lib/utils";

type CarSliderSectionProps = {
  title?: string;
  description?: string;
  cars: CarModel[];
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (width < 640) setCount(1);
      else if (width < 1024) setCount(2);
      else setCount(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function categoryLabel(slug: string) {
  return carCategories.find((item) => item.slug === slug)?.name ?? "Our Fleet";
}

export function CarSliderSection({
  cars,
  viewAllHref = "/cars",
  viewAllLabel = "View All Cars",
  className,
}: CarSliderSectionProps) {
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, cars.length - visible);
  const [index, setIndex] = useState(0);
  const [headingKey, setHeadingKey] = useState(0);

  const visibleCars = cars.slice(index, index + visible);
  const leadCar = visibleCars[0];
  const headingTitle = leadCar ? categoryLabel(leadCar.category) : "Featured rental cars";
  const headingDescription = visibleCars.length
    ? visibleCars.map((car) => car.name).join(" · ")
    : "Slide through our full fleet for daily, weekly, and monthly rental.";

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    setHeadingKey((key) => key + 1);
  }, [index, visible]);

  useEffect(() => {
    if (cars.length <= visible) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [cars.length, maxIndex, visible]);

  if (cars.length === 0) return null;

  function prev() {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }

  function next() {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }

  return (
    <Section className={cn("bg-white", className)}>
      <Reveal>
        <FleetAnimatedHeading
          eyebrow="Our Fleet"
          title={headingTitle}
          description={headingDescription}
          headingKey={headingKey}
        />
      </Reveal>

      <div className="relative">
        {cars.length > visible ? (
          <>
            <button
              type="button"
              aria-label="Previous cars"
              onClick={prev}
              className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-md transition hover:bg-accent sm:-translate-x-3"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label="Next cars"
              onClick={next}
              className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-md transition hover:bg-accent sm:translate-x-3"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_right</span>
            </button>
          </>
        ) : null}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${(cars.length / visible) * 100}%`,
              transform: `translateX(-${(index / cars.length) * 100}%)`,
            }}
          >
            {cars.map((car) => (
              <div key={car.slug} className="px-2.5 sm:px-3" style={{ width: `${100 / cars.length}%` }}>
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {cars.length > visible ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`Go to slide ${dot + 1}`}
              onClick={() => setIndex(dot)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === dot ? "w-7 bg-secondary" : "w-2 bg-primary/20 hover:bg-primary/40",
              )}
            />
          ))}
        </div>
      ) : null}

      <Reveal delay={150}>
        <div className="mt-10 flex justify-center">
          <ButtonLink
            href={viewAllHref}
            variant="secondary"
            size="lg"
            className="hover:-translate-y-0.5 !text-white"
          >
            {viewAllLabel}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
