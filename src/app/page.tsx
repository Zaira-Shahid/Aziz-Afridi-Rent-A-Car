import type { Metadata } from "next";
import {
  BrandStrip,
  HomeBlog,
  HomeCta,
  HomeDestinations,
  HomeFleet,
  HomeHero,
  HomeReviews,
  HomeServices,
  HowItWorks,
  PromoBanner,
  WhyChooseUs,
} from "@/components/home";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Premium Car Rental with Driver in Pakistan",
  description:
    "Book chauffeur-driven cars with Signature Rent A Car. Economy, sedan, SUV, and luxury fleet across Islamabad, Rawalpindi, Lahore, Karachi, and northern destinations.",
  path: "/",
  keywords: ["car hire Pakistan", "rent a car Islamabad with driver", "monthly car rental"],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandStrip />
      <HomeFleet />
      <PromoBanner />
      <HowItWorks />
      <WhyChooseUs />
      <HomeServices />
      <HomeDestinations />
      <HomeReviews />
      <HomeBlog />
      <HomeCta />
    </>
  );
}
