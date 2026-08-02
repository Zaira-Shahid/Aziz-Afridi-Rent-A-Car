import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: "search",
    title: "Choose the vehicle",
    text: "Easily select your ideal vehicle from our website!",
  },
  {
    icon: "edit_document",
    title: "Request the car",
    text: "Fill the booking form or send message over WhatsApp",
  },
  {
    icon: "credit_card_off",
    title: "No pre-payment",
    text: "No need any pre-payment required for your booking",
  },
  {
    icon: "location_on",
    title: "Delivery",
    text: "Payment only upon delivery of the vehicle",
  },
  {
    icon: "key",
    title: "Drive & Enjoy",
    text: "Sign the contract and cruise across Pakistan!",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-white pb-14 pt-4 sm:pb-20 sm:pt-6">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              How to rent a car with Signature?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Here is the easiest process to book any car without any pre-payment or card details
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10 sm:mt-14">
          {/* Desktop wavy dashed path */}
          <svg
            className="pointer-events-none absolute left-0 right-16 top-[34px] hidden h-16 w-[calc(100%-4rem)] lg:block"
            viewBox="0 0 1000 64"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M20 32 C 100 8, 160 56, 240 32 S 380 8, 460 32 S 600 56, 680 32 S 820 8, 900 32 S 960 48, 980 40"
              stroke="#c41e3a"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
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
                  <h3 className="mt-4 font-heading text-base font-bold text-primary sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[210px] text-sm leading-relaxed text-muted">{step.text}</p>

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

          {/* End car graphic */}
          <div className="pointer-events-none absolute -right-1 top-5 hidden lg:block" aria-hidden="true">
            <svg width="72" height="36" viewBox="0 0 72 36" fill="none">
              <ellipse cx="36" cy="30" rx="28" ry="3" fill="#c41e3a" opacity="0.15" />
              <path
                d="M8 22 L14 12 H42 L58 18 H64 V26 H8 V22Z"
                fill="#c41e3a"
              />
              <path d="M16 12 L20 18 H40 L36 12 H16Z" fill="#8b1528" />
              <circle cx="20" cy="26" r="5" fill="#1a1a1a" />
              <circle cx="20" cy="26" r="2.5" fill="#666" />
              <circle cx="52" cy="26" r="5" fill="#1a1a1a" />
              <circle cx="52" cy="26" r="2.5" fill="#666" />
              <rect x="56" y="19" width="6" height="3" rx="1" fill="#fbbf24" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
