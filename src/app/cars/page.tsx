import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Cars",
  description:
    "Browse economy, sedan, SUV, luxury, and Hiace rental cars. Transparent daily and monthly rates with Aziz Afridi Rent A Car.",
  path: "/cars",
  keywords: ["car fleet Pakistan", "SUV rental", "luxury car hire"],
});

export default function Page() {
  return null;
}
