import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DESTINATIONS = [
  {
    name: "Islamabad",
    meta: "Capital City",
    href: "/rent-a-car/islamabad",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEsOO-S2DyklYxXEvORM4Sex9eaWzntlyc_4N1GKWwfN7q5SiN-FaCt5WumWGAclKDV5-iuMETh4Pp5TT7UXVj97YG4unFzR-DOAu5xaPfIlaQbEglo28biLgc92WyP44w89bB9RhxBs9EqqFEx9C7lzkQDA8_uL5kjxOAGxO7eTS_yizjCa5he15Tdq0376IlnVEn3TaURbc9TA9eTHJtjUF6Xii8mVVM8kFJKpL98ms4X1P4lqM",
  },
  {
    name: "Lahore",
    meta: "Cultural Hub",
    href: "/rent-a-car/lahore",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBu2jgMj_QfGnhZQgVd4TRc8aW6ADIUadRDmc5We8ZS3jRR8uvAq3FKIaGHuQswZgqJHL9WDt-m5IypKs071yZUarzJvWYL7srDq3P4uxU1EOXD7e1wLw1hOaVnJA0cdkmHD0z1BX4kBoqvXI80IYusN1Mm5jOhZblLs5H7Qg0Y5xGxbeFnq07mq-yfYJnw5e8HnNfjGEbC2o_nN-O7Rzk-VQs582D4gmx__otJ2V4m595qN0yHYMEb",
  },
  {
    name: "Karachi",
    meta: "Coastal Metropolis",
    href: "/rent-a-car/karachi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9DfIcAOqVY-KFaY-8uHfe3G9Ur9bEXo8sZiGRVrhtJbIbKiMwoC4TJQxAnagc3IdX56PuL7A6rk9426l9td6pexSDv_jtc-a_JfvxnWDnQBdculn9r_-rbGU362ovaf6KeQ_eTRN1lIlUX6DcLVd1OxGnG2rEIRiHGui7o_24VajnirUOClZ_OfNb4M08DzmNUVV_a0IChsG8NMJz8rSVGDEwyQ-Y31gdlY6ov0kdGSaVchHJRMD",
  },
  {
    name: "Hunza",
    meta: "Northern Escape",
    href: "/rent-a-car/hunza",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw0DCv15PoG1w9hfCNj2vf16txCJ15GHLj4HrhsBAunRkQVuBHQuR7sXb34I5mAtXZ-Vh9gehoAUT6HGjUVYJDagEztop-Cym8YErgaWQjtB8W0091zOFrq9jZjjWpwURtQKjtIlSwPKfznw9BvVd9hRj5Xe_ptc65Y4lIyjbDc-rVm20qhB7edCRrt5JoMK6fHQs2twGIaqKkMzg4gL1VoyE6O7lu8DDBef3HCAaPZDN62WXJPClH",
  },
];

/** Tall image panels. On desktop the hovered (or focused) panel expands; on phones they form a snap carousel. */
export function HomeDestinations() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="City Services"
          title="Drive Across Pakistan"
          description="Discover our premier service hubs across iconic destinations."
          align="center"
        />
      </Reveal>

      <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mt-12 lg:mx-0 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
        {DESTINATIONS.map((item) => (
          <li
            key={item.name}
            className="h-[26.25rem] w-[72%] shrink-0 snap-center sm:w-[44%] lg:h-[34rem] lg:w-auto lg:min-w-0 lg:flex-1 lg:grow lg:transition-[flex-grow] lg:duration-500 lg:ease-out lg:hover:grow-[3] lg:focus-within:grow-[3]"
          >
            <Link
              href={item.href}
              className="group relative block h-full overflow-hidden rounded-card bg-navy-deep shadow-soft"
            >
              <Image
                src={item.image}
                alt={`${item.name}, ${item.meta}`}
                fill
                sizes="(min-width: 1024px) 40vw, 72vw"
                className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-white sm:p-6">
                <span className="inline-flex items-center gap-2 font-heading text-xl font-extrabold italic sm:text-2xl">
                  <Icon name="map-pin" size={22} className="text-green" />
                  {item.name}
                </span>
                <span className="text-sm text-white/85 transition duration-300 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                  {item.meta}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
