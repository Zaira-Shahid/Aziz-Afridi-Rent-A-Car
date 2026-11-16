import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqHelpCard } from "@/components/faq/FaqHelpCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { faqCategories as CATEGORIES, faqs as FAQS } from "@/data/faq";
import { pageMeta } from "@/lib/seo";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=1200&q=80";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, payments, drivers, and airport pickups with Aziz Afridi Rent A Car.",
  path: "/faq",
  keywords: ["car rental FAQ", "booking questions"],
});

const QUICK_TOPICS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "calendar",
    title: "Flexible Booking",
    text: "Modify or cancel free of charge up to 24 hours before pickup.",
  },
  {
    icon: "car",
    title: "Chauffeur Included",
    text: "Every rental comes with a verified professional driver.",
  },
  {
    icon: "wallet",
    title: "Transparent Pricing",
    text: "Clear quotes with optional add-ons — no hidden surprises.",
  },
  {
    icon: "plane",
    title: "Airport Ready",
    text: "Flight tracking and meet-and-greet at major terminals.",
  },
];

const BOOKING_STEPS: { step: string; icon: IconName; title: string; text: string }[] = [
  {
    step: "01",
    icon: "search",
    title: "Choose Your Car",
    text: "Browse the fleet or ask an agent to recommend the right vehicle for your trip.",
  },
  {
    step: "02",
    icon: "calendar",
    title: "Confirm Dates",
    text: "Share pickup location, timing, and duration — city, airport, or outstation.",
  },
  {
    step: "03",
    icon: "shield-check",
    title: "Secure Booking",
    text: "Confirm via form, WhatsApp, or phone and receive your booking details instantly.",
  },
  {
    step: "04",
    icon: "car",
    title: "Ride in Comfort",
    text: "Your chauffeur arrives on time with a clean, inspected Aziz Afridi vehicle.",
  },
];

const SUPPORT_STATS: { icon: IconName; value: string; label: string }[] = [
  { icon: "clock", value: "< 15 min", label: "Avg. Agent Reply" },
  { icon: "headset", value: "24/7", label: "Live Support" },
  { icon: "smile", value: "98%", label: "Booking Satisfaction" },
  { icon: "map-pin", value: "Nationwide", label: "Coverage Ready" },
];

const EXPLORE_LINKS: { href: string; icon: IconName; title: string; text: string }[] = [
  {
    href: "/cars",
    icon: "car",
    title: "Browse Fleet",
    text: "Compare economy to luxury vehicles available today.",
  },
  {
    href: "/services/airport-pick-drop",
    icon: "plane",
    title: "Airport Transfers",
    text: "Meet-and-greet pickups with flight tracking included.",
  },
  {
    href: "/booking-policy",
    icon: "shield-check",
    title: "Booking Policy",
    text: "Read deposit, cancellation, and usage terms in full.",
  },
  {
    href: "/contact",
    icon: "mail",
    title: "Contact Concierge",
    text: "Send a custom request for weddings, corporate, or tours.",
  },
];

