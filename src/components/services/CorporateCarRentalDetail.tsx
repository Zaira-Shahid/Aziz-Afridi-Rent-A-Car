import { CtaBanner } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { ServiceDetail } from "@/types";
import {
  BlockHead,
  BookingInfo,
  CategoryCards,
  FeatureGrid,
  FormCard,
  InfoSection,
  ProcessSteps,
  StatStrip,
} from "./ServiceBlocks";
import { ServiceBookingForm, type BookingField } from "./ServiceBookingForm";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";
import { Icon } from "@/components/ui/Icon";

type CorporateCarRentalDetailProps = {
  data: ServiceDetail;
};

const bookingFields: BookingField[] = [
  { key: "company", label: "Company Name", placeholder: "Your company" },
  { key: "name", label: "Contact Person", placeholder: "Full name" },
  { key: "email", label: "Business Email", type: "email", placeholder: "name@company.com" },
  { key: "phone", label: "Phone Number", type: "tel", placeholder: "0348 9899030" },
  {
    key: "requirement",
    label: "Vehicle Requirement",
    type: "select",
    options: ["Executive Sedan", "Luxury SUV", "Full Fleet Management", "Monthly Leasing"],
    wide: true,
  },
  {
    key: "duration",
    label: "Duration",
    type: "select",
    options: ["Weekly", "Monthly (1-6 months)", "Long Term (1 Year+)"],
    wide: true,
  },
];

export function CorporateCarRentalDetail({ data }: CorporateCarRentalDetailProps) {
  const { hero, features, fleet, categories, process, booking, testimonials, faqs, included, notes } = data;

  return (
    <>
      <ServiceHero hero={hero} />

      {notes ? <StatStrip block={notes} /> : null}

      <Section tone="surface">
        <BlockHead
          title={features.title}
          description={features.description}
          align="center"
          action={categories ? { href: "#packages", label: "Explore Plans" } : undefined}
        />
        <FeatureGrid items={features.items} variant="rows" />
      </Section>

      {categories ? (
        <Section tone="navy" id="packages">
          <BlockHead title={categories.title} description={categories.description} invert />
          <CategoryCards items={categories.items} invert />
        </Section>
      ) : null}

      <Section tone="white" id="fleet">
        <BlockHead title={fleet.title} description={fleet.description} />
        <ServiceFleetGrid items={fleet.items} columns={3} />
      </Section>

      {process ? (
        <Section tone="surface">
          <BlockHead title={process.title} align="center" />
          <ProcessSteps steps={process.steps} variant="cards" />
        </Section>
      ) : null}

      {included ? <InfoSection block={included} kind="included" tone="white" /> : null}

      {booking ? (
        <Section tone="navy" id="booking">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <BookingInfo booking={booking} invert />
            <FormCard>
              <ServiceBookingForm service={data.name} fields={bookingFields} submitLabel="Request Quote" />
            </FormCard>
          </div>
        </Section>
      ) : null}

      {testimonials ? (
        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
            <div>
              <BlockHead title={testimonials.title} />
              {testimonials.ratingSummary ? (
                <Reveal>
                  <p className="flex items-center gap-2 font-heading text-4xl font-extrabold italic text-green-strong">
                    <Icon name="star" size={32} />
                    {testimonials.ratingSummary.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">{testimonials.ratingSummary.label}</p>
                </Reveal>
              ) : null}
            </div>
            <ServiceTestimonials items={testimonials.items} />
          </div>
        </Section>
      ) : null}

      {faqs ? (
        <Section tone="white">
          <div className="mx-auto max-w-3xl">
            <BlockHead title={faqs.title} align="center" />
            <ServiceFaqAccordion items={faqs.items} />
          </div>
        </Section>
      ) : null}

      <CtaBanner
        title="Ready to streamline corporate travel?"
        description="Set up your corporate account and get priority vehicles with clear monthly reporting."
      />
    </>
  );
}
