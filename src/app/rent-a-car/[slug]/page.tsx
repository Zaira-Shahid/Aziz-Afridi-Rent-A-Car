import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared";
import { cities } from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) return { title: "City Not Found" };

  return {
    title: `Rent a Car ${city.name}`,
    description: `Rent a car in ${city.name} with Signature Rent A Car. Reliable vehicles for local and outstation travel.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();

  return (
    <ContentPage
      title={`Rent a Car ${city.name}`}
      description={`Premium car rental service in ${city.name} for daily trips, airport transfers, and tourist travel.`}
      body={[
        `Looking for rent a car in ${city.name}? Signature Rent A Car offers clean, reliable vehicles with flexible booking options.`,
        "Choose economy, sedan, SUV, luxury, or Hiace options based on your trip needs.",
      ]}
    />
  );
}
