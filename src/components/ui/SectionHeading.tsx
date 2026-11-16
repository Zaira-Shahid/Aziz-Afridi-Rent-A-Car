import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  align?: "left" | "center";
  /** Light text for dark (navy) sections. */
  invert?: boolean;
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  invert = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.14em]",
            invert ? "text-gold" : "text-gold-strong",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-heading text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl",
          invert ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-base leading-relaxed sm:text-lg",
            centered && "mx-auto",
            invert ? "text-white/80" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
