import Link from "next/link";
import { cn } from "@/lib/utils";

type CardLinkProps = {
  href: string;
  title: string;
  description?: string;
  className?: string;
};

export function CardLink({ href, title, description, className }: CardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-[12px] border border-primary/8 bg-white p-5 transition-all duration-200 hover:border-secondary/40 hover:shadow-sm",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {description ? <p className="mt-2 text-sm text-primary/65">{description}</p> : null}
    </Link>
  );
}
