import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared";
import { blogCategories } from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description: `${category.name} articles from Signature Rent A Car.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <ContentPage
      title={category.name}
      description={`Articles and updates in ${category.name}.`}
      body={[
        `Posts for ${category.name} will appear here as content is published.`,
        "This category structure is ready for SEO-friendly blog expansion.",
      ]}
    />
  );
}
