import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
};

/** 1200px max width with 16 / 24 / 32px side gutters. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[75rem] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
