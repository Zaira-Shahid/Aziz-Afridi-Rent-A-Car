import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const points = [
  {
    title: "Clean, inspected fleet",
    text: "Every car is checked before handover so your trip starts smooth.",
  },
  {
    title: "City & tourist coverage",
    text: "Islamabad, Lahore, Karachi, Murree, Hunza, and more destinations.",
  },
  {
    title: "Flexible rental plans",
    text: "Daily, weekly, monthly, corporate, and wedding packages available.",
  },
  {
    title: "Fast WhatsApp support",
    text: "Quick replies for bookings, changes, and airport pickups.",
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-primary">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">
            <Image
              src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1400&q=80"
              alt="Signature Rent A Car fleet"
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Why Signature
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Built for trust. Designed for comfort.
            </h2>
            <p className="mt-4 text-sm text-white/65 sm:text-base">
              A modern rental experience with clear pricing, dependable vehicles, and service that feels premium.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point, index) => (
              <Reveal key={point.title} delay={index * 100}>
                <div className="h-full rounded-[12px] border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-secondary/40 hover:bg-white/10">
                  <h3 className="text-base font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
