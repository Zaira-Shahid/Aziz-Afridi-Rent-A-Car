import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "Booking Policy",
  description: "Booking, cancellation, and payment policy for Signature Rent A Car.",
};

export default function BookingPolicyPage() {
  return (
    <ContentPage
      title="Booking Policy"
      description="Clear guidelines for reservations, deposits, and cancellations."
      body={[
        "Bookings are confirmed once availability and pricing are agreed with our team.",
        "Cancellation and refund rules will be shared at confirmation and published here in detail.",
      ]}
    />
  );
}
