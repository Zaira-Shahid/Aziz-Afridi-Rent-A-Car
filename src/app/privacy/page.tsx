import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Aziz Afridi Rent A Car collects and protects your information.",
  path: "/privacy",
});

export default function Page() {
  return null;
}
