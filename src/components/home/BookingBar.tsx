"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { carCategories, cities } from "@/data";
import { cn } from "@/lib/utils";

const primaryCities = cities.filter((city) => city.type === "primary");

type BookingBarProps = {
  className?: string;
};

export function BookingBar({ className }: BookingBarProps) {
  const router = useRouter();
  const [pickup, setPickup] = useState("islamabad");
  const [category, setCategory] = useState(carCategories[0]?.slug ?? "sedan");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({
      pickup,
      category,
      ...(startDate ? { start: startDate } : {}),
      ...(endDate ? { end: endDate } : {}),
    });
    router.push(`/contact?${params.toString()}`);
  }

  const fieldClass =
    "w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:ring-2 focus:ring-accent appearance-none";

  return (
    <div className={cn("glass-panel luxury-card-shadow rounded-xl p-4 sm:p-6 lg:p-8", className)}>
      <h2 className="mb-4 font-heading text-lg font-semibold text-white sm:mb-6 sm:text-xl lg:text-2xl">
        Find Your Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
            Pick-up Location
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-white/50">
              location_on
            </span>
            <select className={fieldClass} value={pickup} onChange={(e) => setPickup(e.target.value)}>
              {primaryCities.map((city) => (
                <option key={city.slug} value={city.slug} className="text-primary">
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Start Date
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-accent [color-scheme:dark]"
            />
          </label>
          <label className="block">
            <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
              End Date
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-accent [color-scheme:dark]"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 ml-1 block text-xs font-semibold uppercase tracking-wider text-white/70">
            Car Category
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-white/50">
              directions_car
            </span>
            <select
              className={fieldClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {carCategories.map((item) => (
                <option key={item.slug} value={item.slug} className="text-primary">
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-accent py-4 text-sm font-semibold text-primary shadow-lg transition hover:brightness-110"
        >
          Search Available Cars
        </button>
      </form>
    </div>
  );
}
