import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { carImage } from "@/data";

const steps = [
  {
    icon: "directions_car",
    title: "Choose Your Vehicle",
    text: "Browse our fleet of economy cars, executive sedans, luxury vehicles, SUVs, Hiace, Coaster, and Grand Cabin rentals. Select the vehicle that best suits your travel needs.",
  },
  {
    icon: "chat",
    title: "Share Your Trip Details",
    text: "Send us your pickup location, destination, travel date, time, and passenger requirements through our online booking form or WhatsApp.",
  },
  {
    icon: "verified",
    title: "Confirm Your Booking",
    text: "Receive your quotation, confirm your reservation, and complete the booking. Our team will assign a professional chauffeur for your journey.",
  },
  {
    icon: "airline_seat_recline_extra",
    title: "Enjoy a Comfortable Ride",
    text: "Your driver will arrive at your pickup location on time. Sit back and enjoy a safe, comfortable, and reliable journey anywhere in Islamabad, Rawalpindi, or across Pakistan.",
  },
] as const;

const END_CAR_IMAGE = carImage("green-audi-convertible.png");

export function HowItWorks() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              How to Book a Car with Signature Rent A Car?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Booking a chauffeur-driven car rental in Islamabad &amp; Rawalpindi is quick and hassle-free.
              Follow these four simple steps to reserve your vehicle with Signature Rent A Car.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10 pr-0 sm:mt-14 lg:pr-40">
          <svg
            className="pointer-events-none absolute left-0 right-36 top-[34px] hidden h-16 w-[calc(100%-9rem)] lg:block"
            viewBox="0 0 1000 64"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M40 32 C 140 8, 220 56, 320 32 S 500 8, 600 32 S 760 56, 860 32 S 920 20, 960 28"
              stroke="#04C4E3"
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
              stroke="#04C4E3"
              strokeWidth="2.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M70 22 L82 30 L68 36"
              stroke="#04C4E3"
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
                  <div className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-secondary/15 sm:h-[76px] sm:w-[76px]">
                    <span
                      className="material-symbols-outlined text-[28px] text-secondary sm:text-[32px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-primary sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-muted">{step.text}</p>

                  {index < steps.length - 1 ? (
                    <div
                      className="my-1 h-8 w-px border-l-2 border-dashed border-secondary/50 lg:hidden"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="pointer-events-none absolute -right-2 top-0 z-10 hidden lg:block" aria-hidden="true">
            <div className="how-it-works-car relative h-20 w-40">
              <Image
                src={END_CAR_IMAGE}
                alt="Signature luxury convertible"
                fill
                className="object-contain object-center drop-shadow-md"
                sizes="160px"
                priority
              />
            </div>
          </div>

          <Reveal delay={350}>
            <div className="mt-8 flex justify-center lg:hidden">
              <div className="how-it-works-car relative h-36 w-60">
                <Image
                  src={END_CAR_IMAGE}
                  alt="Signature luxury convertible"
                  fill
                  className="object-contain object-center drop-shadow-md"
                  sizes="240px"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
