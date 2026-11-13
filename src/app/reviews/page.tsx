import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reviews",
  description: "Customer reviews and testimonials for Signature Rent A Car across Pakistan.",
  path: "/reviews",
  keywords: ["car rental reviews", "Signature Rent A Car testimonials", "Google reviews"],
});

export default function Page() {
  return null;
}
