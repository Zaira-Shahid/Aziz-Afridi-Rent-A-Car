"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Wrap any page section/card grid for scroll animation */
export function AnimateIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
