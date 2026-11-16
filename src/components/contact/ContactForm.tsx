"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import {
  emptyContactValues,
  PICKUP_OPTIONS,
  prefillFromParams,
  type ContactValues,
} from "./contact-prefill";

type Status = "idle" | "submitting" | "sent";
type Errors = Partial<Record<keyof ContactValues, string>>;

const labelClass = "mb-1.5 block text-sm font-semibold text-navy-deep";
const inputClass =
  "block w-full rounded-xl border bg-surface px-4 py-3.5 text-base text-navy-deep placeholder:text-muted focus:bg-white sm:text-sm";

function validate(values: ContactValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  return errors;
}

function buildText(values: ContactValues) {
  return [
    `Hello ${brand.name},`,
    "",
    "I would like to request a callback / booking.",
    "",
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Pickup: ${values.pickup.trim()}`,
    values.message.trim() ? `Message: ${values.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Reads the URL (`?service=...&name=...`) so other pages can send visitors here with their details already filled in. */
export function ContactForm() {
  const params = useSearchParams();
  // A new key remounts the form when the query changes, so the prefill always matches the URL.
  return <ContactFormFields key={params.toString()} initial={prefillFromParams(params)} />;
}

function ContactFormFields({ initial }: { initial: ContactValues }) {
  const [values, setValues] = useState<ContactValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentUrl, setSentUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<number | undefined>(undefined);

  function setField<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(buildText(values))}`;
    setStatus("submitting");
    window.open(url, "_blank", "noopener,noreferrer");

    setSentUrl(url);
    setValues(emptyContactValues);
    setStatus("sent");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2500);
  }

  const invalid = (key: keyof ContactValues) => (errors[key] ? true : undefined);
  const describedBy = (key: keyof ContactValues) => (errors[key] ? `contact-${key}-error` : undefined);
  const borderFor = (key: keyof ContactValues) => (errors[key] ? "border-danger" : "border-line focus:border-green-strong");
  const errorText = (key: keyof ContactValues) =>
    errors[key] ? (
      <p id={`contact-${key}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
        <Icon name="alert-circle" size={16} />
        {errors[key]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full Name <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            aria-required="true"
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            className={cn(inputClass, borderFor("name"))}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email Address <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            aria-required="true"
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            className={cn(inputClass, borderFor("email"))}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone Number <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={brand.phone}
            aria-required="true"
            aria-invalid={invalid("phone")}
            aria-describedby={describedBy("phone")}
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            className={cn(inputClass, borderFor("phone"))}
          />
          {errorText("phone")}
        </div>
        <div>
          <label htmlFor="contact-pickup" className={labelClass}>
            Pickup Location
          </label>
          <div className="relative">
            <select
              id="contact-pickup"
              name="pickup"
              value={values.pickup}
              onChange={(event) => setField("pickup", event.target.value)}
              className={cn(inputClass, "cursor-pointer appearance-none border-line pr-11 focus:border-green-strong")}
            >
              {PICKUP_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy-deep"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us about your requirements..."
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          className={cn(inputClass, "resize-y border-line focus:border-green-strong")}
        />
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className={buttonClasses({ variant: "green", pill: true, size: "lg", className: "w-full" })}
      >
        <Icon name="whatsapp" size={20} />
        {status === "sent" ? "Opening WhatsApp..." : status === "submitting" ? "Preparing WhatsApp..." : "Send on WhatsApp"}
      </button>

      {sentUrl ? (
        <div
          role="status"
          className="rounded-xl border border-green-strong/30 bg-green-strong/10 p-4 text-center text-sm text-navy-deep"
        >
          <p className="flex items-center justify-center gap-2 font-semibold text-green-strong">
            <Icon name="check-circle" size={18} />
            Inquiry prepared — WhatsApp will open to send details.
          </p>
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-bold underline underline-offset-2"
          >
            <Icon name="whatsapp" size={16} />
            WhatsApp
          </a>
        </div>
      ) : null}
    </form>
  );
}
