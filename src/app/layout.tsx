import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { brand } from "@/lib/brand";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
