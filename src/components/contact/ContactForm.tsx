"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PICKUP_OPTIONS = [
  "Islamabad International Airport",
  "Blue Area Office",
  "Hotel Delivery",
  "Custom Address",
];

type Status = "idle" | "submitting" | "sent";

const inputClasses =
  "w-full rounded-lg border border-primary/10 bg-[#f3f4f5] p-4 text-sm text-primary outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Full Name</label>
          <input required name="name" type="text" placeholder="John Doe" className={inputClasses} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Email Address</label>
          <input required name="email" type="email" placeholder="john@example.com" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Phone Number</label>
          <input required name="phone" type="tel" placeholder="+92 300 0000000" className={inputClasses} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Pickup Location</label>
          <select name="pickup" defaultValue={PICKUP_OPTIONS[0]} className={cn(inputClasses, "appearance-none")}>
            {PICKUP_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">Your Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your requirements..."
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className={cn(
          "w-full rounded-lg py-4 text-sm font-semibold transition active:scale-[0.98]",
          status === "sent" ? "bg-emerald-500 text-white" : "bg-accent text-primary hover:brightness-95",
          status === "submitting" && "opacity-70",
        )}
      >
        {status === "sent"
          ? "Message Sent — We'll Call You Soon"
          : status === "submitting"
            ? "Sending Request..."
            : "Request a Call Back"}
      </button>
    </form>
  );
}
