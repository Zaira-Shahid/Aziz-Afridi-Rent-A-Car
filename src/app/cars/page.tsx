import type { Metadata } from "next";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { carCategories, carModels } from "@/data";

export const metadata: Metadata = {
  title: "Our Cars",
  description: "Browse economy, sedan, SUV, luxury, and Hiace rental options.",
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
      <LinkGridSection
        title="All models"
        items={carModels.map((item) => ({
          href: `/cars/${item.slug}`,
          title: `${item.name} Rental`,
        }))}
      />
      <CtaBanner />
    </>
  );
}
