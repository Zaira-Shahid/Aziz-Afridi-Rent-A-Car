import { CtaBanner } from "@/components/shared";
import { Section } from "@/components/ui/Section";
import type { ServiceDetail } from "@/types";
import { BlockHead, BookingInfo, CoverageTiles, FeatureGrid, FormCard, InfoSection } from "./ServiceBlocks";
import { ServiceBookingForm, type BookingField } from "./ServiceBookingForm";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";

type HotelTransferDetailProps = {
  data: ServiceDetail;
};

const bookingFields: BookingField[] = [
  { key: "hotel", label: "Hotel Name", placeholder: "e.g. Serena Hotel, Marriott" },
  {
    key: "passengers",
    label: "Passengers",
    type: "select",
    options: ["1-2 Person", "3-4 People", "5-7 People (SUV)"],
  },
  { key: "from", label: "Pickup Location", placeholder: "Enter airport or area" },
  { key: "to", label: "Drop-off Location", placeholder: "Enter destination" },
  { key: "date", label: "Date", type: "date" },
  { key: "time", label: "Time", type: "time" },
];

export function HotelTransferDetail({ data }: HotelTransferDetailProps) {
  const { hero, features, coverage, booking, fleet, included, audience, notes } = data;

  return (
    <>
      <ServiceHero hero={hero} flip />

      <Section tone="white">
        <BlockHead title={features.title} description={features.description} />
        <FeatureGrid items={features.items} variant="rows" />
      </Section>

      {included ? <InfoSection block={included} kind="included" tone="surface" /> : null}

      {coverage ? (
        <Section tone="white">
          <BlockHead title={coverage.title} description={coverage.description} align="center" />
          <CoverageTiles cities={coverage.cities} />
        </Section>
      ) : null}

      {audience ? <InfoSection block={audience} kind="cards" tone="surface" /> : null}
      {notes ? <InfoSection block={notes} kind="cards" tone="navy" /> : null}

      {booking ? (
        <Section tone="white" id="booking">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <BookingInfo booking={booking} />
            <FormCard className="border border-line">
              <ServiceBookingForm
                service={data.name}
                fields={bookingFields}
                submitLabel="Calculate & Reserve Now"
              />
            </FormCard>
          </div>
        </Section>
      ) : null}

      <Section tone="surface" id="fleet">
        <BlockHead title={fleet.title} description={fleet.description} />
        <ServiceFleetGrid items={fleet.items} />
      </Section>

      <CtaBanner
        title="Ready to reserve your hotel transfer?"
        description="Book a professional chauffeur and travel in comfort to and from your hotel."
      />
    </>
  );
}
