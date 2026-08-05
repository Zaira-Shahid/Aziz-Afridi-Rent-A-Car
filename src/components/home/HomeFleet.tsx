import { CarSliderSection } from "@/components/cars/CarSliderSection";
import { carModels } from "@/data";

export function HomeFleet() {
  const secondRow = carModels.filter((car) => car.sale || car.family || car.featured).slice(0, 12);

  return (
    <>
      <CarSliderSection
        cars={carModels}
        viewAllHref="/cars"
        viewAllLabel="View All Cars"
      />
      <CarSliderSection
        cars={secondRow.length >= 3 ? secondRow : carModels.slice(0, 10)}
        viewAllHref="/cars"
        viewAllLabel="Browse More Cars"
        className="bg-background !pt-4 sm:!pt-6"
      />
    </>
  );
}
