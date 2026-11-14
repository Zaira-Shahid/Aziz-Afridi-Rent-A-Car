import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions",
  description: "Terms and conditions for Aziz Afridi Rent A Car bookings and rentals.",
  path: "/terms",
});

export default function Page() {
  return null;
}
