import { CtaBanner, PageHero } from "@/components/shared";
import { Section } from "@/components/ui/Section";

type ContentPageProps = {
  title: string;
  description: string;
  body?: string[];
};

export function ContentPage({ title, description, body = [] }: ContentPageProps) {
  return (
    <>
      <PageHero title={title} description={description} />
      {body.length > 0 ? (
        <Section>
          <div className="mx-auto max-w-3xl space-y-4">
            {body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-primary/75">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      ) : null}
      <CtaBanner />
    </>
  );
}
