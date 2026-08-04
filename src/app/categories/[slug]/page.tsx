import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarGridSection } from "@/components/cars";
import { CtaBanner, PageHero } from "@/components/shared";
import { carCategories, getCarsForCategory } from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return carCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = carCategories.find((item) => item.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description:
      category.description ??
      `Browse ${category.name.toLowerCase()} available for rent with Signature Rent A Car.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = carCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const models = getCarsForCategory(category.slug);

  return (
    <>
      <PageHero
        title={category.name}
        description={
          category.description ??
          `Explore our ${category.name.toLowerCase()} available for city and outstation travel.`
        }
      />
      <CarGridSection
        title="Available models"
        description={`Book any ${category.name.toLowerCase()} vehicle via WhatsApp, call, or inquiry.`}
        cars={models}
        viewAllHref="/cars"
        viewAllLabel="View All Cars"
        className="bg-white"
      />
      <CtaBanner />
    </>
  );
}
