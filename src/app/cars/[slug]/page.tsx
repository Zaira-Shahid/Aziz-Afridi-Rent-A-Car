import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetailBody } from "@/components/cars";
import { CtaBanner } from "@/components/shared";
import { formatPrice } from "@/lib/brand";
import { carCategories, carModels } from "@/data";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return carModels.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = carModels.find((item) => item.slug === slug);
  if (!car) return { title: "Car Not Found" };

  return pageMeta({
    title: `${car.name} Rental`,
    description: `Rent a ${car.name} (${car.brand}) with Aziz Afridi Rent A Car. From ${formatPrice(car.priceDay)}/day. Professional chauffeur included.`,
    path: `/cars/${car.slug}`,
    keywords: [`${car.name} rental`, `${car.brand} rent a car`, `${car.category} car rental`],
    image: car.image,
  });
}

export default async function CarModelPage({ params }: Props) {
  const { slug } = await params;
  const car = carModels.find((item) => item.slug === slug);
  if (!car) notFound();

  const category = carCategories.find((item) => item.slug === car.category);
  const related = carModels
    .filter((item) => item.category === car.category && item.slug !== car.slug)
    .slice(0, 3);

  return (
    <>
      <CarDetailBody
        car={car}
        categoryName={category?.name ?? car.category}
        related={related}
      />

      <CtaBanner
        title={`Ready to book the ${car.name}?`}
        description="Confirm dates on WhatsApp or call — we reply quickly with availability."
      />
    </>
  );
}
