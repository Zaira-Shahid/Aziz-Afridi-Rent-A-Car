import { cities } from "@/data";

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export default function Page() {
  return null;
}
