"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CarCard } from "@/components/cars/CarCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/button-styles";
import { brandLogo } from "@/data/navigation";
import { brand, formatPhoneDisplay, formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { CarModel } from "@/types";

type CarDetailBodyProps = {
  car: CarModel;
  categoryName: string;
  related: CarModel[];
};

export function CarDetailBody({ car, categoryName, related }: CarDetailBodyProps) {
  const [view, setView] = useState<"main" | "alt">("main");
  const hasAlt = Boolean(car.imageAlt && car.imageAlt !== car.image);
  const logo = brandLogo(car.brand);

  const specs = [
    { label: "Brand", value: car.brand },
    { label: "Category", value: categoryName },
    { label: "Seats", value: `${car.seats}` },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel", value: car.fuel },
    { label: "Colors", value: car.colors?.join(", ") ?? "Available on request" },
  ];

  const keyFacts = [
    { icon: "users" as const, label: "Seats", value: `${car.seats}` },
    { icon: "settings" as const, label: "Transmission", value: car.transmission },
    { icon: "fuel" as const, label: "Fuel", value: car.fuel },
  ];

  return (
    <>
      <Section tone="white" className="pb-10 pt-8 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="font-semibold text-navy hover:text-green-strong">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron-right" size={14} />
            </li>
            <li>
              <Link href="/cars" className="font-semibold text-navy hover:text-green-strong">
                Our Cars
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron-right" size={14} />
            </li>
            <li>
              <Link href={`/categories/${car.category}`} className="font-semibold text-navy hover:text-green-strong">
                {categoryName}
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron-right" size={14} />
            </li>
            <li aria-current="page" className="font-semibold text-navy-deep">
              {car.name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-surface shadow-soft">
              <Image
                src={car.image}
                alt={`${car.name} rental`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={cn("object-cover transition-opacity duration-500", view === "alt" ? "opacity-0" : "opacity-100")}
              />
              {hasAlt ? (
                <Image
                  src={car.imageAlt!}
                  alt={`${car.name} in a second color`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={cn("object-cover transition-opacity duration-500", view === "alt" ? "opacity-100" : "opacity-0")}
                />
              ) : null}
            </div>
            {hasAlt ? (
              <div className="mt-3 flex gap-3" role="group" aria-label="Car photos">
                {[
                  { key: "main" as const, src: car.image, label: "Show main photo" },
                  { key: "alt" as const, src: car.imageAlt!, label: "Show second color photo" },
                ].map((thumb) => (
                  <button
                    key={thumb.key}
                    type="button"
                    aria-label={thumb.label}
                    aria-pressed={view === thumb.key}
                    onClick={() => setView(thumb.key)}
                    className={cn(
                      "relative h-16 w-24 overflow-hidden rounded-xl border-2 bg-surface transition",
                      view === thumb.key ? "border-green-strong" : "border-line hover:border-navy/40",
                    )}
                  >
                    <Image src={thumb.src} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-green-strong">
              {logo ? <Image src={logo} alt="" width={22} height={22} className="h-5 w-5 object-contain" /> : null}
              {car.badge ?? car.brand}
            </p>
            <h1 className="mt-3 font-heading text-3xl font-extrabold italic leading-tight tracking-tight text-navy-deep sm:text-4xl lg:text-[2.6rem]">
              {car.name} <span className="text-green-strong">Rental</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Book the {car.name} for daily, weekly, or monthly hire — comfortable travel with Aziz Afridi Rent A Car
              across Pakistan.
            </p>

            <Card className="mt-6 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">From</p>
              <p className="mt-1">
                <span className="font-heading text-3xl font-extrabold text-green-strong">{formatPrice(car.priceDay)}</span>{" "}
                <span className="text-base text-muted">/ day</span>
              </p>
              <ul className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
                {keyFacts.map((fact) => (
                  <li key={fact.label} className="text-center">
                    <span className="mx-auto grid size-10 place-items-center rounded-full bg-surface text-navy">
                      <Icon name={fact.icon} size={20} />
                    </span>
                    <p className="mt-2 text-sm font-bold text-navy-deep">{fact.value}</p>
                    <p className="text-xs text-muted">{fact.label}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hi, I want to book ${car.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "green", pill: true, size: "lg", className: "sm:flex-1" })}
              >
                <Icon name="whatsapp" size={20} />
                Book on WhatsApp
              </a>
              <a
                href={`tel:${brand.phone}`}
                className={buttonClasses({ variant: "outline", pill: true, size: "lg", className: "sm:flex-1" })}
              >
                <Icon name="phone" size={20} />
                Call {formatPhoneDisplay()}
              </a>
            </div>
            <ButtonLink href="/contact" variant="solid" pill size="lg" className="mt-3 w-full">
              Inquire Now
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <Reveal>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-green-strong">Overview</p>
            <h2 className="font-heading text-2xl font-extrabold italic leading-tight text-navy-deep sm:text-3xl">
              Why rent the {car.name}?
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                The {car.name} is a popular choice for comfortable travel with {brand.name}. Ideal for city rides,
                airport transfers, and outstation trips.
              </p>
              <p>
                Contact us to check availability, pricing, and chauffeur booking for your dates. WhatsApp or call for a
                quick confirmation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <dl className="grid gap-3 sm:grid-cols-2">
              {specs.map((item) => (
                <div key={item.label} className="rounded-card border border-line bg-white px-4 py-3 shadow-soft">
                  <dt className="text-xs font-bold uppercase tracking-wider text-muted">{item.label}</dt>
                  <dd className="mt-1 text-base font-semibold text-navy-deep">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 ? (
        <section className="bg-white pb-14 pt-4 sm:pb-16 lg:pb-20">
          <Container>
            <h2 className="font-heading text-2xl font-extrabold italic text-navy-deep sm:text-3xl">Related cars</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <li key={item.slug}>
                  <CarCard car={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
