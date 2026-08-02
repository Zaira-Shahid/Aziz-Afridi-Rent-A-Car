import type { Metadata } from "next";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { services } from "@/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Airport transfers, corporate, daily, weekly, monthly, and wedding car rental.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Flexible rental plans and transfer services tailored to your schedule."
      />
      <LinkGridSection
        title="All services"
        items={services.map((item) => ({
          href: `/services/${item.slug}`,
          title: item.name,
        }))}
      />
      <CtaBanner />
    </>
  );
}
