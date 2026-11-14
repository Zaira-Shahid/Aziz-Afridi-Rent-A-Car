import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "Learn about Aziz Afridi Rent A Car — premium chauffeur-driven car rental across Pakistan since 2010.",
  path: "/about",
  keywords: ["about Aziz Afridi Rent A Car", "car rental company Pakistan"],
});

export default function Page() {
  return null;
}
