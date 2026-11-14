import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Reviews",
  description: "Customer reviews and testimonials for Aziz Afridi Rent A Car across Pakistan.",
  path: "/reviews",
  keywords: ["car rental reviews", "Aziz Afridi Rent A Car testimonials", "Google reviews"],
});

export default function Page() {
  return null;
}
