import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: "Contact Aziz Afridi Rent A Car for vehicle availability, rental quotes and trip planning.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero title="Let's plan your journey" description="Share your dates, pickup location and preferred vehicle to request a quote from Aziz Afridi Rent A Car." ctaHref="#booking-inquiry" ctaLabel="Send an inquiry" />
      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div id="booking-inquiry" className="scroll-mt-28">
            <h2 className="text-3xl font-semibold">Tell us about your trip</h2>
            <p className="mb-7 mt-4 leading-relaxed text-muted">Use the form to prepare your WhatsApp inquiry. Include your passenger count, luggage, travel dates and any planned stops so the team can discuss a suitable vehicle.</p>
            <ContactForm />
          </div>
          <div className="space-y-7">
            <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
              <Image src="/images/contact-hero-v2.webp" alt="Chauffeur-driven travel in Islamabad" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <h2 className="text-2xl font-semibold">Contact the booking team</h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`tel:${brand.phone}`}>Call {formatPhoneDisplay()}</ButtonLink>
              <ButtonLink href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" variant="accent">WhatsApp</ButtonLink>
            </div>
            <p className="text-muted">For written inquiries, email <a href={`mailto:${brand.email}`} className="font-semibold underline">{brand.email}</a>.</p>
            <div className="rounded-2xl bg-surface p-6">
              <h3 className="text-lg font-semibold">Before you confirm</h3>
              <p className="mt-3 leading-relaxed text-muted">Ask for vehicle availability, pickup arrangements and a complete quote. Check which costs cover fuel, tolls, parking, driver accommodation and additional hours. Your booking is confirmed after the team agrees the details with you.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
