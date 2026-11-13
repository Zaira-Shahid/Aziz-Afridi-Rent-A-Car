import { blogCategories, blogPosts } from "@/data";

export function generateStaticParams() {
  const categoryParams = blogCategories.map((category) => ({ slug: category.slug }));
  const postParams = blogPosts.map((post) => ({ slug: post.slug }));
  return [...categoryParams, ...postParams];
}

export default function Page() {
  return null;
}
