import type { Metadata } from "next";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { cities } from "@/data";

export const metadata: Metadata = {
  title: "City Services",
  description: "Rent a car in major cities, tourist destinations, and local areas.",
};

export default function CityServicesPage() {
  return (
    <>
      <PageHero
        title="City Services"
        description="Coverage across Pakistan’s key cities and travel destinations."
      />
      <LinkGridSection
        title="Primary cities"
        items={cities
          .filter((city) => city.type === "primary")
          .map((item) => ({
            href: `/rent-a-car/${item.slug}`,
            title: `Rent a Car ${item.name}`,
          }))}
      />
      <LinkGridSection
        title="Tourist destinations"
        items={cities
          .filter((city) => city.type === "tourist")
          .map((item) => ({
            href: `/rent-a-car/${item.slug}`,
            title: `Rent a Car ${item.name}`,
          }))}
      />
      <LinkGridSection
        title="Islamabad & Rawalpindi local areas"
        items={cities
          .filter((city) => city.type === "local")
          .map((item) => ({
            href: `/rent-a-car/${item.slug}`,
            title: `Rent a Car ${item.name}`,
          }))}
      />
      <CtaBanner />
    </>
  );
}
