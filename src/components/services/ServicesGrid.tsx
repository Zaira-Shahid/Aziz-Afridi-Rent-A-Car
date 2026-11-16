import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { serviceDetails, services } from "@/data";
import { cn } from "@/lib/utils";

const SERVICE_COPY: Record<string, { icon: IconName; blurb: string }> = {
  "airport-pick-drop": {
    icon: "plane",
    blurb: "Meet & greet, flight monitoring, and doorstep drop from major airports.",
  },
  "corporate-car-rental": {
    icon: "briefcase",
    blurb: "Dedicated accounts, monthly billing, and priority fleet for your team.",
  },
  "daily-car-rental": {
    icon: "calendar",
    blurb: "Flexible same-day and short-term hire with clear daily rates.",
  },
  "weekly-car-rental": {
    icon: "calendar",
    blurb: "Weekly plans that save versus day rates — easy extensions included.",
  },
  "monthly-car-rental": {
    icon: "calendar",
    blurb: "Long-term mobility with maintenance cover and replacement vehicles.",
  },
  "executive-car-rental": {
    icon: "crown",
    blurb: "Chauffeured executive cars for meetings, VIPs, and board travel.",
  },
  "wedding-car-rental": {
    icon: "car-sparkles",
    blurb: "Decorated luxury cars and bridal convoy options for your big day.",
  },
  "hotel-transfer": {
    icon: "map-pin",
    blurb: "Fixed-price hotel transfers with professional chauffeurs.",
  },
};

/** All services as an alternating list: a photo in an arched frame, a number, the name, the text and a link. */
export function ServicesGrid() {
  return (
    <section className="bg-surface py-12 sm:py-16 lg:py-24">
      <Container>
        <ol className="space-y-8 sm:space-y-12 lg:space-y-16">
          {services.map((item, index) => {
            const copy = SERVICE_COPY[item.slug];
            const image = serviceDetails[item.slug]?.hero.image;
            const flip = index % 2 === 1;
            return (
              <li key={item.slug}>
                <Reveal
                  className={cn(
                    "grid items-center gap-6 overflow-hidden rounded-panel border border-line bg-white shadow-soft lg:grid-cols-2 lg:gap-0",
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[22rem]",
                      flip && "lg:order-2",
                    )}
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={cn("object-cover", flip ? "lg:rounded-bl-[6rem]" : "lg:rounded-br-[6rem]")}
                      />
                    ) : (
                      <span className="absolute inset-0 bg-navy" />
                    )}
                  </div>
                  <div className="p-6 pt-0 sm:p-8 sm:pt-0 lg:p-12">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                        <Icon name={copy?.icon ?? "car"} size={26} />
                      </span>
                      <span className="font-heading text-5xl font-extrabold italic text-navy/10" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-5 font-heading text-2xl font-extrabold italic text-navy-deep sm:text-3xl">
                      {item.name}
                    </h2>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted">{copy?.blurb}</p>
                    <ButtonLink href={`/services/${item.slug}`} variant="green" pill size="md" className="mt-6">
                      View page
                      <Icon name="arrow-right" size={18} />
                    </ButtonLink>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
