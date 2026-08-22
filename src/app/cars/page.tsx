import type { Metadata } from "next";
import { CarGridSection, CarsHero } from "@/components/cars";
import { CtaBanner } from "@/components/shared";
import { brand } from "@/lib/brand";
import { carCategories, carModels } from "@/data";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Cars",
  description:
    "Browse economy, sedan, SUV, luxury, and Hiace rental cars. Transparent daily and monthly rates with Signature Rent A Car.",
  path: "/cars",
  keywords: ["car fleet Pakistan", "SUV rental", "luxury car hire"],
});


const heroImage =
  carModels.find((car) => car.slug === "mercedes-s500")?.image ??
  carModels[0]?.image ??
  "/images/s500-white.png";

export default function CarsPage() {
  return (
    <>
      <CarsHero
        badge="Signature Fleet"
        title="Our"
        accent="Cars"
        description="Explore economy to luxury — sedans, SUVs, executive rides, and group travel vehicles for every journey across Pakistan."
        image={heroImage}
        imageAlt="Signature Rent A Car fleet"
        primaryCta={{ label: "Browse All Models", href: "#all-models" }}
        secondaryCta={{ label: "WhatsApp Booking", href: `https://wa.me/${brand.whatsapp}` }}
        stats={[
          { value: `${carModels.length}+`, label: "Models" },
          { value: `${carCategories.length}`, label: "Categories" },
          { value: "Daily", label: "Weekly & Monthly" },
          { value: "24/7", label: "Support" },
        ]}
      />
      <div id="all-models">
        <CarGridSection
          title="All models"
          description="Every car in our fleet — named and priced for daily or monthly rental."
          cars={carModels}
          showViewAll={false}
          className="bg-white"
        />
      </div>
      <CtaBanner />
    </>
  );
}
