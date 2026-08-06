import { CarGridSection } from "@/components/cars/CarGridSection";
import { getCarsBySlugs } from "@/data";

const homeFleetSections = [
  {
    title: "Economy Fleet",
    description: "Affordable cars for daily city travel and short trips.",
    slugs: ["suzuki-alto", "toyota-yaris", "honda-city"],
    viewAllHref: "/categories/economy",
  },
  {
    title: "Standard Fleet",
    description: "Comfortable sedans for families, business, and everyday use.",
    slugs: ["toyota-corolla", "honda-civic-2022", "toyota-corolla-grande"],
    viewAllHref: "/categories/standard",
  },
  {
    title: "Hybrid Fleet",
    description: "Modern hybrid SUVs and sedans for efficient long-distance travel.",
    slugs: ["kia-sportage", "hyundai-tucson", "hyundai-elantra"],
    viewAllHref: "/categories/suv-hybrid",
  },
  {
    title: "Executive Fleet",
    description: "Powerful SUVs for VIP travel, official visits, and premium tours.",
    slugs: ["toyota-land-cruiser-v8", "toyota-revo", "toyota-fortuner"],
    viewAllHref: "/categories/executive-suv",
  },
] as const;

export function HomeFleet() {
  return (
    <>
      {homeFleetSections.map((section, index) => (
        <CarGridSection
          key={section.title}
          title={section.title}
          description={section.description}
          cars={getCarsBySlugs([...section.slugs])}
          viewAllHref={section.viewAllHref}
          viewAllLabel={`View ${section.title}`}
          showViewAll
          className={index % 2 === 0 ? "bg-white" : "bg-background"}
        />
      ))}
    </>
  );
}
