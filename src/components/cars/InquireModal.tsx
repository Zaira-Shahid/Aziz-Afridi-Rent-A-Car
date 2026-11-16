"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { CarModel } from "@/types";

const timeOptions = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];

type InquireModalProps = {
  car: CarModel;
  open: boolean;
  onClose: () => void;
};

const emptyForm = {
  date: "",
  pickupTime: "12:00 AM",
  dropoffTime: "12:00 AM",
  fullName: "",
  email: "",
  phone: "",
};

type FormState = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormState, string>>;

/** Phone digits without the leading zero (the +92 prefix is shown next to the field). */
function localPhoneDigits(value: string) {
  return value.replace(/\D/g, "").replace(/^0+/, "");
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.date) errors.date = "Please choose a date.";
  if (!form.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Please enter a valid e-mail address.";
  const digits = localPhoneDigits(form.phone);
  if (digits.length < 9 || digits.length > 11) errors.phone = "Please enter a valid phone number.";
  return errors;
}

const fieldClass =
  "block w-full rounded-xl border bg-surface px-3 py-3 text-sm text-navy-deep placeholder:text-muted focus:bg-white";
const labelClass = "mb-1.5 block text-sm font-semibold text-navy-deep";

/** Inquiry popup. It is only mounted while open, so every opening starts with an empty form. */
export function InquireModal({ car, open, onClose }: InquireModalProps) {
  if (!open) return null;
  return createPortal(<InquiryDialog car={car} onClose={onClose} />, document.body);
}

function InquiryDialog({ car, onClose }: { car: CarModel; onClose: () => void }) {
  const titleId = useId();
  const fieldId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Focus handling: focus the first field, keep Tab inside the dialog, close on Escape, restore focus on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = dialog.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input, select, textarea",
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const whatsappUrl = () => {
    const message = [
      `Inquiry for: ${car.name}`,
      `Date: ${form.date}`,
      `Pickup: ${form.pickupTime}`,
      `Drop-off: ${form.dropoffTime}`,
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: +92 ${localPhoneDigits(form.phone)}`,
    ].join("\n");
    return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function resetForm() {
    setForm(emptyForm);
    setErrors({});
    setSent(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const errorId = (key: keyof FormState) => `${fieldId}-${key}-error`;
  const invalid = (key: keyof FormState) => (errors[key] ? true : undefined);
  const borderFor = (key: keyof FormState) => (errors[key] ? "border-danger" : "border-line focus:border-green-strong");

  const timeSelect = (key: "pickupTime" | "dropoffTime", label: string) => (
    <div>
      <label htmlFor={`${fieldId}-${key}`} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={`${fieldId}-${key}`}
          value={form[key]}
          onChange={(event) => setField(key, event.target.value)}
          className={cn(fieldClass, "appearance-none border-line pr-10 focus:border-green-strong")}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-deep"
        />
      </div>
    </div>
  );

  const errorText = (key: keyof FormState) =>
    errors[key] ? (
      <p id={errorId(key)} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
        <Icon name="alert-circle" size={16} />
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-fade-up relative z-10 flex max-h-[92dvh] w-full max-w-[28rem] flex-col overflow-hidden rounded-card bg-white shadow-lift"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-navy underline-offset-2 hover:text-green-strong hover:underline"
          >
            Reset
          </button>
          <h2 id={titleId} className="font-heading text-lg font-extrabold italic text-navy-deep">
            Your Information
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-line text-navy-deep transition hover:bg-surface"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="overflow-y-auto px-4 pb-5 pt-4 sm:px-5">
          <p className="text-center font-heading text-base font-bold leading-snug text-navy-deep">
            {car.name} <span className="font-normal text-muted">Or Similar Car</span>
          </p>
          <div className="relative mx-auto mt-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface">
            <Image src={car.image} alt={car.name} fill className="object-contain p-2" sizes="420px" />
          </div>

          <div className="mt-4 space-y-3.5">
            <div>
              <label htmlFor={`${fieldId}-date`} className={labelClass}>
                Pickup &amp; Drop Off Date
              </label>
              <input
                id={`${fieldId}-date`}
                data-autofocus
                type="date"
                value={form.date}
                onChange={(event) => setField("date", event.target.value)}
                aria-invalid={invalid("date")}
                aria-describedby={errors.date ? errorId("date") : undefined}
                className={cn(fieldClass, borderFor("date"))}
              />
              {errorText("date")}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {timeSelect("pickupTime", "Pickup Time")}
              {timeSelect("dropoffTime", "Drop off Time")}
            </div>

            <div>
              <label htmlFor={`${fieldId}-fullName`} className={labelClass}>
                Full Name
              </label>
              <input
                id={`${fieldId}-fullName`}
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(event) => setField("fullName", event.target.value)}
                aria-invalid={invalid("fullName")}
                aria-describedby={errors.fullName ? errorId("fullName") : undefined}
                className={cn(fieldClass, borderFor("fullName"))}
              />
              {errorText("fullName")}
            </div>

            <div>
              <label htmlFor={`${fieldId}-email`} className={labelClass}>
                E-mail
              </label>
              <input
                id={`${fieldId}-email`}
                type="email"
                autoComplete="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                aria-invalid={invalid("email")}
                aria-describedby={errors.email ? errorId("email") : undefined}
                className={cn(fieldClass, borderFor("email"))}
              />
              {errorText("email")}
            </div>

            <div>
              <label htmlFor={`${fieldId}-phone`} className={labelClass}>
                Phone
              </label>
              <div
                className={cn(
                  "flex overflow-hidden rounded-xl border bg-surface focus-within:bg-white",
                  errors.phone ? "border-danger" : "border-line focus-within:border-green-strong",
                )}
              >
                <span className="flex shrink-0 items-center border-r border-line px-3 text-sm font-semibold text-navy-deep">
                  +92
                </span>
                <input
                  id={`${fieldId}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="33111116892"
                  value={form.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  aria-invalid={invalid("phone")}
                  aria-describedby={errors.phone ? errorId("phone") : undefined}
                  className="w-full bg-transparent px-3 py-3 text-sm text-navy-deep placeholder:text-muted"
                />
              </div>
              {errorText("phone")}
            </div>
          </div>

          <button type="submit" className={buttonClasses({ variant: "green", pill: true, size: "lg", className: "mt-5 w-full" })}>
            Inquire Now
          </button>

          {sent ? (
            <div role="status" className="mt-4 rounded-xl border border-green-strong/30 bg-green-strong/10 p-3 text-center text-sm text-navy-deep">
              <p className="flex items-center justify-center gap-2 font-semibold text-green-strong">
                <Icon name="check-circle" size={18} />
                Inquiry prepared — WhatsApp will open to send details.
              </p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-bold text-navy underline underline-offset-2"
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp
              </a>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
