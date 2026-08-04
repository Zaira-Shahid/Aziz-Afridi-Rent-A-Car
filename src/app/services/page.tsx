import type { Metadata } from "next";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { services } from "@/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Airport transfers, corporate, daily, weekly, monthly, executive, and wedding car rental services across Pakistan.",
  path: "/services",
  keywords: ["airport transfer", "corporate car rental", "wedding car rental"],
});


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
