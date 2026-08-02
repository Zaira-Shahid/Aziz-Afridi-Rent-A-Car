import type { Metadata } from "next";
import { ContentPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Signature Rent A Car collects and protects your information.",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      description="We respect your privacy and handle personal data responsibly."
      body={[
        "Contact and booking details are used only to process rentals and provide customer support.",
        "A full privacy policy will be published here before public launch.",
      ]}
    />
  );
}
