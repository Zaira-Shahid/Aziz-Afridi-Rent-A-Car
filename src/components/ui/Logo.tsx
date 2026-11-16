import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Set the height (for example `h-12`); the width follows from the logo's proportions. */
  className?: string;
  priority?: boolean;
  onClick?: () => void;
};

/**
 * Official logo. `logo-header.webp` is the supplied `logo.jpg` cropped to the artwork, with its
 * near-white background flattened to pure white so it blends into white surfaces.
 */
export function Logo({ className, priority, onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={cn("block shrink-0", className)}>
      <Image
        src="/images/brand/logo-header.webp"
        alt={brand.name}
        width={640}
        height={326}
        priority={priority}
        className="h-full w-auto"
      />
    </Link>
  );
}
