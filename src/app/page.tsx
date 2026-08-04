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