export default function FaqPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="animate-fade-up mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-white">
                Home
              </Link>
              <Icon name="chevron-right" size={14} />
              <span aria-current="page" className="text-white">
                FAQ
              </span>
            </nav>
            <h1 className="animate-fade-up max-w-2xl font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Frequently Asked <span className="text-green">Questions</span>
            </h1>
            <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Everything you need to know about renting a luxury vehicle with Aziz Afridi. Find answers on booking,
              payments, chauffeurs, and airport transfers — or call an agent anytime.
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`tel:${brand.phone}`} variant="green" pill size="lg">
                <Icon name="headset" size={18} />
                Call Agent · {formatPhoneDisplay()}
              </ButtonLink>
              <ButtonLink
                href="#faq-answers"
                variant="outline"
                pill
                size="lg"
                className="border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep"
              >
                Browse Answers
                <Icon name="chevron-down" size={18} />
              </ButtonLink>
            </div>
          </div>

          <div className="animate-fade-up-delay relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift lg:mx-0 lg:max-w-none">
            <Image
              src={HERO_IMAGE}
              alt="Aziz Afridi call agent ready to answer your questions"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-navy-deep/80 px-4 py-2.5 text-sm font-semibold backdrop-blur-md sm:bottom-5 sm:left-5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
              </span>
              Live agent available 24/7
            </p>
          </div>
        </Container>
      </header>

      {/* Quick topics (2x2) beside a navy panel of support figures */}
      <Section tone="surface">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {QUICK_TOPICS.map((topic, index) => (
              <li key={topic.title}>
                <Reveal delay={index * 70} className="h-full">
                  <div className="h-full rounded-card border border-line bg-white p-6 shadow-soft">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                      <Icon name={topic.icon} size={24} />
                    </span>
                    <h2 className="mt-4 font-heading text-lg font-bold text-navy-deep">{topic.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{topic.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={120} className="h-full">
            <ul className="grid h-full grid-cols-2 gap-6 rounded-panel rounded-tr-[4rem] bg-navy-deep p-7 text-white sm:p-9">
              {SUPPORT_STATS.map((stat) => (
                <li key={stat.label} className="flex flex-col justify-center">
                  <Icon name={stat.icon} size={26} className="text-green" />
                  <p className="mt-3 font-heading text-2xl font-extrabold italic">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/75">{stat.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* How booking works: heading on the left, numbered steps on the right */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Simple Process"
                title="How Booking Works"
                description="From first inquiry to doorstep delivery, your Aziz Afridi agent keeps every step clear and quick."
              />
            </div>
          </Reveal>
          <ol className="space-y-5">
            {BOOKING_STEPS.map((item, index) => (
              <li key={item.step}>
                <Reveal delay={index * 80}>
                  <div className="flex gap-5 rounded-card border border-line bg-surface p-5 sm:p-7">
                    <span className="font-heading text-4xl font-extrabold italic leading-none text-green-strong/40 sm:text-5xl">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-navy-deep">
                        <Icon name={item.icon} size={20} className="text-green-strong" />
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="surface" id="faq-answers" className="scroll-mt-24">
        <Reveal>
          <SectionHeading
            eyebrow="Help Center"
            title="Answers by Category"
            description="Select a topic below to explore detailed answers. Still stuck? Call a live agent anytime."
            className="mb-8 sm:mb-10"
          />
        </Reveal>
        <FaqAccordion categories={CATEGORIES} faqs={FAQS} />
        <Reveal className="mt-12 sm:mt-16">
          <FaqHelpCard />
        </Reveal>
      </Section>

      {/* Helpful links on navy */}
      <Section tone="navy">
        <Reveal>
          <SectionHeading eyebrow="Explore More" title="Helpful Links" align="center" invert className="mb-10 sm:mb-12" />
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXPLORE_LINKS.map((link, index) => (
            <li key={link.href}>
              <Reveal delay={index * 70} className="h-full">
                <Link
                  href={link.href}
                  className="group flex h-full flex-col rounded-card rounded-tr-[2.5rem] border border-white/10 bg-white/5 p-6 transition hover:border-green/60 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green/20 text-green">
                    <Icon name={link.icon} size={24} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-white">{link.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{link.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    View
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-strong transition motion-safe:group-hover:translate-x-1">
                      <Icon name="arrow-right" size={16} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-panel bg-navy-deep px-6 py-12 text-center text-white sm:px-12 sm:py-16">
              <span aria-hidden="true" className="absolute -right-10 top-0 -z-10 h-full w-40 -skew-x-[20deg] bg-green/15" />
              <Icon name="headset" size={38} className="mx-auto text-green" />
              <h2 className="mt-4 font-heading text-3xl font-extrabold italic sm:text-4xl">Still Have Questions?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
                If you couldn&apos;t find the answer you were looking for, our agent team is ready to assist you
                personally with bookings, special requests, and trip planning.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <ButtonLink href={`tel:${brand.phone}`} variant="green" pill size="lg">
                  <Icon name="headset" size={18} />
                  Call Agent
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="outline"
                  pill
                  size="lg"
                  className="border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep"
                >
                  <Icon name="mail" size={18} />
                  Contact Us
                </ButtonLink>
                <a
                  href={`https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({
                    variant: "outline",
                    pill: true,
                    size: "lg",
                    className: "border-green text-green hover:bg-green hover:text-navy-deep",
                  })}
                >
                  <Icon name="whatsapp" size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
