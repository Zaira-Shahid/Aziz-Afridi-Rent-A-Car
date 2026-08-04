import type { Metadata } from "next";
import { CarGridSection } from "@/components/cars";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { carCategories, carModels } from "@/data";

export const metadata: Metadata = {
  title: "Our Cars",
  description: "Browse economy, standard, premium, luxury, SUV, and group travel rental options.",
};

export default function CarsPage() {
  return (
    <>
      <PageHero
        title="Our Cars"
        description="Explore our fleet by category or choose a specific model for your trip."
      />
      <LinkGridSection
        title="Browse by category"
        items={carCategories.map((item) => ({
          href: `/categories/${item.slug}`,
          title: item.name,
        }))}
      />
      <CarGridSection
        title="All models"
        description="Every car in our fleet — named and priced for daily or monthly rental."
        cars={carModels}
        showViewAll={false}
        className="bg-white"
      />
      <CtaBanner />
    </>
  );
}
