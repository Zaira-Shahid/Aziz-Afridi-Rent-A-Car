"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { cities, fleetSections } from "@/data";
import { cn } from "@/lib/utils";

const fieldBox =
  "relative flex min-w-0 items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 focus-within:border-green-strong lg:rounded-none lg:border-0 lg:border-r lg:px-5 lg:last-of-type:border-r-0";
const labelClass = "block text-sm font-bold text-navy-deep";
const inputClass =
  "mt-0.5 block w-full min-w-0 bg-transparent text-sm text-muted placeholder:text-muted [color-scheme:light]";

/**
 * Home search bar. Same behaviour as before (city combobox, pickup and return date-times, results on /cars),
 * plus a vehicle type: when one is chosen Search opens that fleet's category page instead.
 */
export function HomeSearch() {
  const router = useRouter();
  const uid = useId();
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(-1);
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const matchingCities = cities.filter((city) => city.name.toLowerCase().includes(location.trim().toLowerCase()));
  const listId = `${uid}-cities`;

  const pickCity = (name: string) => {
    setLocation(name);
    setLocationOpen(false);
    setActiveLocation(-1);
  };

  return (
    <form
      aria-label="Search cars"
      className="rounded-3xl bg-white p-4 shadow-lift sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (vehicleType) {
          router.push(`/categories/${vehicleType}`);
          return;
        }
        const params = new URLSearchParams({ location, pickup, return: returnDate });
        router.push(`/cars?${params.toString()}`);
      }}
    >
      <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_1.15fr_auto] lg:items-center lg:gap-0">
        <div className={fieldBox}>
          <Icon name="map-pin" size={24} className="text-green" />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-city`} className={labelClass}>
              Pickup City
            </label>
            <input
              id={`${uid}-city`}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={locationOpen}
              aria-controls={listId}
              aria-activedescendant={locationOpen && activeLocation >= 0 ? `${uid}-city-${activeLocation}` : undefined}
              autoComplete="off"
              placeholder="Select pickup city"
              className={inputClass}
              value={location}
              required
              onFocus={() => setLocationOpen(true)}
              onBlur={() => {
                setLocationOpen(false);
                setActiveLocation(-1);
              }}
              onChange={(event) => {
                setLocation(event.target.value);
                setLocationOpen(true);
                setActiveLocation(-1);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setLocationOpen(false);
                  setActiveLocation(-1);
                }
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setLocationOpen(true);
                  setActiveLocation((current) => {
                    const next =
                      event.key === "ArrowDown"
                        ? Math.min(current + 1, matchingCities.length - 1)
                        : Math.max(0, current - 1);
                    requestAnimationFrame(() =>
                      document.getElementById(`${uid}-city-${next}`)?.scrollIntoView({ block: "nearest" }),
                    );
                    return next;
                  });
                }
                if (event.key === "Enter" && locationOpen && matchingCities[activeLocation]) {
                  event.preventDefault();
                  pickCity(matchingCities[activeLocation].name);
                }
              }}
            />
          </div>
          <Icon name="chevron-down" size={18} className="text-navy-deep" />
          <ul
            id={listId}
            role="listbox"
            aria-label="Pickup cities"
            hidden={!locationOpen}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-56 overflow-y-auto overscroll-contain rounded-xl border border-line bg-white p-1 shadow-lift"
          >
            {matchingCities.map((city, index) => (
              <li
                key={city.slug}
                id={`${uid}-city-${index}`}
                role="option"
                aria-selected={activeLocation === index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pickCity(city.name)}
                className={cn(
                  "flex min-h-10 cursor-pointer items-center rounded-lg px-3 text-sm text-navy-deep",
                  activeLocation === index ? "bg-surface text-green-strong" : "hover:bg-surface",
                )}
              >
                {city.name}
              </li>
            ))}
            {matchingCities.length === 0 && (
              <li role="presentation" className="flex min-h-10 items-center px-3 text-sm text-muted">
                No matching locations
              </li>
            )}
          </ul>
        </div>

        <div className={fieldBox}>
          <Icon name="calendar" size={24} className="text-navy-deep" />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-pickup`} className={labelClass}>
              Pickup Date
            </label>
            <input
              id={`${uid}-pickup`}
              type="datetime-local"
              className={inputClass}
              value={pickup}
              required
              onChange={(event) => {
                setPickup(event.target.value);
                if (returnDate && event.target.value > returnDate) setReturnDate("");
              }}
            />
          </div>
        </div>

        <div className={fieldBox}>
          <Icon name="calendar" size={24} className="text-navy-deep" />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-return`} className={labelClass}>
              Return Date
            </label>
            <input
              id={`${uid}-return`}
              type="datetime-local"
              className={inputClass}
              min={pickup || undefined}
              value={returnDate}
              required
              onChange={(event) => setReturnDate(event.target.value)}
            />
          </div>
        </div>

        <div className={fieldBox}>
          <Icon name="car" size={24} className="text-navy-deep" />
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-type`} className={labelClass}>
              Vehicle Type
            </label>
            <select
              id={`${uid}-type`}
              className={cn(inputClass, "cursor-pointer appearance-none pr-6")}
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value)}
            >
              <option value="">All Vehicle Types</option>
              {fleetSections.map((section) => (
                <option key={section.slug} value={section.slug}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
          <Icon name="chevron-down" size={18} className="pointer-events-none text-navy-deep" />
        </div>

        <button
          type="submit"
          className={buttonClasses({ variant: "green", size: "lg", className: "w-full lg:ml-4 lg:w-auto lg:px-9" })}
        >
          <Icon name="search" size={22} />
          Search
        </button>
      </div>
    </form>
  );
}
