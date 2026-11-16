import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li";
  /** Adds the hover lift used by clickable cards. */
  interactive?: boolean;
};

export function Card({ as: Tag = "div", interactive = false, className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-line bg-card shadow-soft",
        interactive && "transition duration-200 ease-out hover:shadow-lift motion-safe:hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}
