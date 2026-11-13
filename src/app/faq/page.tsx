import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, payments, drivers, and airport pickups with Signature Rent A Car.",
  path: "/faq",
  keywords: ["car rental FAQ", "booking questions"],
});

export default function Page() {
  return null;
}
