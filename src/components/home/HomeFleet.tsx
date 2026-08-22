import { CarGridSection } from "@/components/cars/CarGridSection";
import { fleetSections, getCarsBySlugs } from "@/data";

const homeFleetConfig = [
  { slug: "executive-suv", title: "Executive Fleet" },
  { slug: "premium", title: "Premium Fleet" },
  { slug: "luxury", title: "Luxury Fleet" },
  { slug: "suv-hybrid", title: "Hybrid Fleet" },
] as const;

export function HomeFleet() {
  return (
    <>
      {homeFleetConfig.map((config, index) => {
        const section = fleetSections.find((item) => item.slug === config.slug);
        if (!section) return null;

        return (
          <CarGridSection
            key={config.slug}
            title={config.title}
            description={section.description}
            cars={getCarsBySlugs(section.carSlugs.slice(0, 3))}
            viewAllHref={`/categories/${config.slug}`}
            viewAllLabel={`View ${config.title}`}
            showViewAll
            className={index % 2 === 0 ? "bg-white" : "bg-background"}
          />
        );
      })}
    </>
  );
}
