import Image from "next/image";
import Link from "next/link";
import type {
  ServiceBooking,
  ServiceCategory,
  ServiceCoverageCity,
  ServiceFeature,
  ServiceInfoBlock,
  ServicePricingPackage,
  ServiceProcessStep,
  ServiceStory,
} from "@/types";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand, formatPhoneDisplay, formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "./ServiceIcon";

/* ---------- small building pieces ---------- */

/** Round icon badge used across the service pages. */
function IconBadge({ name, dark = false, size = "md" }: { name: string; dark?: boolean; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        size === "lg" ? "h-14 w-14" : "h-12 w-12",
        dark ? "bg-green/20 text-green" : "bg-green-strong/10 text-green-strong",
      )}
    >
      <ServiceIcon name={name} size={size === "lg" ? 28 : 24} />
    </span>
  );
}

type BlockHeadProps = {
  title: string;
  description?: string;
  invert?: boolean;
  align?: "left" | "center";
  /** A link shown on the right of the heading (desktop) or below it (mobile). */
  action?: { href: string; label: string };
  className?: string;
};

export function BlockHead({ title, description, invert, align = "left", action, className }: BlockHeadProps) {
  return (
    <Reveal className={cn("mb-10 sm:mb-12", className)}>
      <div className={cn(action && "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between")}>
        <SectionHeading title={title} description={description} invert={invert} align={align} />
        {action ? (
          <Link
            href={action.href}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline",
              invert ? "text-white" : "text-navy-deep",
            )}
          >
            {action.label}
            <Icon name="arrow-right" size={16} />
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}

/* ---------- features ---------- */

type FeatureVariant = "cards" | "rows" | "dark";

/** The service's feature list. cards = 4 icon cards, rows = 2 wide rows, dark = glass cards on navy. */
export function FeatureGrid({ items, variant = "cards" }: { items: ServiceFeature[]; variant?: FeatureVariant }) {
  if (variant === "rows") {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index, 5) * 70}>
            <div className="flex h-full gap-5 rounded-card border border-line bg-white p-6 shadow-soft sm:p-7">
              <IconBadge name={item.icon} size="lg" />
              <div>
                <h3 className="font-heading text-lg font-bold text-navy-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }

  const dark = variant === "dark";
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={Math.min(index, 5) * 70}>
          <div
            className={cn(
              "h-full rounded-card p-6 transition duration-300 motion-safe:hover:-translate-y-1 sm:p-7",
              dark ? "border border-white/10 bg-white/5" : "border border-line bg-white shadow-soft",
            )}
          >
            <IconBadge name={item.icon} dark={dark} />
            <h3 className={cn("mt-5 font-heading text-lg font-bold", dark ? "text-white" : "text-navy-deep")}>
              {item.title}
            </h3>
            <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/75" : "text-muted")}>{item.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- info blocks: included, audience, notes ---------- */

/** "What's included" checklist as rounded chips with an icon. */
export function IncludedChips({ items, invert = false }: { items: ServiceInfoBlock["items"]; invert?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.text}>
          <Reveal
            delay={Math.min(index, 6) * 50}
            className={cn(
              "flex h-full items-center gap-3 rounded-full border py-2.5 pl-2.5 pr-5",
              invert ? "border-white/15 bg-white/5" : "border-line bg-white shadow-soft",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                invert ? "bg-green/20 text-green" : "bg-green-strong/10 text-green-strong",
              )}
            >
              <ServiceIcon name={item.icon} size={20} />
            </span>
            <span className={cn("text-sm font-medium", invert ? "text-white/90" : "text-navy-deep")}>{item.text}</span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Cards with an icon, optional title and text. Used for "Who it's for" and the extra notes. */
export function InfoCards({
  items,
  invert = false,
  columns = 3,
}: {
  items: ServiceInfoBlock["items"];
  invert?: boolean;
  columns?: 3 | 4;
}) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((item, index) => (
        <Reveal key={item.title ?? item.text} delay={Math.min(index, 5) * 70}>
          <div
            className={cn(
              "h-full rounded-card rounded-tr-[2.5rem] p-6 sm:p-7",
              invert ? "border border-white/10 bg-white/5" : "border border-line bg-white shadow-soft",
            )}
          >
            <IconBadge name={item.icon} dark={invert} />
            {item.title ? (
              <h3 className={cn("mt-5 font-heading text-lg font-bold", invert ? "text-white" : "text-navy-deep")}>
                {item.title}
              </h3>
            ) : null}
            <p className={cn("text-sm leading-relaxed", item.title ? "mt-2" : "mt-5", invert ? "text-white/75" : "text-muted")}>
              {item.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Big figures on navy. For notes where the title is a number and the text is its label. */
export function StatStrip({ block }: { block: ServiceInfoBlock }) {
  const { items } = block;
  return (
    <section className="bg-navy text-white">
      <Container className="py-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green">{block.title}</p>
        {block.description ? <p className="mt-2 max-w-xl text-sm text-white/80">{block.description}</p> : null}
      </Container>
      <Container className="grid grid-cols-2 gap-8 pb-10 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.title ?? item.text} delay={index * 70}>
            <p className="font-heading text-3xl font-extrabold italic text-green sm:text-4xl">{item.title}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">{item.text}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

/** Info block section with its heading. */
export function InfoSection({
  block,
  kind,
  tone = "surface",
  columns,
}: {
  block: ServiceInfoBlock;
  kind: "included" | "cards";
  tone?: "surface" | "white" | "navy";
  columns?: 3 | 4;
}) {
  const invert = tone === "navy";
  return (
    <Section tone={tone}>
      <BlockHead title={block.title} description={block.description} invert={invert} />
      {kind === "included" ? (
        <IncludedChips items={block.items} invert={invert} />
      ) : (
        <InfoCards items={block.items} invert={invert} columns={columns} />
      )}
    </Section>
  );
}

/* ---------- process ---------- */

type ProcessVariant = "timeline" | "list" | "cards";

export function ProcessSteps({ steps, variant = "timeline" }: { steps: ServiceProcessStep[]; variant?: ProcessVariant }) {
  if (variant === "list") {
    return (
      <ol className="space-y-7">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-strong font-heading text-base font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-navy-deep">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "cards") {
    return (
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 70} className="relative h-full overflow-hidden rounded-card border border-line bg-white p-6 shadow-soft sm:p-7">
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-4 font-heading text-8xl font-extrabold italic text-navy/5"
              >
                {index + 1}
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-green-strong font-heading font-bold text-white">
                {index + 1}
              </span>
              <h3 className="relative mt-5 font-heading text-lg font-bold text-navy-deep">{step.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-11 hidden h-px bg-navy/15 lg:block" />
      {steps.map((step, index) => (
        <li key={step.title}>
          <Reveal delay={index * 80} className="relative flex flex-col items-center text-center">
            <span
              className={cn(
                "mb-6 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-4 border-surface shadow-lift",
                index === steps.length - 1 ? "bg-green-strong text-white" : "bg-white text-navy",
              )}
            >
              <ServiceIcon name={step.icon} size={32} />
            </span>
            <h3 className="font-heading text-lg font-bold text-navy-deep">
              <span className="mr-1 text-green-strong">{index + 1}.</span>
              {step.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ---------- packages ---------- */

export function PackageCards({ packages, service }: { packages: ServicePricingPackage[]; service: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
      {packages.map((pkg, index) => (
        <Reveal key={pkg.name} delay={index * 80} className="h-full">
          <div
            className={cn(
              "relative flex h-full flex-col rounded-panel p-7 sm:p-9",
              pkg.featured
                ? "bg-white text-navy-deep shadow-lift md:-my-3 md:py-12"
                : "border border-white/15 bg-white/5 text-white",
            )}
          >
            {pkg.featured ? (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green-strong px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-soft">
                Most Popular
              </span>
            ) : null}
            <p className={cn("text-xs font-bold uppercase tracking-[0.16em]", pkg.featured ? "text-green-strong" : "text-green")}>
              {pkg.name}
            </p>
            <p className="mt-4 font-heading text-4xl font-extrabold italic sm:text-[2.6rem]">
              {formatPrice(pkg.priceDay)}
              <span className={cn("text-base font-normal not-italic", pkg.featured ? "text-muted" : "text-white/75")}>
                {pkg.unit ?? "/24hr"}
              </span>
            </p>
            <ul className={cn("mt-7 flex-1 space-y-3.5 text-sm", pkg.featured ? "text-muted" : "text-white/85")}>
              {pkg.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      feature.included
                        ? pkg.featured
                          ? "bg-green-strong text-white"
                          : "bg-green text-navy-deep"
                        : pkg.featured
                          ? "bg-navy/10 text-muted"
                          : "bg-white/15 text-white/70",
                    )}
                  >
                    <Icon name={feature.included ? "check" : "minus"} size={13} />
                  </span>
                  <span className={cn(!feature.included && "line-through opacity-70")}>
                    {feature.text}
                    {!feature.included ? <span className="sr-only"> (not included)</span> : null}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?service=${encodeURIComponent(service)}&package=${encodeURIComponent(pkg.name)}`}
              className={buttonClasses({
                variant: pkg.featured ? "green" : "light",
                pill: true,
                size: "lg",
                className: "mt-8 w-full",
              })}
            >
              Select {pkg.name}
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- categories and story ---------- */

export function CategoryCards({ items, invert = false }: { items: ServiceCategory[]; invert?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 80}>
          <div
            className={cn(
              "h-full rounded-panel p-7 sm:p-9",
              invert ? "border border-white/10 bg-white/5 text-white" : "border border-line bg-white shadow-soft",
            )}
          >
            <IconBadge name={item.icon} dark={invert} size="lg" />
            <h3 className={cn("mt-6 font-heading text-xl font-bold", invert ? "text-white" : "text-navy-deep")}>
              {item.title}
            </h3>
            <p className={cn("mt-3 text-sm leading-relaxed", invert ? "text-white/75" : "text-muted")}>{item.text}</p>
            {item.bullets ? (
              <ul className="mt-5 space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm">
                    <Icon name="check-circle" size={18} className={invert ? "text-green" : "text-green-strong"} />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function StoryBlock({ story }: { story: ServiceStory }) {
  return (
    <Section tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-panel rounded-tr-[5rem] shadow-lift">
              <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>
            <div className="absolute -bottom-5 right-3 rounded-card bg-navy-deep px-6 py-5 text-white shadow-lift sm:-right-5">
              <p className="font-heading text-3xl font-extrabold italic text-green sm:text-4xl">{story.stat.value}</p>
              <p className="mt-1 text-sm text-white/80">{story.stat.label}</p>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-heading text-[1.75rem] font-extrabold italic leading-tight text-navy-deep sm:text-3xl lg:text-4xl">
              {story.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{story.description}</p>
          </Reveal>
          <ul className="mt-8 space-y-6">
            {story.points.map((point, index) => (
              <li key={point.title}>
                <Reveal delay={index * 80} className="flex gap-4">
                  <IconBadge name={point.icon} />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy-deep">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{point.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- coverage ---------- */

/** Small city chips (airports). */
export function CoverageChips({ title, description, cities }: { title: string; description?: string; cities: ServiceCoverageCity[] }) {
  return (
    <section className="border-b border-line bg-white py-10 sm:py-12">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-green-strong">{title}</p>
          {description ? <p className="mx-auto mb-6 mt-2 max-w-xl text-center text-sm text-muted">{description}</p> : <span className="mb-6 block" />}
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cities.map((city, index) => (
            <li key={city.name}>
              <Reveal delay={index * 70} className="h-full rounded-full border border-line bg-surface px-5 py-4 text-center">
                <p className="font-heading text-base font-bold text-navy-deep sm:text-lg">{city.name}</p>
                <p className="mt-0.5 text-xs text-muted">{city.tag}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Tall photo tiles with a name and tag over the image (hotel cities). */
export function CoverageTiles({ cities }: { cities: ServiceCoverageCity[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cities.map((city, index) => (
        <Reveal key={city.name} delay={index * 70}>
          <Link
            href="/contact"
            className="group relative block aspect-[3/4] overflow-hidden rounded-panel rounded-tr-[3.5rem] shadow-soft"
          >
            <Image
              src={city.image}
              alt={city.name}
              fill
              className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
              <span>
                <span className="block font-heading text-xl font-bold italic">{city.name}</span>
                <span className="mt-1 block text-sm text-white/85">{city.tag}</span>
              </span>
              <span className="flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full bg-green-strong px-4 text-sm font-semibold">
                View Rates
                <Icon name="arrow-up-right" size={16} />
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- booking text panel and help card ---------- */

/** Heading, text, highlights and contact lines that sit beside a booking form. */
export function BookingInfo({ booking, invert = false }: { booking: ServiceBooking; invert?: boolean }) {
  return (
    <div>
      <h2
        className={cn(
          "font-heading text-[1.75rem] font-extrabold italic leading-tight sm:text-3xl lg:text-4xl",
          invert ? "text-white" : "text-navy-deep",
        )}
      >
        {booking.title}
      </h2>
      <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-white/80" : "text-muted")}>
        {booking.description}
      </p>
      {booking.highlights ? (
        <ul className="mt-7 space-y-4">
          {booking.highlights.map((item) => (
            <li key={item.text} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                  invert ? "bg-green/20 text-green" : "bg-green-strong/10 text-green-strong",
                )}
              >
                <ServiceIcon name={item.icon} size={20} />
              </span>
              <span className={cn("font-medium", invert ? "text-white/90" : "text-navy-deep")}>{item.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {booking.contact ? (
        <ul className="mt-8 space-y-4">
          {booking.contact.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                  invert ? "bg-green/20 text-green" : "bg-green-strong/10 text-green-strong",
                )}
              >
                <ServiceIcon name={item.icon} size={20} />
              </span>
              <div>
                <p className={cn("text-xs", invert ? "text-white/70" : "text-muted")}>{item.label}</p>
                <p className={cn("font-semibold", invert ? "text-white" : "text-navy-deep")}>{item.value}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Call and WhatsApp card shown beside a FAQ. */
export function HelpCard({ title = "Still have questions?", text }: { title?: string; text: string }) {
  return (
    <div className="rounded-panel rounded-tr-[4rem] bg-navy-deep p-7 text-white sm:p-9">
      <h3 className="font-heading text-2xl font-extrabold italic">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{text}</p>
      <div className="mt-7 flex flex-col gap-3">
        <a href={`tel:${brand.phone}`} className={buttonClasses({ variant: "green", pill: true, size: "md" })}>
          <Icon name="phone" size={18} />
          {formatPhoneDisplay()}
        </a>
        <a
          href={`https://wa.me/${brand.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({
            variant: "outline",
            pill: true,
            size: "md",
            className: "border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep",
          })}
        >
          <Icon name="whatsapp" size={18} />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

/** White rounded card that holds a booking form. */
export function FormCard({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-panel bg-white p-6 text-navy-deep shadow-lift sm:p-8", className)}>
      {title ? <h2 className="mb-5 font-heading text-xl font-extrabold italic sm:text-2xl">{title}</h2> : null}
      {children}
    </div>
  );
}
