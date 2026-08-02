import type { Metadata } from "next";
import { PageHero, CtaBanner } from "@/components/shared";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Book a car or ask about availability with Signature Rent A Car.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Reach out for bookings, quotes, and trip planning support."
        ctaHref=""
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="text-base leading-relaxed text-primary/75">
            Call us at {brand.phone} or email {brand.email}.
          </p>
          <p className="text-base leading-relaxed text-primary/75">
            Share your city, dates, and preferred car — we’ll confirm availability quickly.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={`https://wa.me/${brand.whatsapp}`}
              variant="accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </ButtonLink>
            <ButtonLink href={`mailto:${brand.email}`} variant="primary">
              Email Us
            </ButtonLink>
          </div>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
