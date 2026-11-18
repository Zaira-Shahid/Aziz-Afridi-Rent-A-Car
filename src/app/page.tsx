import type { Metadata } from "next";
import {
  BrandStrip,
  DiscoverDrive,
  ExploreFleet,
  FeatureStrip,
  HomeBlog,
  FounderStrip,
  HomeCta,
  HomeDestinations,
  HomeFaq,
  HomeHero,
  HomeReviews,
  HomeServices,
  HowItWorks,
  PromoBanners,
} from "@/components/home";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Premium Car Rental with Driver in Pakistan",
  description:
    "Book chauffeur-driven cars with Aziz Afridi Rent A Car. Economy, sedan, SUV, and luxury fleet across Islamabad, Rawalpindi, Lahore, Karachi, and northern destinations.",
  path: "/",
  keywords: ["car hire Pakistan", "rent a car Islamabad with driver", "monthly car rental"],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeatureStrip />
      <ExploreFleet />
      <DiscoverDrive />
      <BrandStrip />
      <HomeServices />
      <HowItWorks />
      <HomeDestinations />
      <PromoBanners />
      <FounderStrip />
      <HomeReviews />
      <HomeFaq />
      <HomeBlog />
      <HomeCta />
    </>
  );
}
