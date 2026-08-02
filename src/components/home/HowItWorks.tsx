import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    step: "01",
    title: "Choose your car",
    text: "Pick from economy, sedan, SUV, luxury, or Hiace options.",
  },
  {
    step: "02",
    title: "Confirm booking",
    text: "Share dates and location. We confirm availability fast.",
  },
  {
    step: "03",
    title: "Drive with ease",
    text: "Get self-drive or chauffeur service — ready when you are.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-white">
      <Reveal>
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Simple Process</p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary/65 sm:text-base">
            Three simple steps to get on the road with Signature Rent A Car.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((item, index) => (
          <Reveal key={item.step} delay={index * 120}>
            <div className="h-full rounded-[12px] border border-primary/8 bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-[0_16px_40px_rgba(0,11,29,0.08)]">
              <p className="font-heading text-sm font-semibold text-secondary">{item.step}</p>
              <h3 className="mt-3 text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary/65">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
