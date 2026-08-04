import { CarSliderSection } from "@/components/cars/CarSliderSection";
import { carModels } from "@/data";

export function HomeFleet() {
  return (
    <CarSliderSection
      cars={carModels}
      viewAllHref="/cars"
      viewAllLabel="View All Cars"
    />
  );
}
