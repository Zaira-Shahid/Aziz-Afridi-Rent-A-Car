"use client";

import { useId, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { carModels, cities } from "@/data";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

const locationOptions = cities.filter(
  (city) => city.type === "primary" || city.type === "tourist" || city.type === "local",
);

type BookingBarProps = {
  className?: string;
};

type SearchFieldProps = {
  label: string;
  icon: IconName;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
};

const labelClass = "mb-1.5 block text-sm font-semibold text-navy-deep";
const inputClass =
  "block w-full min-w-0 rounded-xl border border-line bg-surface py-3.5 text-base text-navy-deep placeholder:text-muted focus:border-green-strong focus:bg-white sm:text-sm";

/** Text field with a list of suggestions (up to 8). Fully usable with the keyboard. */
function SearchField({ label, icon, value, onChange, options, placeholder, required }: SearchFieldProps) {
  const uid = useId();
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const filtered = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return options.slice(0, 8);
    return options.filter((item) => item.toLowerCase().includes(query)).slice(0, 8);
  }, [options, value]);

  const choose = (item: string) => {
    onChange(item);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div className="relative">
      <label htmlFor={uid} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <Icon
          name={icon}
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-strong"
        />
        <input
          id={uid}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open && filtered.length > 0}
          aria-controls={listId}
          aria-activedescendant={open && active >= 0 ? `${uid}-opt-${active}` : undefined}
          value={value}
          required={required}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            setActive(-1);
          }}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              setActive(-1);
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              setActive((current) =>
                event.key === "ArrowDown" ? Math.min(current + 1, filtered.length - 1) : Math.max(current - 1, 0),
              );
            } else if (event.key === "Enter" && open && filtered[active]) {
              event.preventDefault();
              choose(filtered[active]);
            }
          }}
          className={cn(inputClass, "pl-11 pr-4")}
        />
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-label={label}
        hidden={!(open && filtered.length > 0)}
        className="absolute inset-x-0 top-full z-30 mt-1 max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-line bg-white p-1 shadow-lift"
      >
        {filtered.map((item, index) => (
          <li
            key={item}
            id={`${uid}-opt-${index}`}
            role="option"
            aria-selected={active === index}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(item)}
            className={cn(
              "flex min-h-10 cursor-pointer items-center rounded-lg px-3 text-sm text-navy-deep",
              active === index ? "bg-surface text-green-strong" : "hover:bg-surface",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Quick booking form (pickup, drop, dates, car). Sends the details to WhatsApp. */
export function BookingBar({ className }: BookingBarProps) {
  const [pickup, setPickup] = useState("Islamabad");
  const [drop, setDrop] = useState("Rawalpindi");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carName, setCarName] = useState(carModels[0]?.name ?? "Suzuki Alto");

  const locationNames = useMemo(() => locationOptions.map((city) => city.name), []);
  const carNames = useMemo(() => carModels.map((car) => car.name), []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      `Hello ${brand.name},`,
      "",
      "I want to book a car with these details:",
      "",
      `Pickup Location: ${pickup.trim() || "Not selected"}`,
      `Drop Location: ${drop.trim() || "Not selected"}`,
      `Start Date: ${startDate || "Not selected"}`,
      `End Date: ${endDate || "Not selected"}`,
      `Car Name: ${carName.trim() || "Not selected"}`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");

    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={cn("rounded-panel bg-white p-5 text-navy-deep shadow-lift sm:p-7", className)}>
      <h2 className="mb-5 font-heading text-xl font-extrabold italic sm:text-2xl">Find Your Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SearchField
          label="Pick up location"
          icon="map-pin"
          value={pickup}
          onChange={setPickup}
          options={locationNames}
          placeholder="Search or type pickup location"
          required
        />
        <SearchField
          label="Drop location"
          icon="flag"
          value={drop}
          onChange={setDrop}
          options={locationNames}
          placeholder="Search or type drop location"
          required
        />

        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="booking-start" className={labelClass}>
              Start date
            </label>
            <input
              id="booking-start"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className={cn(inputClass, "px-4")}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="booking-end" className={labelClass}>
              End date
            </label>
            <input
              id="booking-end"
              type="date"
              min={startDate || undefined}
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className={cn(inputClass, "px-4")}
            />
          </div>
        </div>

        <SearchField
          label="Car name"
          icon="car"
          value={carName}
          onChange={setCarName}
          options={carNames}
          placeholder="Search or type car name"
          required
        />

        <button type="submit" className={buttonClasses({ variant: "green", pill: true, size: "lg", className: "w-full" })}>
          <Icon name="send" size={20} />
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
