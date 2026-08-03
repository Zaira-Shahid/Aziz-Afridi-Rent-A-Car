"use client";

import { useState } from "react";
import { carModels, cities } from "@/data";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

const locationOptions = cities.filter(
  (city) => city.type === "primary" || city.type === "tourist" || city.type === "local",
);

type BookingBarProps = {
  className?: string;
};

export function BookingBar({ className }: BookingBarProps) {
  const [pickup, setPickup] = useState("islamabad");
  const [drop, setDrop] = useState("rawalpindi");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carName, setCarName] = useState(carModels[0]?.slug ?? "toyota-corolla");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const pickupLabel = locationOptions.find((item) => item.slug === pickup)?.name ?? pickup;
    const dropLabel = locationOptions.find((item) => item.slug === drop)?.name ?? drop;
    const carLabel = carModels.find((item) => item.slug === carName)?.name ?? carName;

    const message = [
      `Hello ${brand.name},`,
      "",
      "I want to book a car with these details:",
      "",
      `Pickup Location: ${pickupLabel}`,
      `Drop Location: ${dropLabel}`,
      `Start Date: ${startDate || "Not selected"}`,
      `End Date: ${endDate || "Not selected"}`,
      `Car Name: ${carLabel}`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");

    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  const fieldClass =
    "w-full rounded-lg border border-white/15 bg-white/95 py-3 pl-10 pr-4 text-sm text-primary outline-none transition focus:ring-2 focus:ring-accent appearance-none";

  return (
    <div
      className={cn(
        "rounded-xl border border-white/20 bg-navy/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-6 lg:p-8",
        className,
      )}
    >
      <h2 className="mb-4 font-heading text-lg font-semibold text-white sm:mb-6 sm:text-xl lg:text-2xl">
        Find Your Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
            Pick up location
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
              location_on
            </span>
            <select
              className={fieldClass}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            >
              {locationOptions.map((city) => (
                <option key={`pickup-${city.slug}`} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="block">
          <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
            Drop location
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
              flag
            </span>
            <select
              className={fieldClass}
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              required
            >
              {locationOptions.map((city) => (
                <option key={`drop-${city.slug}`} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Start date
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full rounded-lg border border-white/15 bg-white/95 px-4 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
              End date
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full rounded-lg border border-white/15 bg-white/95 px-4 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
            Car name
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary/45">
              directions_car
            </span>
            <select
              className={fieldClass}
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              required
            >
              {carModels.map((car) => (
                <option key={car.slug} value={car.slug}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-4 text-sm font-semibold text-primary shadow-lg transition hover:brightness-110"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
