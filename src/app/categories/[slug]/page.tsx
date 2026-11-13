import { carCategories } from "@/data";

export function generateStaticParams() {
  return carCategories.map((category) => ({ slug: category.slug }));
}

export default function Page() {
  return null;
}
