import { CtaBanner } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import type { ServiceDetail } from "@/types";
import {
  BlockHead,
  CoverageChips,
  FeatureGrid,
  FormCard,
  HelpCard,
  InfoSection,
  ProcessSteps,
} from "./ServiceBlocks";
import { ServiceBookingForm, type BookingField } from "./ServiceBookingForm";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { HeroContactChips, ServiceHero } from "./ServiceHero";

type AirportPickDropDetailProps = {
  data: ServiceDetail;
};

const bookingFields: BookingField[] = [
  {
    key: "airport",
    label: "Pickup Airport",
    type: "select",
    options: ["Islamabad Intl (ISB)", "Lahore Intl (LHE)", "Karachi Intl (KHI)", "Sialkot Intl (SKT)"],
    wide: true,
  },
  { key: "to", label: "Drop Location", placeholder: "Hotel / address", wide: true },
  { key: "date", label: "Date", type: "date" },
  { key: "time", label: "Time", type: "time" },
  {
    key: "vehicle",
    label: "Vehicle",
    type: "select",
    options: ["Executive Sedan", "Luxury SUV", "Aziz Afridi Fleet", "Van / Hiace"],
  },
  { key: "passengers", label: "Passengers", type: "select", options: ["1–3", "4–5", "6–10", "10+"] },
];

export function AirportPickDropDetail({ data }: AirportPickDropDetailProps) {
  const { hero, features, coverage, fleet, process, faqs, included, audience, notes } = data;

  return (
    <>
      <ServiceHero
        hero={hero}
        extra={
          <HeroContactChips
            phoneHref={`tel:${brand.phone}`}
            phoneLabel={formatPhoneDisplay()}
            whatsappHref={`https://wa.me/${brand.whatsapp}`}
          />
        }
        aside={
          <div id="book">
            <FormCard title="Book Your Transfer">
              <ServiceBookingForm
                service={data.name}
                fields={bookingFields}
                submitLabel="Check Availability"
              />
            </FormCard>
          </div>
        }
      />

      {coverage ? <CoverageChips title={coverage.title} description={coverage.description} cities={coverage.cities} /> : null}

      <Section tone="surface">
        <BlockHead title={features.title} description={features.description} />
        <FeatureGrid items={features.items} />
      </Section>

      <Section tone="white" id="fleet">
        <BlockHead
          title={fleet.title}
          description={fleet.description}
          action={{ href: "/cars", label: "View Full Fleet" }}
        />
        <ServiceFleetGrid items={fleet.items} />
      </Section>

      {process ? (
        <Section tone="surface">
          <BlockHead title={process.title} align="center" />
          <ProcessSteps steps={process.steps} variant="timeline" />
        </Section>
      ) : null}

      {included ? <InfoSection block={included} kind="included" tone="navy" /> : null}
      {audience ? <InfoSection block={audience} kind="cards" tone="white" /> : null}
      {notes ? <InfoSection block={notes} kind="cards" tone="surface" /> : null}

      {faqs ? (
        <Section tone="white">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <BlockHead title={faqs.title} />
              <ServiceFaqAccordion items={faqs.items} />
            </div>
            <div className="lg:pt-24">
              <HelpCard text="Our concierge team is available 24/7 to assist with your airport transfer." />
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBanner
        title="Landing soon? Book your airport transfer now."
        description="Flight monitoring, meet & greet, and doorstep drop-off across major Pakistani airports."
      />
    </>
  );
}
