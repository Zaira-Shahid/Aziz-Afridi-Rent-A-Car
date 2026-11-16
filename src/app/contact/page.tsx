import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/shared";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: "Contact Aziz Afridi Rent A Car for vehicle availability, rental quotes and trip planning.",
  path: "/contact",
});

const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Facebook", href: brand.social.facebook, icon: "facebook" },
  { label: "Instagram", href: brand.social.instagram, icon: "instagram" },
  { label: "Pinterest", href: brand.social.pinterest, icon: "pinterest" },
  { label: "X", href: brand.social.x, icon: "x" },
];

const cardBase = "flex h-full items-start gap-4 rounded-card border border-line bg-white p-5 shadow-soft";
const cardLink = cardBase + " transition duration-200 hover:shadow-lift motion-safe:hover:-translate-y-0.5";
const methodIconClass = "grid size-12 shrink-0 place-items-center rounded-full bg-green-strong text-white";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's plan your journey"
        highlight="journey"
        description="Share your dates, pickup location and preferred vehicle to request a quote from Aziz Afridi Rent A Car."
        ctaHref="#booking-inquiry"
        ctaLabel="Send an inquiry"
        image="/images/contact-hero-v2.webp"
        imageAlt="Chauffeur-driven travel in Islamabad"
      />

      <Section tone="white" className="pb-8 sm:pb-10 lg:pb-12">
        <Reveal>
          <SectionHeading title="Contact the booking team" />
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <a href={"tel:" + brand.phone} className={cardLink}>
              <span className={methodIconClass}>
                <Icon name="phone" size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted">Call</span>
                <span className="mt-1 block font-heading text-lg font-extrabold text-navy-deep">{formatPhoneDisplay()}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={"https://wa.me/" + brand.whatsapp} target="_blank" rel="noopener noreferrer" className={cardLink}>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-green-strong">
                <Icon name="whatsapp" size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-white/85">WhatsApp</span>
                <span className="mt-1 block font-heading text-lg font-extrabold text-white">{formatPhoneDisplay()}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={brand.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={cardLink}>
              <span className={methodIconClass}>
                <Icon name="map-pin" size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted">Address</span>
                <span className="mt-1 block text-base font-semibold leading-snug text-navy-deep">{brand.location.address}</span>
              </span>
            </a>
          </li>
          <li>
            <div className={cardBase + " items-center"}>
              <ul className="grid w-full grid-cols-4 justify-items-center gap-2" aria-label="Social media">
                {socialLinks.map(({ label, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-line text-navy-deep transition hover:border-green-strong hover:bg-green-strong hover:text-white"
                    >
                      <Icon name={icon} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <p className="mt-6 text-base text-muted">
          For written inquiries, email{" "}
          <a href={"mailto:" + brand.email} className="font-bold text-navy underline underline-offset-2 hover:text-green-strong">
            {brand.email}
          </a>
          .
        </p>
      </Section>

      <Section className="pt-8 sm:pt-10 lg:pt-12">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div id="booking-inquiry" className="scroll-mt-28">
            <Card className="p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-extrabold italic leading-tight text-navy-deep sm:text-3xl">
                Tell us about your trip
              </h2>
              <p className="mb-7 mt-4 leading-relaxed text-muted">
                Use the form to prepare your WhatsApp inquiry. Include your passenger count, luggage, travel dates and
                any planned stops so the team can discuss a suitable vehicle.
              </p>
              <Suspense fallback={<div className="h-96 rounded-xl bg-surface" aria-hidden="true" />}>
                <ContactForm />
              </Suspense>
            </Card>
          </div>

          <aside className="rounded-panel bg-navy-deep p-6 text-white sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-green text-navy-deep">
              <Icon name="shield-check" size={24} />
            </span>
            <h3 className="mt-5 font-heading text-xl font-extrabold italic sm:text-2xl">Before you confirm</h3>
            <p className="mt-4 leading-relaxed text-white/85">
              Ask for vehicle availability, pickup arrangements and a complete quote. Check which costs cover fuel,
              tolls, parking, driver accommodation and additional hours. Your booking is confirmed after the team
              agrees the details with you.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
