"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cities } from "@/data";
import { cn } from "@/lib/utils";

const primaryCities = cities.filter((city) => city.type === "primary");

type BookingBarProps = {
  className?: string;
};

export function BookingBar({ className }: BookingBarProps) {
  const router = useRouter();
  const [pickup, setPickup] = useState("islamabad");
  const [dropoff, setDropoff] = useState("islamabad");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({
      pickup,
      dropoff,
    });
    router.push(`/contact?${params.toString()}`);
  }

  const fieldClass =
    "w-full rounded-[10px] border border-primary/10 bg-white px-3 py-2.5 text-sm text-primary outline-none transition focus:border-secondary";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "animate-fade-up grid grid-cols-1 gap-3 rounded-[12px] border border-white/10 bg-white/95 p-3 shadow-[0_20px_60px_rgba(0,11,29,0.25)] backdrop-blur sm:grid-cols-[1fr_1fr_auto] sm:p-5",
        className,
      )}
    >
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-primary/50">
          Pickup Location
        </span>
        <select className={fieldClass} value={pickup} onChange={(e) => setPickup(e.target.value)}>
          {primaryCities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-primary/50">
          Return Location
        </span>
        <select className={fieldClass} value={dropoff} onChange={(e) => setDropoff(e.target.value)}>
          {primaryCities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end">
        <Button type="submit" variant="accent" size="lg" className="w-full lg:min-w-[140px]">
          Rent a Car
        </Button>
      </div>
    </form>
  );
}
