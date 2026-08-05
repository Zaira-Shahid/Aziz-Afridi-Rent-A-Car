"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data";

const SERVICE_COPY: Record<string, { icon: string; blurb: string }> = {
  "airport-pick-drop": {
    icon: "flight_land",
    blurb: "Meet & greet, flight monitoring, and doorstep drop from major airports.",
  },
  "corporate-car-rental": {
    icon: "business_center",
    blurb: "Dedicated accounts, monthly billing, and priority fleet for your team.",
  },
  "daily-car-rental": {
    icon: "today",
    blurb: "Flexible same-day and short-term hire with clear daily rates.",
  },
  "weekly-car-rental": {
    icon: "date_range",
    blurb: "Weekly plans that save versus day rates — easy extensions included.",
  },
  "monthly-car-rental": {
    icon: "calendar_month",
    blurb: "Long-term mobility with maintenance cover and replacement vehicles.",
  },
  "executive-car-rental": {
    icon: "workspace_premium",
    blurb: "Chauffeured executive cars for meetings, VIPs, and board travel.",
  },
  "wedding-car-rental": {
    icon: "celebration",
    blurb: "Decorated luxury cars and bridal convoy options for your big day.",
  },
  "hotel-transfer": {
    icon: "hotel",
    blurb: "Fixed-price hotel transfers with professional chauffeurs.",
  },
};

export function ServicesGrid() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, index) => {
            const copy = SERVICE_COPY[item.slug];
            return (
              <Reveal key={item.slug} delay={Math.min(index, 7) * 70}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-primary/8 bg-white p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)] transition hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[0_18px_40px_rgba(14,28,46,0.1)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition group-hover:bg-accent group-hover:text-primary">
                    <span className="material-symbols-outlined text-[26px]">
                      {copy?.icon ?? "directions_car"}
                    </span>
                  </span>
                  <h2 className="mt-5 font-heading text-lg font-semibold text-primary">{item.name}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{copy?.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary transition group-hover:gap-2">
                    View page
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
