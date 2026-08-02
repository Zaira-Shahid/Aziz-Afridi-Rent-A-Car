import Image from "next/image";
import Link from "next/link";
import logo from "@/lib/logo.png";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex h-12 shrink-0 items-center sm:h-14 lg:h-[60px]", className)}
      aria-label={brand.name}
    >
      <Image
        src={logo}
        alt={brand.name}
        priority={priority}
        className="h-full w-auto object-contain"
        sizes="220px"
      />
    </Link>
  );
}
