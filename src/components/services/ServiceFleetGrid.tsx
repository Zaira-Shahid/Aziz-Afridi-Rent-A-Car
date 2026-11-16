"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarModel, ServiceFleetItem } from "@/types";
import { InquireModal } from "@/components/cars/InquireModal";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { brand, formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";

type ServiceFleetGridProps = {
  items: ServiceFleetItem[];
  /** 4 columns on large screens by default; 3 gives bigger cards. */
  columns?: 3 | 4;
};

function toCarModel(item: ServiceFleetItem): CarModel {
  return {
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
    name: item.name,
    brand: "Aziz Afridi",
    category: "luxury",
    seats: item.seats,
    transmission: item.transmission === "Manual" ? "Manual" : "Automatic",
    fuel: "Petrol",
    priceDay: item.priceDay,
    priceMonth: item.priceDay * 22,
    image: item.image,
    imageAlt: item.imageAlt,
    badge: item.tag,
  };
}

const actionClass =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-semibold transition";

function FleetCard({ item }: { item: ServiceFleetItem }) {
  const [inquireOpen, setInquireOpen] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const car = toCarModel(item);
  const alt = item.imageAlt && item.imageAlt !== item.image ? item.imageAlt : null;
  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi, I want to inquire about ${item.name} rental.`,
  )}`;

  const photos = (
    <>
      <Image
        src={item.image}
        alt={item.name}
        fill
        className={cn(
          "object-cover transition duration-500",
          alt && showAlt ? "scale-105 opacity-0" : "opacity-100",
          !alt && "motion-safe:group-hover:scale-105",
        )}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      {alt ? (
        <Image
          src={alt}
          alt={`${item.name} alternate view`}
          fill
          className={cn("object-cover transition duration-500", showAlt ? "scale-105 opacity-100" : "opacity-0")}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      ) : null}
    </>
  );

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lift">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-card rounded-br-[2.5rem]">
          {alt ? (
            <button
              type="button"
              className="absolute inset-0"
              aria-label={`${showAlt ? "Show main" : "Show alternate"} photo of ${item.name}`}
              aria-pressed={showAlt}
              onMouseEnter={() => setShowAlt(true)}
              onMouseLeave={() => setShowAlt(false)}
              onClick={() => setShowAlt((value) => !value)}
            >
              {photos}
            </button>
          ) : (
            photos
          )}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-green-strong px-3 py-1 text-xs font-semibold text-white shadow-soft">
            {item.tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-heading text-lg font-bold text-navy-deep sm:text-xl">{item.name}</h3>
          <div className="mt-2 flex gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Icon name="users" size={16} className="text-green-strong" />
              {item.seats} Seats
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="settings" size={16} className="text-green-strong" />
              {item.transmission}
            </span>
          </div>
          <p className="mt-4 font-heading text-xl font-extrabold italic text-navy-deep">
            {formatPrice(item.priceDay)}
            <span className="text-sm font-normal not-italic text-muted"> / day</span>
          </p>

          <div className="mt-auto grid grid-cols-3 gap-2 pt-5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(actionClass, "bg-green-strong text-white hover:bg-green-deep")}
            >
              <Icon name="whatsapp" size={16} className="shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
            <a href={`tel:${brand.phone}`} className={cn(actionClass, "bg-navy text-white hover:bg-navy-deep")}>
              <Icon name="phone" size={16} className="shrink-0" />
              <span className="truncate">Call Us</span>
            </a>
            <button
              type="button"
              onClick={() => setInquireOpen(true)}
              className={cn(actionClass, "border border-navy/30 text-navy-deep hover:bg-navy hover:text-white")}
            >
              Inquiry
            </button>
          </div>
        </div>
      </article>

      <InquireModal car={car} open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </>
  );
}

export function ServiceFleetGrid({ items, columns = 4 }: ServiceFleetGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((item, index) => (
        <Reveal key={item.name} delay={Math.min(index, 5) * 70} className="h-full">
          <FleetCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}
