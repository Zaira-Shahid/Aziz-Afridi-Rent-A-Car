"use client";

import { useEffect, useRef, useState } from "react";
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
  /** How many rows of cards to show. */
  rows?: number;
};

function useColumns() {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(5);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

function categoryLabel(slug: string) {
  return carCategories.find((item) => item.slug === slug)?.name ?? "Our Fleet";
}

export function CarSliderSection({
  cars,
  viewAllHref = "/cars",
  viewAllLabel = "View All Cars",
  className,
  rows = 2,
}: CarSliderSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columns = useColumns();
  const pageSize = columns * rows;
  const pageCount = Math.max(1, Math.ceil(cars.length / pageSize));
  const [page, setPage] = useState(0);
  const [headingKey, setHeadingKey] = useState(0);
  const [inView, setInView] = useState(false);

  const start = page * pageSize;
  const visibleCars = cars.slice(start, start + pageSize);
  const leadCar = visibleCars[0];
  const headingTitle = leadCar ? categoryLabel(leadCar.category) : "Featured rental cars";
  const headingDescription = visibleCars.length
    ? visibleCars.map((car) => car.name).join(" · ")
    : "Browse our chauffeur-driven fleet for daily, weekly, and monthly rental.";

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPage((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  useEffect(() => {
    if (!inView) return;
    setHeadingKey((key) => key + 1);
  }, [page, pageSize, inView]);

  useEffect(() => {
    if (!inView || pageCount <= 1) return;
    const timer = window.setInterval(() => {
      setPage((prev) => (prev >= pageCount - 1 ? 0 : prev + 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [pageCount, inView]);

  if (cars.length === 0) return null;

  function prev() {
    setPage((current) => (current <= 0 ? pageCount - 1 : current - 1));
  }

  function next() {
    setPage((current) => (current >= pageCount - 1 ? 0 : current + 1));
  }

  const dotCount = Math.min(3, pageCount);
  const activeDot =
    pageCount <= 1 ? 0 : Math.min(dotCount - 1, Math.round((page / (pageCount - 1)) * (dotCount - 1)));

  function goToDot(dot: number) {
    setPage(dotCount === 1 ? 0 : Math.round((dot / (dotCount - 1)) * (pageCount - 1)));
  }

  return (
    <div ref={sectionRef} className="overflow-anchor-none">
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
          {pageCount > 1 ? (
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {Array.from({ length: pageSize }, (_, index) => {
              const car = visibleCars[index];
              return (
                <div
                  key={car?.slug ?? `placeholder-${index}`}
                  className={cn("px-0.5", !car && "invisible")}
                  aria-hidden={!car}
                >
                  {car ? <CarCard car={car} /> : <div className="min-h-[360px]" />}
                </div>
              );
            })}
          </div>
        </div>

        {pageCount > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: dotCount }).map((_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Go to slide group ${dot + 1}`}
                onClick={() => goToDot(dot)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  activeDot === dot ? "w-7 bg-secondary" : "w-2 bg-primary/20 hover:bg-primary/40",
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
    </div>
  );
}
