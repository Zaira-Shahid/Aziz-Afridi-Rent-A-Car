import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const SERVICES = [
  {
    icon: "person_pin_circle",
    title: "Chauffeur Service",
    text: "Sit back and relax while our professional chauffeurs handle the navigation and traffic.",
    href: "/services/executive-car-rental",
  },
  {
    icon: "flight_takeoff",
    title: "Airport Transfers",
    text: "VIP meet and greet services at major terminals with immediate luxury transfers.",
    href: "/services/airport-pick-drop",
  },
  {
    icon: "event_available",
    title: "Corporate Events",
    text: "Fleet management for high-profile business gatherings, weddings, and exclusive events.",
    href: "/services/corporate-car-rental",
  },
];

export function HomeServices() {
  return (
    <section className="py-16 sm:py-24 lg:py-[100px]">
      <Container>
        <Reveal>
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Services Tailored to Your Lifestyle
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div className="group h-full rounded-2xl border border-primary/10 bg-white p-6 transition hover:border-secondary hover:shadow-xl sm:p-8 lg:p-10">
                <span className="material-symbols-outlined mb-6 block text-[48px] text-primary transition group-hover:text-secondary">
                  {item.icon}
                </span>
                <h3 className="font-heading text-xl font-semibold sm:text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm text-muted sm:text-base">{item.text}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition group-hover:gap-2"
                >
                  Explore Service <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
