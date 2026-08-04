import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: "directions_car",
    title: "Choose a vehicle",
    text: "Browse our fleet and pick the car that fits your trip.",
  },
  {
    icon: "chat",
    title: "Request a car",
    text: "Send your booking details through the form or WhatsApp.",
  },
  {
    icon: "payments",
    title: "Just send payment",
    text: "Confirm your booking with a simple payment when ready.",
  },
  {
    icon: "local_shipping",
    title: "Delivery ride",
    text: "We deliver the car to your location and you hit the road.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              How to rent a car with Signature?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Four simple steps from choosing your car to starting your ride.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10 pr-0 sm:mt-14 lg:pr-28">
          <svg
            className="pointer-events-none absolute left-0 right-28 top-[34px] hidden h-16 w-[calc(100%-7rem)] lg:block"
            viewBox="0 0 1000 64"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M40 32 C 140 8, 220 56, 320 32 S 500 8, 600 32 S 760 56, 860 32 S 920 20, 960 28"
              stroke="#c41e3a"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <svg
            className="pointer-events-none absolute right-16 top-[20px] hidden h-14 w-24 lg:block"
            viewBox="0 0 96 56"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 36 C 28 10, 52 10, 78 28"
              stroke="#c41e3a"
              strokeWidth="2.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M70 22 L82 30 L68 36"
              stroke="#c41e3a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#fde8e9] sm:h-[76px] sm:w-[76px]">
                    <span
                      className="material-symbols-outlined text-[28px] text-[#c41e3a] sm:text-[32px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c41e3a]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-primary sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted">{step.text}</p>

                  {index < steps.length - 1 ? (
                    <div
                      className="my-1 h-8 w-px border-l-2 border-dashed border-[#c41e3a] lg:hidden"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="pointer-events-none absolute right-0 top-2 hidden lg:block" aria-hidden="true">
            <div className="relative h-14 w-24 overflow-hidden rounded-lg shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
