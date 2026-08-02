import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { carCategories, carModels } from "@/data";

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
    description: `Browse ${category.name.toLowerCase()} available for rent with Signature Rent A Car.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = carCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const models = carModels.filter((car) => car.category === category.slug);

  return (
    <>
      <PageHero
        title={category.name}
        description={`Explore our ${category.name.toLowerCase()} available for city and outstation travel.`}
      />
      <LinkGridSection
        title="Available models"
        items={
          models.length > 0
            ? models.map((item) => ({
                href: `/cars/${item.slug}`,
                title: `${item.name} Rental`,
              }))
            : carModels.slice(0, 4).map((item) => ({
                href: `/cars/${item.slug}`,
                title: `${item.name} Rental`,
              }))
        }
      />
      <CtaBanner />
    </>
  );
}
