import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
};

export function Section({ children, className, id, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("py-10 sm:py-14 lg:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
