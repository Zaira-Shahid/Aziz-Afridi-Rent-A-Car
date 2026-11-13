import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Airport transfers, corporate, daily, weekly, monthly, executive, and wedding car rental services across Pakistan.",
  path: "/services",
  keywords: ["airport transfer", "corporate car rental", "wedding car rental"],
});

export default function Page() {
  return null;
}
