import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Signature Rent A Car bookings and rentals.",
};

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms & Conditions"
      description="Please review our rental terms before booking."
      body={[
        "By booking with Signature Rent A Car, you agree to the rental terms, payment conditions, and vehicle usage rules shared at confirmation.",
        "Detailed legal terms will be finalized and published here before public launch.",
      ]}
    />
  );
}
