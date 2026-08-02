import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Signature Rent A Car and our commitment to premium car rental service.",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About Us"
      description="Signature Rent A Car delivers reliable, premium rental experiences across Pakistan."
      body={[
        "We provide well-maintained vehicles for daily, weekly, and monthly hire with transparent pricing and professional support.",
        "From city transfers to tourist destinations, our goal is a smooth booking experience you can trust.",
      ]}
    />
  );
}
