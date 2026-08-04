"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { FleetParticles } from "@/components/cars/FleetParticles";

type FleetAnimatedHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  headingKey: number;
};

export function FleetAnimatedHeading({
  eyebrow,
  title,
  description,
  headingKey,
}: FleetAnimatedHeadingProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    if (!titleEl || !descEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleEl,
        { y: 24, opacity: 0, letterSpacing: "0.08em" },
        { y: 0, opacity: 1, letterSpacing: "0em", duration: 0.55, ease: "power3.out" },
      );
      gsap.fromTo(
        descEl,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.12, ease: "power2.out" },
      );
    });

    return () => ctx.revert();
  }, [headingKey, title, description]);

  return (
    <div className="relative mb-8 overflow-hidden text-center sm:mb-10">
      <FleetParticles />

      <AnimatePresence mode="wait">
        <motion.p
          key={`eyebrow-${headingKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary"
        >
          {eyebrow}
        </motion.p>
      </AnimatePresence>

      <h2
        key={`title-${headingKey}`}
        ref={titleRef}
        className="relative z-10 font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>

      <p
        key={`desc-${headingKey}`}
        ref={descRef}
        className="relative z-10 mx-auto mt-3 max-w-2xl text-sm text-primary/65 sm:text-base"
      >
        {description}
      </p>
    </div>
  );
}
