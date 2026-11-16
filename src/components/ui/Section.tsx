import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionTone = "surface" | "white" | "ink";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  /** Background: page surface (default), white, or dark navy with light text. */
  tone?: SectionTone;
};

const toneStyles: Record<SectionTone, string> = {
  surface: "",
  white: "bg-white",
  ink: "bg-ink text-white",
};

/** One vertical rhythm for the whole site: 48px on phones, 64px on tablets, 96px on desktop. */
export function Section({ children, className, id, containerClassName, tone = "surface" }: SectionProps) {
  return (
    <section id={id} className={cn("py-12 sm:py-16 lg:py-24", toneStyles[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
