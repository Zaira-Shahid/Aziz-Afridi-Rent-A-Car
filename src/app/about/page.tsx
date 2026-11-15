import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, CtaBanner } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "Meet Aziz Afridi Rent A Car and explore chauffeur-driven travel for airport transfers, business trips and family journeys across Pakistan.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Aziz Afridi Rent A Car" description="Car rental with a driver for everyday plans, business commitments and journeys across Pakistan." />
      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">Travel planned around your journey</h2>
            <p className="mt-5 leading-relaxed text-muted">Aziz Afridi Rent A Car helps you arrange transport for city travel, airport pickups, corporate visits, weddings and outstation trips. Choose a vehicle to suit your passenger count, luggage and itinerary, then discuss your requirements with our booking team.</p>
            <p className="mt-4 leading-relaxed text-muted">Our fleet pages bring economy cars, sedans, executive vehicles, SUVs and group transport together in one place. Daily, weekly and monthly options help you plan a short visit or recurring travel.</p>
            <p className="mt-4 leading-relaxed text-muted">Share your pickup point, dates and destination before confirming. Request a quote covering your vehicle, driver arrangements, rental duration and additional trip costs.</p>
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
            <Image src="/images/about-hero-v2.png" alt="Vehicles for journeys in Islamabad" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-semibold">Plan your rental with confidence</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Choose your vehicle", "Compare seating, luggage space and vehicle class. For northern routes, discuss road conditions and vehicle suitability with the team."],
            ["Share your itinerary", "Provide flight details, planned stops and return timings so your quote covers the full journey."],
            ["Confirm the details", "Agree fuel, tolls, parking, overtime and outstation driver expenses before paying a deposit. Keep your booking confirmation for reference."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-primary/10 bg-white p-7">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
