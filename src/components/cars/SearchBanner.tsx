"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/** Shows the search made on the home page (`?location&pickup&return`). Renders nothing without a location. */
export function SearchBanner() {
  const params = useSearchParams();
  const location = params.get("location");
  const pickup = params.get("pickup");
  const returnDate = params.get("return");

  if (!location) return null;

  return (
    <Container className="relative z-10 -mt-6 sm:-mt-8">
      <div
        role="status"
        className="rounded-card border border-green-strong/30 bg-white p-4 shadow-lift sm:flex sm:items-center sm:gap-5 sm:p-5"
      >
        <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-green-strong text-white sm:grid">
          <Icon name="search" size={22} />
        </span>
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-deep sm:text-base">
            <strong className="font-heading font-extrabold italic">Your rental search: {location}</strong>
            {pickup ? <span>· Pickup: {pickup.replace("T", " at ")}</span> : null}
            {returnDate ? <span>· Return: {returnDate.replace("T", " at ")}</span> : null}
          </p>
          <p className="mt-1 text-sm text-muted">
            Browse the fleet below. Availability is confirmed when you enquire.
          </p>
        </div>
      </div>
    </Container>
  );
}
