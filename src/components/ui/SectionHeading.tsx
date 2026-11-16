import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Part of `title` to show in brand green (the mockups highlight the last words). Must be a substring of `title`. */
  highlight?: string;
  align?: "left" | "center";
  /** Light text for dark (navy) sections. */
  invert?: boolean;
  className?: string;
  titleClassName?: string;
};

function renderTitle(title: string, highlight: string | undefined, invert: boolean) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className={invert ? "text-green" : "text-green-strong"}>{highlight}</span>
      {title.slice(at + highlight.length)}
    </>
  );
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  highlight,
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
            "mb-3 text-xs font-bold uppercase tracking-[0.14em]",
            invert ? "text-green" : "text-green-strong",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-heading text-[1.75rem] font-extrabold italic leading-tight tracking-tight sm:text-3xl lg:text-4xl",
          invert ? "text-white" : "text-navy-deep",
          titleClassName,
        )}
      >
        {renderTitle(title, highlight, invert)}
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
