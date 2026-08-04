import type { Metadata } from "next";
import {
  BrandStrip,
  HomeBlog,
  HomeCta,
  HomeDestinations,
  HomeFaq,
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
  title: "Premium Car Rental in Pakistan",
  description:
    "Book self-drive and chauffeur cars with Signature Rent A Car. Economy, sedan, SUV, and luxury fleet across Islamabad, Rawalpindi, Lahore, Karachi, and northern destinations.",
  path: "/",
  keywords: ["car hire Pakistan", "rent a car Islamabad", "monthly car rental"],
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
      <HomeFaq />
      <HomeBlog />
      <HomeCta />
    </>
  );
}
