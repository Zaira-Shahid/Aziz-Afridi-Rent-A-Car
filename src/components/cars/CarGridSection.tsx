"use client";

import { motion } from "framer-motion";
import type { CarModel } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type CarGridSectionProps = {
  title: string;
  description?: string;
  cars: CarModel[];
  viewAllHref?: string;
  viewAllLabel?: string;
  showViewAll?: boolean;
  className?: string;
  dark?: boolean;
};

export function CarGridSection({
  title,
  description,
  cars,
  viewAllHref = "/cars",
  viewAllLabel = "View All Cars",
  showViewAll = true,
  className,
  dark = false,
}: CarGridSectionProps) {
  if (cars.length === 0) return null;

  return (
    <Section className={cn(dark ? "bg-primary" : "bg-background", className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn("mb-8 text-center sm:mb-10", dark && "text-white")}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Our Fleet</p>
        <h2
          className={cn(
            "font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl",
            dark && "text-white",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn("mx-auto mt-3 max-w-2xl text-sm sm:text-base", dark ? "text-white/65" : "text-primary/65")}>
            {description}
          </p>
        ) : null}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07 } },
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cars.map((car) => (
          <motion.div
            key={car.slug}
            variants={{
              hidden: { opacity: 0, y: 32, scale: 0.97 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {showViewAll ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <ButtonLink
            href={viewAllHref}
            variant={dark ? "accent" : "secondary"}
            size="lg"
            className="hover:-translate-y-0.5 !text-white"
          >
            {viewAllLabel}
          </ButtonLink>
        </motion.div>
      ) : null}
    </Section>
  );
}
