import Image from "next/image";
import { CtaBanner } from "@/components/shared";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { ServiceDetail } from "@/types";
import { ServiceFeatureGrid } from "./ServiceFeatureGrid";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";

type HotelTransferDetailProps = {
  data: ServiceDetail;
};

export function HotelTransferDetail({ data }: HotelTransferDetailProps) {
  const { hero, features, coverage, booking, fleet, included, audience, notes } = data;

  return (
    <>
      <ServiceHero hero={hero} />

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="mb-12 max-w-xl sm:mb-16">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{features.title}</h2>
            <p className="mt-4 text-muted sm:text-lg">{features.description}</p>
          </div>
          <ServiceFeatureGrid items={features.items} />
        </Container>
      </section>

      {included ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{included.title}</h2>
              {included.description ? <p className="mt-4 text-muted sm:text-lg">{included.description}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {included.items.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 rounded-xl border border-primary/8 bg-white p-5 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </span>
                  <p className="text-sm font-medium text-primary">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {audience ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{audience.title}</h2>
              {audience.description ? <p className="mt-4 text-muted sm:text-lg">{audience.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {audience.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="material-symbols-outlined mb-4 text-3xl text-secondary">{item.icon}</span>
                  <h4 className="mb-2 font-heading text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {coverage ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 text-center sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{coverage.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted sm:text-lg">{coverage.description}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coverage.cities.map((city) => (
                <div
                  key={city.name}
                  className="group luxury-card-shadow overflow-hidden rounded-2xl bg-white transition duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-48">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-heading text-xl font-semibold">{city.name}</h4>
                    <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-4 text-sm font-semibold">
                      <span>{city.tag}</span>
                      <span className="text-secondary">View Rates</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {notes ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{notes.title}</h2>
              {notes.description ? <p className="mt-4 text-white/60 sm:text-lg">{notes.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {notes.items.map((item) => (
                <div key={item.title ?? item.text} className="glass-panel rounded-xl p-8">
                  <span className="material-symbols-outlined mb-4 text-3xl text-accent">{item.icon}</span>
                  {item.title ? <h4 className="mb-2 text-lg font-semibold">{item.title}</h4> : null}
                  <p className="text-sm text-white/60">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {booking ? (
        <section className="py-16 sm:py-24 lg:py-[100px]" id="booking">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-20">
              <div className="space-y-8 lg:col-span-2">
                <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {booking.title}
                </h2>
                <p className="text-base text-muted sm:text-lg">{booking.description}</p>
                {booking.highlights ? (
                  <ul className="space-y-4">
                    {booking.highlights.map((item) => (
                      <li key={item.text} className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </span>
                        <span className="font-medium">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="lg:col-span-3">
                <div className="luxury-card-shadow rounded-3xl border border-primary/8 bg-white p-8 sm:p-12">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Hotel Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Serena Hotel, Marriott"
                          className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Passengers
                        </label>
                        <select className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-secondary">
                          <option>1-2 Person</option>
                          <option>3-4 People</option>
                          <option>5-7 People (SUV)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Pickup Location
                        </label>
                        <input
                          type="text"
                          placeholder="Enter airport or area"
                          className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Drop-off Location
                        </label>
                        <input
                          type="text"
                          placeholder="Enter destination"
                          className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">Date</label>
                        <input
                          type="date"
                          className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">Time</label>
                        <input
                          type="time"
                          className="w-full rounded-xl border border-primary/10 bg-[#f3f4f5] px-4 py-3.5 outline-none transition focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                    <ButtonLink href="/contact" variant="secondary" size="lg" className="w-full">
                      Calculate &amp; Reserve Now
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-surface py-16 sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <h2 className="mb-12 font-heading text-3xl font-semibold tracking-tight sm:mb-16 sm:text-4xl">
            {fleet.title}
          </h2>
          <ServiceFleetGrid items={fleet.items} />
        </Container>
      </section>

      <CtaBanner
        title="Ready to reserve your hotel transfer?"
        description="Book a professional chauffeur and travel in comfort to and from your hotel."
      />
    </>
  );
}
