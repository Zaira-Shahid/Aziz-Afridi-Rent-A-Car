import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: "Car rental tips, travel guides, and company updates from Signature Rent A Car.",
  path: "/blog",
  keywords: ["car rental tips", "Pakistan travel guide"],
});

export default function Page() {
  return null;
}
