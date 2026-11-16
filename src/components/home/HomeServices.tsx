import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceDetails } from "@/data";

const SERVICES: { icon: IconName; title: string; text: string; href: string; detailSlug: string }[] = [
  {
    icon: "user-check",
    title: "Chauffeur Service",
    text: "Sit back and relax while our professional chauffeurs handle the navigation and traffic.",
    href: "/services/executive-car-rental",
    detailSlug: "executive-car-rental",
  },
  {
    icon: "plane",
    title: "Airport Transfers",
    text: "VIP meet and greet services at major terminals with immediate luxury transfers.",
    href: "/services/airport-pick-drop",
    detailSlug: "airport-pick-drop",
  },
  {
    icon: "briefcase",
    title: "Corporate Events",
    text: "Fleet management for high-profile business gatherings, weddings, and exclusive events.",
    href: "/services/corporate-car-rental",
    detailSlug: "corporate-car-rental",
  },
];

export function HomeServices() {
  return (
    <Section>
      <Reveal>
        <SectionHeading eyebrow="Services" title="Services Tailored to Your Lifestyle" align="center" />
      </Reveal>

      <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
        {SERVICES.map((item) => {
          const cover = serviceDetails[item.detailSlug]?.hero.image;
          return (
            <li key={item.title} className="w-[78%] shrink-0 snap-center sm:w-auto">
              <Link
                href={item.href}
                className="group flex h-full min-h-[30rem] flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition duration-300 hover:shadow-lift sm:min-h-[32rem]"
              >
                <div className="relative h-60 overflow-hidden rounded-t-[8rem] bg-navy-deep sm:h-64">
                  {cover ? (
                    <Image
                      src={cover}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 78vw"
                      className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="relative flex flex-1 flex-col px-6 pb-7 pt-0">
                  <span className="-mt-7 grid size-14 place-items-center rounded-full border-4 border-white bg-green-strong text-white shadow-soft">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-extrabold italic text-navy-deep sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{item.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-green-strong transition-all group-hover:gap-3">
                    Explore Service
                    <Icon name="arrow-right" size={16} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
