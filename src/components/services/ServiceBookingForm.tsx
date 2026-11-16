"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

export type BookingField = {
  /** Query parameter sent to /contact. name, email and phone fill those contact fields; the rest become message lines. */
  key: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "time" | "select";
  placeholder?: string;
  options?: string[];
  /** Fill both columns of the form grid. */
  wide?: boolean;
};

export type BookingCheckboxGroup = {
  key: string;
  label: string;
  options: string[];
};

type ServiceBookingFormProps = {
  /** Sent as `service=` so the contact form knows which page the request came from. */
  service: string;
  fields: BookingField[];
  checks?: BookingCheckboxGroup;
  submitLabel: string;
  /** "light" = dark text on a light card (default), "dark" = light text on navy. */
  tone?: "light" | "dark";
  className?: string;
};

const fieldClass =
  "block w-full min-w-0 rounded-xl border border-line bg-white px-4 py-3.5 text-base text-navy-deep placeholder:text-muted focus:border-green-strong sm:text-sm";

/**
 * Service booking form. It sends nothing itself: the typed values are passed to /contact as query
 * parameters and the contact form prefills from them (client-side only, works in the static export).
 */
export function ServiceBookingForm({
  service,
  fields,
  checks,
  submitLabel,
  tone = "light",
  className,
}: ServiceBookingFormProps) {
  const router = useRouter();
  const baseId = useId();
  const [checked, setChecked] = useState<string[]>([]);
  const dark = tone === "dark";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    params.set("service", service);
    for (const field of fields) {
      const value = String(data.get(field.key) ?? "").trim();
      if (value) params.set(field.key, value);
    }
    if (checks && checked.length) params.set(checks.key, checked.join(", "));
    router.push(`/contact?${params.toString()}`);
  }

  function toggle(option: string) {
    setChecked((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  const labelClass = cn("mb-1.5 block text-sm font-semibold", dark ? "text-white/90" : "text-navy-deep");

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {fields.map((field) => {
        const id = `${baseId}-${field.key}`;
        return (
          <div key={field.key} className={cn(field.wide && "sm:col-span-2")}>
            <label htmlFor={id} className={labelClass}>
              {field.label}
            </label>
            {field.type === "select" ? (
              <select id={id} name={field.key} className={fieldClass} defaultValue={field.options?.[0]}>
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={field.key}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                autoComplete={
                  field.key === "name" ? "name" : field.key === "email" ? "email" : field.key === "phone" ? "tel" : "off"
                }
                className={fieldClass}
              />
            )}
          </div>
        );
      })}

      {checks ? (
        <fieldset className="sm:col-span-2">
          <legend className={cn("mb-2 text-sm font-semibold", dark ? "text-white/90" : "text-navy-deep")}>
            {checks.label}
          </legend>
          <div className="flex flex-wrap gap-2">
            {checks.options.map((option) => {
              const on = checked.includes(option);
              return (
                <label
                  key={option}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green-strong",
                    on
                      ? "border-green-strong bg-green-strong text-white"
                      : dark
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-line bg-white text-navy-deep hover:border-navy",
                  )}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(option)} />
                  {on ? <Icon name="check" size={16} /> : null}
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className={buttonClasses({ variant: "green", size: "lg", pill: true, className: "w-full" })}
        >
          {submitLabel}
          <Icon name="arrow-right" size={18} />
        </button>
        <p className={cn("mt-3 text-center text-xs", dark ? "text-white/70" : "text-muted")}>
          You will continue to our contact page with these details filled in.
        </p>
      </div>
    </form>
  );
}
