import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary" | "accent" | "outline";
type ButtonLinkSize = "sm" | "md" | "lg";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  className?: string;
  target?: string;
  rel?: string;
};

const variantStyles: Record<ButtonLinkVariant, string> = {
  primary: "bg-secondary !text-white hover:brightness-95",
  secondary: "bg-primary !text-white hover:bg-primary/90",
  accent: "bg-accent !text-primary hover:brightness-95",
  outline: "border border-primary/20 bg-transparent text-primary hover:border-secondary hover:text-secondary",
};

const sizeStyles: Record<ButtonLinkSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-200 hover:-translate-y-0.5",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
