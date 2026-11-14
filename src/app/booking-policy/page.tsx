import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Booking Policy",
  description: "Booking, cancellation, and payment policy for Aziz Afridi Rent A Car.",
  path: "/booking-policy",
});

export default function Page() {
  return null;
}
