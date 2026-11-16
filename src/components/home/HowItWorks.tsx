import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { bookingSteps } from "@/data/booking-steps";

const stepIcons: IconName[] = ["car", "message-circle", "check-circle", "smile"];

const steps = bookingSteps.map((step, index) => ({ ...step, icon: stepIcons[index] }));

export function HowItWorks() {
  return (
    <Section tone="navy">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-heading text-3xl font-extrabold italic leading-tight tracking-tight text-white sm:text-4xl">
            How to Book a Car with Aziz Afridi Rent A Car?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Booking a chauffeur-driven car rental in Islamabad &amp; Rawalpindi is quick and hassle-free. Follow
            these four simple steps to reserve your vehicle with Aziz Afridi Rent A Car.
          </p>
        </Reveal>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[2.5rem] top-8 w-px border-l-2 border-dashed border-green/60 sm:left-[3.4rem]"
          />
          <ol className="space-y-5">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 80}>
                <div className="relative flex gap-4 rounded-card border border-white/10 bg-white/5 p-4 sm:gap-6 sm:p-6">
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-green text-navy-deep sm:size-[3.75rem]">
                    <Icon name={step.icon} size={26} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-green">Step {index + 1}</p>
                    <h3 className="mt-1 font-heading text-lg font-bold italic text-white sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
