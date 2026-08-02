import { CarGridSection } from "@/components/cars";
import {
  BrandStrip,
  HomeBlog,
  HomeFaq,
  HomeHero,
  HowItWorks,
  PromoBanner,
  WhyChooseUs,
} from "@/components/home";
import { CtaBanner } from "@/components/shared";
import { carModels } from "@/data";

export default function HomePage() {
  const signatures = carModels.filter((car) => car.featured).slice(0, 3);
  const flashSale = carModels.filter((car) => car.sale).slice(0, 3);
  const familyCars = carModels.filter((car) => car.family).slice(0, 3);

  return (
    <>
      <HomeHero />
      <BrandStrip />
      <CarGridSection
        title="Signature Fleet"
        description="Our most requested cars for city travel and business trips."
        cars={signatures}
        viewAllHref="/cars"
        viewAllLabel="View All Cars"
      />
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
      <HowItWorks />
      <WhyChooseUs />
      <HomeFaq />
      <HomeBlog />
      <CtaBanner
        title="Ready to book your ride?"
        description="Tell us your city and dates — we’ll confirm the best available car."
      />
    </>
  );
}
