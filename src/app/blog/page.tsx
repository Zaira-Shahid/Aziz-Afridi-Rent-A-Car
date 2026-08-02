import type { Metadata } from "next";
import { CtaBanner, LinkGridSection, PageHero } from "@/components/shared";
import { blogCategories } from "@/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Car rental tips, travel guides, and company updates.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        description="Guides and tips to help you plan better trips across Pakistan."
        ctaLabel="Contact Us"
      />
      <LinkGridSection
        title="Blog categories"
        items={blogCategories.map((item) => ({
          href: `/blog/${item.slug}`,
          title: item.name,
        }))}
      />
      <CtaBanner />
    </>
  );
}
