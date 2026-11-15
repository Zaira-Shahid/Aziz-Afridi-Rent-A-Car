import type { Metadata } from "next";
import { PageHero, CtaBanner } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Customer Feedback",
  description: "Share your Aziz Afridi Rent A Car experience or contact the team about a recent booking.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const feedbackUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Hello Aziz Afridi Rent A Car, I would like to share feedback about my trip.")}`;
  return (
    <>
      <PageHero title="Your journey matters to us" description="Tell Aziz Afridi Rent A Car about your recent trip. Your feedback helps the team understand what worked well and where the service can improve." ctaLabel="Contact the team" />
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold">Share your rental experience</h2>
          <p className="mt-5 leading-relaxed text-muted">Include your travel date, vehicle and booking reference if available. Describe your experience with booking, pickup arrangements, vehicle comfort and driver service.</p>
          <p className="mt-4 leading-relaxed text-muted">If something needs attention, explain what happened and how you would like the team to help. Send booking details directly to the team and avoid sharing identity documents or payment information in a public review.</p>
          <div className="mt-8">
            <ButtonLink href={feedbackUrl} target="_blank" rel="noopener noreferrer" variant="accent">Send trip feedback</ButtonLink>
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-semibold">Planning your first booking?</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">Browse vehicle details, compare rental options and read the booking guidance before arranging your trip. Ask the team to confirm availability and the complete quote for your dates.</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <ButtonLink href="/cars">Explore the fleet</ButtonLink>
          <ButtonLink href="/faq" variant="outline">Read booking FAQs</ButtonLink>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
