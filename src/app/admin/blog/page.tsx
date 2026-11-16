import type { Metadata } from "next";
import { BlogAdminPanel } from "@/components/blog/BlogAdminPanel";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default function BlogAdminPage() {
  return <BlogAdminPanel />;
}
