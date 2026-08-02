import type { Metadata } from "next";
import { CityServicesContent } from "@/components/city/CityServicesContent";

export const metadata: Metadata = {
  title: "City Services",
  description: "Rent a car in major cities, tourist destinations, and local areas across Pakistan.",
};

export default function CityServicesPage() {
  return <CityServicesContent />;
}
