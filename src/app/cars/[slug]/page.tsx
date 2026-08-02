import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared";
import { carModels } from "@/data";

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

  return {
    title: `${car.name} Rental`,
    description: `Rent a ${car.name} with Signature Rent A Car for city and outstation trips.`,
  };
}

export default async function CarModelPage({ params }: Props) {
  const { slug } = await params;
  const car = carModels.find((item) => item.slug === slug);
  if (!car) notFound();

  return (
    <ContentPage
      title={`${car.name} Rental`}
      description={`Book a ${car.name} for daily, weekly, or monthly hire.`}
      body={[
        `The ${car.name} is a popular choice for comfortable travel with Signature Rent A Car.`,
        "Contact us to check availability, pricing, and chauffeur options for your dates.",
      ]}
    />
  );
}
