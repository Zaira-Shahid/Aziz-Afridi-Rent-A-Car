import { cn } from "@/lib/utils";

/**
 * - solid   navy, the default primary action
 * - action  green, reserved for WhatsApp / booking CTAs
 * - gold    accent action (works on light and dark backgrounds)
 * - outline navy outline on light backgrounds
 * - ghost   quiet text button
 * - light   white button for dark backgrounds
 *
 * `primary`, `secondary` and `accent` are the old names. They still work so pages that are
 * not redesigned yet keep rendering; they are removed once every page has moved to the names above.
 */
export type ButtonVariant =
  | "solid"
  | "action"
  | "gold"
  | "outline"
  | "ghost"
  | "light"
  | "primary"
  | "secondary"
  | "accent";

export type ButtonSize = "sm" | "md" | "lg";

const solid = "bg-ink text-white shadow-soft hover:bg-ink-soft";
const action = "bg-action text-white shadow-soft hover:bg-action-hover";

const variantStyles: Record<ButtonVariant, string> = {
  solid,
  action,
  gold: "bg-gold text-ink shadow-soft hover:bg-gold-hover",
  outline: "border-[1.5px] border-ink/30 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  light: "bg-white text-ink shadow-soft hover:bg-surface",
  primary: action,
  secondary: solid,
  accent: action,
};

/** 44px minimum tap target on every size. */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-14 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-button font-semibold leading-none transition duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-px";

export type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonClasses({ variant = "solid", size = "md", className }: ButtonStyleOptions = {}) {
  return cn(base, variantStyles[variant], sizeStyles[size], className);
}
