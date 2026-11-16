import { CtaBanner } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import type { ServiceDetail } from "@/types";
import { BlockHead, FeatureGrid, InfoSection, ProcessSteps, StoryBlock } from "./ServiceBlocks";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";

type ExecutiveCarRentalDetailProps = {
  data: ServiceDetail;
};

export function ExecutiveCarRentalDetail({ data }: ExecutiveCarRentalDetailProps) {
  const { hero, fleet, features, story, process, testimonials, included, audience, notes } = data;

  return (
    <>
      <ServiceHero hero={hero} />

      <Section tone="white" id="fleet">
        <BlockHead title={fleet.title} description={fleet.description} />
        <ServiceFleetGrid items={fleet.items} columns={3} />
      </Section>

      <Section tone="navy">
        <BlockHead title={features.title} description={features.description} invert />
        <FeatureGrid items={features.items} variant="dark" />
      </Section>

      {included ? <InfoSection block={included} kind="included" tone="surface" /> : null}
      {audience ? <InfoSection block={audience} kind="cards" tone="white" /> : null}
      {story ? <StoryBlock story={story} /> : null}

      {process ? (
        <Section tone="surface">
          <BlockHead title={process.title} align="center" />
          <ProcessSteps steps={process.steps} variant="timeline" />
        </Section>
      ) : null}

      {notes ? <InfoSection block={notes} kind="cards" tone="navy" columns={4} /> : null}

      {testimonials ? (
        <Section tone="white">
          <BlockHead title={testimonials.title} align="center" />
          <ServiceTestimonials items={testimonials.items} />
        </Section>
      ) : null}

      <CtaBanner
        title="Ready to travel like an executive?"
        description="Reserve a chauffeur-driven vehicle for your next meeting, transfer, or corporate event."
      />
    </>
  );
}
