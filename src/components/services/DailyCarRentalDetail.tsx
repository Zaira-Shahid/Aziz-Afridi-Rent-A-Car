import { BookingBar } from "@/components/contact/BookingBar";
import { CtaBanner } from "@/components/shared";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { ServiceDetail } from "@/types";
import { BlockHead, FeatureGrid, InfoSection, PackageCards } from "./ServiceBlocks";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";

type DailyCarRentalDetailProps = {
  data: ServiceDetail;
};

/** Used for both the Daily and the Monthly rental pages. */
export function DailyCarRentalDetail({ data }: DailyCarRentalDetailProps) {
  const { hero, features, fleet, packages, testimonials, faqs, included, audience } = data;

  return (
    <>
      <ServiceHero hero={hero} aside={<div id="fleet-search"><BookingBar /></div>} />

      <Section tone="white">
        <BlockHead title={features.title} description={features.description} align="center" />
        <FeatureGrid items={features.items} />
      </Section>

      <Section tone="surface" id="fleet">
        <BlockHead title={fleet.title} description={fleet.description} />
        <ServiceFleetGrid items={fleet.items} columns={3} />
      </Section>

      {included ? <InfoSection block={included} kind="included" tone="white" /> : null}

      {packages ? (
        <Section tone="navy" id="packages">
          <BlockHead title={packages.title} description={packages.description} align="center" invert />
          <PackageCards packages={packages.items} service={data.name} />
        </Section>
      ) : null}

      {audience ? <InfoSection block={audience} kind="cards" tone="surface" /> : null}

      {testimonials ? (
        <Section tone="white">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
            <div>
              <BlockHead title={testimonials.title} />
              {testimonials.ratingSummary ? (
                <Reveal className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-strong/10 text-green-strong">
                    <Icon name="star" size={28} />
                  </span>
                  <div>
                    <span className="block font-semibold text-navy-deep">{testimonials.ratingSummary.value}</span>
                    <span className="text-sm text-muted">{testimonials.ratingSummary.label}</span>
                  </div>
                </Reveal>
              ) : null}
            </div>
            <ServiceTestimonials items={testimonials.items} />
          </div>
        </Section>
      ) : null}

      {faqs ? (
        <Section tone="surface">
          <div className="mx-auto max-w-3xl">
            <BlockHead title={faqs.title} align="center" />
            <ServiceFaqAccordion items={faqs.items} />
          </div>
        </Section>
      ) : null}

      <CtaBanner
        title={`Ready to book ${data.name.toLowerCase()}?`}
        description="Pick your vehicle and get clear daily rates with doorstep delivery across major cities."
      />
    </>
  );
}
