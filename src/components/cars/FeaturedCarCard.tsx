"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InquireModal } from "@/components/cars/InquireModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { brandLogo } from "@/data/navigation";
import { formatPrice } from "@/lib/brand";
import type { CarModel } from "@/types";

type FeaturedCarCardProps = {
  car: CarModel;
  /** Label shown on the photo (the fleet name). */
  badge: string;
};

/** Large car card: photo with badge, brand logo and name, spec row, price per day and a Book Now button. */
export function FeaturedCarCard({ car, badge }: FeaturedCarCardProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const logo = brandLogo(car.brand);

  return (
    <Card as="article" interactive className="flex h-full flex-col overflow-hidden">
      <Link href={`/cars/${car.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={car.image}
          alt={`${car.name} rental`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 82vw"
          className="object-cover transition duration-500 motion-safe:hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-navy-deep px-3 py-1 text-xs font-bold text-white">
          {badge}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-3">
          {logo ? (
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white">
              <Image src={logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
            </span>
          ) : null}
          <h3 className="font-heading text-lg font-bold leading-tight text-navy-deep">
            <Link href={`/cars/${car.slug}`} className="hover:text-green-strong">
              {car.name}
            </Link>
          </h3>
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

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="whitespace-nowrap">
            <span className="font-heading text-base font-bold text-green-strong sm:text-xl">
              {formatPrice(car.priceDay)}
            </span>{" "}
            <span className="text-sm text-muted">/ day</span>
          </p>
          <Button variant="green" pill size="sm" className="shrink-0 whitespace-nowrap" onClick={() => setInquiryOpen(true)}>
            Book Now
            <Icon name="arrow-right" size={16} />
          </Button>
        </div>
      </div>

      <InquireModal car={car} open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </Card>
  );
}
