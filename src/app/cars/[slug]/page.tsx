import { carModels } from "@/data";

export function generateStaticParams() {
  return carModels.map((car) => ({ slug: car.slug }));
}

export default function Page() {
  return null;
}
