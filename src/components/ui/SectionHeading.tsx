import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2 className={cn("text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base text-primary/70 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
