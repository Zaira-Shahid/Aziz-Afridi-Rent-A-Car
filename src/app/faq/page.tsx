import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about car rental with Signature Rent A Car.",
};

export default function FaqPage() {
  return (
    <ContentPage
      title="FAQ"
      description="Quick answers about booking, payments, drivers, and coverage areas."
      body={[
        "How do I book? Contact us with your city, dates, and preferred vehicle to confirm availability.",
        "Do you offer chauffeur service? Yes — self-drive and with-driver options are available.",
        "Which cities do you cover? We serve major cities, tourist destinations, and local Islamabad/Rawalpindi areas.",
      ]}
    />
  );
}
