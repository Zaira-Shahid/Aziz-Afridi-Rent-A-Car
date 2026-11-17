"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InquireModal } from "@/components/cars/InquireModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { brandLogo } from "@/data/navigation";
import { brand, formatPhoneDisplay, formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { CarModel } from "@/types";

type CarCardProps = {
  car: CarModel;
  /**
   * - `listing`: WhatsApp, Call and Inquiry buttons (car lists).
   * - `featured`: price and a single Book Now button (home page fleets).
   */
  variant?: "listing" | "featured";
  /** Label on the photo. Defaults to the car's own badge (for example "VIP"). */
  badge?: string;
  className?: string;
};

/** Car card. The whole card opens the car page; the buttons keep their own actions. */
export function CarCard({ car, variant = "listing", badge, className }: CarCardProps) {
  const [inquireOpen, setInquireOpen] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasAlt = Boolean(car.imageAlt && car.imageAlt !== car.image);
  const href = `/cars/${car.slug}`;
  const logo = brandLogo(car.brand);
  const label = badge ?? car.badge;

  // Devices with a mouse swap colour while the pointer is over the card. Touch devices
  // (no hover) swap on a timer instead. Reduced motion: no timer, and the hover swap is instant.
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setCanHover(hoverQuery.matches);
      setReducedMotion(motionQuery.matches);
    };
    sync();
    hoverQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      hoverQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!hasAlt || canHover || reducedMotion) return;
    const id = window.setInterval(() => setShowAlt((prev) => !prev), 2800);
    return () => {
      window.clearInterval(id);
      setShowAlt(false); // back to the first photo when the timer stops
    };
  }, [hasAlt, canHover, reducedMotion]);

  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi, I want to inquire about ${car.name} rental.`,
  )}`;

  return (
    <>
      <Card
        as="article"
        interactive
        className={cn(
          "group relative flex h-full flex-col overflow-hidden focus-within:ring-2 focus-within:ring-green-strong/70",
          className,
        )}
        onMouseEnter={() => {
          if (hasAlt && canHover) setShowAlt(true);
        }}
        onMouseLeave={() => {
          if (hasAlt && canHover) setShowAlt(false);
        }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <Image
            src={car.image}
            alt={`${car.name} rental`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className={cn(
              "object-cover transition duration-700 motion-reduce:scale-100 motion-reduce:transition-none",
              hasAlt && showAlt ? "scale-105 opacity-0" : "scale-100 opacity-100",
            )}
          />
          {hasAlt ? (
            <Image
              src={car.imageAlt!}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className={cn(
                "object-cover transition duration-700 motion-reduce:scale-100 motion-reduce:transition-none",
                showAlt ? "scale-105 opacity-100" : "scale-100 opacity-0",
              )}
            />
          ) : null}
          {label ? (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow-soft",
                variant === "featured" ? "bg-navy-deep" : "bg-green-strong",
              )}
            >
              {label}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center gap-3">
            {logo ? (
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white">
                <Image src={logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              </span>
            ) : null}
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-green-strong">{car.brand}</p>
              <h3 className="font-heading text-lg font-bold leading-tight text-navy-deep">
                <Link href={href} className="line-clamp-2 break-words after:absolute after:inset-0 after:content-['']">
                  {car.name}
                </Link>
              </h3>
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <li className="inline-flex items-center gap-1.5">
              <Icon name="users" size={16} className="text-navy" />
              {car.seats} Seats
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="settings" size={16} className="text-navy" />
              {car.transmission}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="fuel" size={16} className="text-navy" />
              {car.fuel}
            </li>
          </ul>
          {car.colors?.length ? <p className="mt-2 text-sm text-muted">{car.colors.join(" / ")}</p> : null}

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <p className="whitespace-nowrap">
              <span className="font-heading text-base font-bold text-green-strong sm:text-xl">
                {formatPrice(car.priceDay)}
              </span>{" "}
              <span className="text-sm text-muted">/ day</span>
            </p>
            {variant === "featured" ? (
              <Button
                variant="green"
                pill
                size="sm"
                className="relative z-10 shrink-0 whitespace-nowrap"
                onClick={() => setInquireOpen(true)}
              >
                Book Now
                <Icon name="arrow-right" size={16} />
              </Button>
            ) : null}
          </div>

          {variant === "listing" ? (
            <div className="relative z-10 mt-4 grid grid-cols-[1.5fr_1fr_1fr] gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp about ${car.name}`}
                className={buttonClasses({ variant: "green", size: "sm", className: "min-w-0 gap-1.5 px-2 text-[13px]" })}
              >
                <Icon name="whatsapp" size={16} />
                <span className="truncate">WhatsApp</span>
              </a>
              <a
                href={`tel:${brand.phone}`}
                aria-label={`Call ${formatPhoneDisplay()}`}
                className={buttonClasses({ variant: "outline", size: "sm", className: "min-w-0 gap-1.5 px-2 text-[13px]" })}
              >
                <Icon name="phone" size={16} />
                <span className="truncate">Call</span>
              </a>
              <button
                type="button"
                aria-label={`Inquiry for ${car.name}`}
                onClick={() => setInquireOpen(true)}
                className={buttonClasses({ variant: "solid", size: "sm", className: "min-w-0 px-2 text-[13px]" })}
              >
                Inquiry
              </button>
            </div>
          ) : null}
        </div>
      </Card>

      <InquireModal car={car} open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </>
  );
}
