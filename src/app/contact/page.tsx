import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description:
    "Contact Aziz Afridi Rent A Car for bookings, quotes, and trip planning. Call, WhatsApp, or send an inquiry online.",
  path: "/contact",
  keywords: ["car rental contact", "book rent a car Pakistan"],
});

export default function Page() {
  return null;
}
