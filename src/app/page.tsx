import { CarGridSection } from "@/components/cars";
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
import { carModels } from "@/data";

export default function HomePage() {
  const featured = carModels.filter((car) => car.featured).slice(0, 3);
  const flashSale = carModels.filter((car) => car.sale).slice(0, 3);
  const familyCars = carModels.filter((car) => car.family).slice(0, 3);

  return (
    <>
      <HomeHero />
      <BrandStrip />
      <HowItWorks />
      <HomeFleet cars={featured} />
      <PromoBanner />
      <CarGridSection
        title="Flash Sale"
        description="Limited deals on popular economy and SUV options."
        cars={flashSale}
        viewAllHref="/cars"
        viewAllLabel="View Sale Cars"
        className="bg-white"
      />
      <CarGridSection
        title="Family Cars"
        description="Spacious and comfortable options for group and family travel."
        cars={familyCars}
        viewAllHref="/categories/suv"
        viewAllLabel="Browse Family Options"
      />
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
