import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared";
import {
  DailyCarRentalDetail,
  ExecutiveCarRentalDetail,
  HotelTransferDetail,
  WeddingCarRentalDetail,
} from "@/components/services";
import { serviceDetails, services } from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

const detailComponents = {
  "hotel-transfer": HotelTransferDetail,
  "executive-car-rental": ExecutiveCarRentalDetail,
  "wedding-car-rental": WeddingCarRentalDetail,
  "daily-car-rental": DailyCarRentalDetail,
} as const;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service Not Found" };

  const detail = serviceDetails[slug];

  return {
    title: service.name,
    description: detail?.metaDescription ?? `${service.name} with Signature Rent A Car — professional and on-time service.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const DetailComponent = detailComponents[slug as keyof typeof detailComponents];
  const detail = serviceDetails[slug];

  if (DetailComponent && detail) {
    return <DetailComponent data={detail} />;
  }

  return (
    <ContentPage
      title={service.name}
      description={`Book ${service.name.toLowerCase()} with Signature Rent A Car.`}
      body={[
        `Our ${service.name.toLowerCase()} service is designed for comfort, reliability, and clear pricing.`,
        "Contact us with your schedule and preferred vehicle to confirm availability.",
      ]}
    />
  );
}
