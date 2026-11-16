import { cn } from "@/lib/utils";

/**
 * - solid   navy, the default primary action
 * - green   brand green for the main CTAs (Book Now, Search, WhatsApp)
 * - outline navy outline on light backgrounds
 * - ghost   quiet text button
 * - light   white button for dark (navy) backgrounds
 *
 * `primary`, `secondary` and `accent` are the old names. They still work so pages that are
 * not redesigned yet keep rendering; they are removed once every page has moved to the names above.
 */
export type ButtonVariant =
  | "solid"
  | "green"
  | "outline"
  | "ghost"
  | "light"
  | "primary"
  | "secondary"
  | "accent";

export type ButtonSize = "sm" | "md" | "lg";

const solid = "bg-navy text-white shadow-soft hover:bg-navy-deep";
const green = "bg-green-strong text-white shadow-soft hover:bg-green-deep";

const variantStyles: Record<ButtonVariant, string> = {
  solid,
  green,
  outline: "border-[1.5px] border-navy/30 bg-transparent text-navy-deep hover:border-navy hover:bg-navy hover:text-white",
  ghost: "bg-transparent text-navy-deep hover:bg-navy/5",
  light: "bg-white text-navy-deep shadow-soft hover:bg-surface",
  primary: green,
  secondary: solid,
  accent: green,
};

/** 44px minimum tap target on every size. */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-14 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold leading-none transition duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-px";

export type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Fully rounded pill (header and hero CTAs). Default is the 12px radius. */
  pill?: boolean;
  className?: string;
};

export function buttonClasses({ variant = "solid", size = "md", pill = false, className }: ButtonStyleOptions = {}) {
  return cn(base, pill ? "rounded-full" : "rounded-button", variantStyles[variant], sizeStyles[size], className);
}
