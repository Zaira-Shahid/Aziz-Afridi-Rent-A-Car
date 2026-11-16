import type { Metadata } from "next";
import { PageHero, CtaBanner } from "@/components/shared";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
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
      <PageHero
        title="Your journey matters to us"
        highlight="matters"
        description="Tell Aziz Afridi Rent A Car about your recent trip. Your feedback helps the team understand what worked well and where the service can improve."
        ctaLabel="Contact the team"
      />

      {/* Feedback: one big card with a quote icon and the WhatsApp button */}
      <Section tone="white">
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-panel rounded-tr-[5rem] border border-line bg-surface p-7 shadow-soft sm:p-12">
            <Icon name="quote" size={56} className="absolute right-6 top-6 text-green/30 sm:right-10 sm:top-8" />
            <h2 className="relative max-w-xl font-heading text-[1.75rem] font-extrabold italic leading-tight text-navy-deep sm:text-3xl lg:text-4xl">
              Share your rental experience
            </h2>
            <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Include your travel date, vehicle and booking reference if available. Describe your experience with booking, pickup arrangements, vehicle comfort and driver service.</p>
            <p className="relative mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">If something needs attention, explain what happened and how you would like the team to help. Send booking details directly to the team and avoid sharing identity documents or payment information in a public review.</p>
            <div className="relative mt-8">
              <ButtonLink href={feedbackUrl} target="_blank" rel="noopener noreferrer" variant="green" pill size="lg">
                <Icon name="whatsapp" size={20} />
                Send trip feedback
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* First booking: navy panel */}
      <Section tone="navy">
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <h2 className="font-heading text-[1.75rem] font-extrabold italic leading-tight sm:text-3xl lg:text-4xl">
                Planning your first booking?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">Browse vehicle details, compare rental options and read the booking guidance before arranging your trip. Ask the team to confirm availability and the complete quote for your dates.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/cars" variant="green" pill size="lg">
                Explore the fleet
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
              <ButtonLink
                href="/faq"
                variant="outline"
                pill
                size="lg"
                className="border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep"
              >
                Read booking FAQs
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBanner />
    </>
  );
}
