import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Customer reviews for Signature Rent A Car.",
};

export default function ReviewsPage() {
  return (
    <ContentPage
      title="Reviews"
      description="Trusted by travelers and businesses for reliable car rental service."
      body={[
        "Customer reviews and testimonials will appear here as content is added.",
        "We focus on clean cars, on-time pickups, and clear communication.",
      ]}
    />
  );
}
