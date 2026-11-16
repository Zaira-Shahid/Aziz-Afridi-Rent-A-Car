import { CtaBanner } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import type { ServiceDetail } from "@/types";
import { BlockHead, BookingInfo, CategoryCards, FeatureGrid, FormCard, InfoSection } from "./ServiceBlocks";
import { ServiceBookingForm, type BookingField } from "./ServiceBookingForm";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";

type WeddingCarRentalDetailProps = {
  data: ServiceDetail;
};

export function WeddingCarRentalDetail({ data }: WeddingCarRentalDetailProps) {
  const { hero, features, fleet, categories, booking, included, audience, notes } = data;

  const bookingFields: BookingField[] = [
    { key: "name", label: "Full Name", placeholder: "John Doe" },
    { key: "date", label: "Wedding Date", type: "date" },
    { key: "venue", label: "Venue Address", placeholder: "Enter venue location", wide: true },
    {
      key: "vehicle",
      label: "Select Your Vehicle",
      type: "select",
      options: [...fleet.items.map((item) => item.name), "Other - Bespoke Request"],
      wide: true,
    },
  ];

  return (
    <>
      <ServiceHero hero={hero} />

      <Section tone="white">
        <BlockHead title={features.title} description={features.description} align="center" />
        <FeatureGrid items={features.items} />
      </Section>

      <Section tone="surface" id="fleet">
        <BlockHead title={fleet.title} description={fleet.description} />
        <ServiceFleetGrid items={fleet.items} columns={3} />
      </Section>

      {categories ? (
        <Section tone="white">
          <BlockHead title={categories.title} description={categories.description} align="center" />
          <CategoryCards items={categories.items} />
        </Section>
      ) : null}

      {included ? <InfoSection block={included} kind="included" tone="surface" /> : null}
      {audience ? <InfoSection block={audience} kind="cards" tone="white" /> : null}
      {notes ? <InfoSection block={notes} kind="cards" tone="navy" /> : null}

      {booking ? (
        <Section tone="surface" id="booking">
          <div className="grid overflow-hidden rounded-panel shadow-lift lg:grid-cols-2">
            <div className="bg-navy-deep p-7 text-white sm:p-10 lg:p-12">
              <BookingInfo booking={booking} invert />
            </div>
            <div className="bg-white p-7 sm:p-10 lg:p-12">
              <FormCard className="p-0 shadow-none sm:p-0">
                <ServiceBookingForm
                  service={data.name}
                  fields={bookingFields}
                  checks={{
                    key: "decoration",
                    label: "Decoration Preferences",
                    options: ["Fresh Flowers", "Silk Ribbons", "Custom Signs"],
                  }}
                  submitLabel="Check Availability"
                />
              </FormCard>
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBanner
        title="Ready to book your wedding car?"
        description="Reserve a decorated luxury vehicle for the most memorable day of your life."
      />
    </>
  );
}
