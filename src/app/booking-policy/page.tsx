import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Booking Policy",
  description: "Booking, cancellation, and payment policy for Aziz Afridi Rent A Car.",
  path: "/booking-policy",
});


const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZUw0ldcd0m67b3_J2JfrSAhSKXWTJg6rI-wkqVq_K1FEskb8c6kUdv1SfiCh9Tk-gbFZ8Z6C6-5NzhjkdOAhWEU9CMOa0rPyNBnIB_keSH50GAqdttRaxfdr12_-JWiQIrDaSiUcyY3xzOSaqtOKNGdSybwl1RL3H__LdW5RS6v7MelqDS49Ir3fZ7RngiCCZDiiYpJZ_DQcIlqK0RroMlVQzWDFaBZz248x6bHUQnbrjObmdGF9c";

const DRIVERS_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDXXYdUuMNmDy7HVLLGbGQNQqD4uduNkndBV8sI64AZarGGyg8QS28z7Qq4C1ygld-A-4LjhhMyi4nwUTxgoDwfThpkbrKuWDnA5vUbcD9_qpOBIg4h_K1pbGrqaFTjnyaMlMc4VSwxh5smiQV4Vbh6-DT48EgFhlTArGZY2nWPDgWD7AoyNnCjRxEor0J0odbnDDDNcWixTOiaJAD6CUf4AYLiqYrKXxH3pGJG34KyegEOSP8GaUwM";

const STEPS: { n: string; icon: IconName; title: string; text: string }[] = [
  {
    n: "1",
    icon: "car",
    title: "Select Vehicle",
    text: "Browse our fleet and choose the vehicle that fits your destination.",
  },
  {
    n: "2",
    icon: "smartphone-check",
    title: "Submit Request",
    text: "Provide your details and preferences through our streamlined reservation form.",
  },
  {
    n: "3",
    icon: "shield-check",
    title: "Confirmation",
    text: "Our team reviews your request and sends a detailed confirmation within 60 minutes.",
  },
  {
    n: "4",
    icon: "car-sparkles",
    title: "Pickup",
    text: "Arrive at your location or request delivery to start your premium driving experience.",
  },
];

const POLICY_CARDS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "briefcase",
    title: "Reservation Rules",
    text: `All reservations are subject to vehicle availability. ${brand.name} reserves the right to offer an equivalent or superior category if the specific model is unavailable.`,
  },
  {
    icon: "wallet",
    title: "Advance Payment",
    text: "A partial deposit or full prepayment may be required at the time of booking to secure your vehicle, especially for high-demand models and peak seasons.",
  },
  {
    icon: "check-circle",
    title: "Booking Confirmation",
    text: "Bookings are finalized only after a confirmation voucher is issued via WhatsApp or email. Please present this voucher during vehicle pickup for verification.",
  },
  {
    icon: "alert-circle",
    title: "Cancellation Rules",
    text: "Free cancellation up to 48 hours before the scheduled pickup. Late cancellations may incur a fee equivalent to one day's rental rate.",
  },
  {
    icon: "clock",
    title: "Late Return Policy",
    text: "A grace period of 59 minutes is provided. Returns exceeding this window will be charged an additional full day's rental fee to maintain our quality standards.",
  },
  {
    icon: "check",
    title: "Vehicle Requirements",
    text: "Vehicles must be returned in the same condition as received. Fuel policies (Full-to-Full) apply unless otherwise specified in your booking agreement.",
  },
  {
    icon: "car-sparkles",
    title: "Peak Season & Holidays",
    text: "During Eid, public holidays, and wedding season, advance booking of at least 7 days is strongly recommended. A non-refundable deposit may apply and minimum rental durations may be extended during these periods.",
  },
  {
    icon: "calendar",
    title: "Modification of Booking",
    text: "Date, vehicle, or location changes can be requested up to 24 hours before pickup, subject to availability. Modifications within 24 hours of pickup may incur an administrative fee or rate adjustment.",
  },
  {
    icon: "user",
    title: "No-Show Policy",
    text: "If you fail to arrive within 60 minutes of the scheduled pickup time without prior notice, the booking is treated as a no-show, the vehicle is released, and the full deposit is forfeited.",
  },
];

const PAYMENT_METHODS: { icon: IconName; label: string }[] = [
  { icon: "wallet", label: "Cash on Pickup" },
  { icon: "wallet", label: "Credit / Debit Card" },
  { icon: "briefcase", label: "Bank Transfer" },
  { icon: "smartphone-check", label: "JazzCash / EasyPaisa" },
];

const DRIVER_INFO: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "user-check",
    title: "Driver License Requirements",
    text: "A valid original driving license held for at least 2 years is mandatory. International clients must provide a valid International Driving Permit (IDP).",
  },
  {
    icon: "wallet",
    title: "Security Deposit",
    text: "A security deposit is required for all rental categories. The amount is refunded within 14-21 working days after vehicle return.",
  },
  {
    icon: "calendar",
    title: "Minimum Age",
    text: "The minimum age for renting is 25 years. Drivers aged 21-24 may be subject to a 'Young Driver' surcharge and limited model selection.",
  },
  {
    icon: "shield-check",
    title: "Insurance Excess Awareness",
    text: "Clients are responsible for the insurance excess amount in the event of an accident or damage. We recommend opting into our Premium Protection Plan at booking to reduce this liability to zero.",
  },
];

export default function BookingPolicyPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="animate-fade-up mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-white">
                Home
              </Link>
              <Icon name="chevron-right" size={14} />
              <span aria-current="page" className="text-white">
                Booking Policy
              </span>
            </nav>
            <h1 className="animate-fade-up max-w-2xl font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Booking <span className="text-green">Policy</span>
            </h1>
            <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Experience seamless luxury. Our booking process is designed for clarity, transparency, and the highest
              standard of professional service.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <Image
              src={HERO}
              alt="Luxury sedan in a minimalist concrete studio"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Container>
      </header>

      {/* Four steps on white, joined by a line */}
      <Section tone="white">
        <Reveal>
          <SectionHeading
            eyebrow="The Experience"
            title="Your Journey to the Driver's Seat"
            align="center"
            className="mb-12 sm:mb-14"
          />
        </Reveal>
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-navy/15 lg:block" />
          {STEPS.map((step, index) => (
            <li key={step.n}>
              <Reveal delay={index * 80} className="relative flex flex-col items-center text-center">
                <span
                  className={cn(
                    "mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-lift",
                    index === STEPS.length - 1 ? "bg-green-strong text-white" : "bg-surface text-navy",
                  )}
                >
                  <Icon name={step.icon} size={30} />
                </span>
                <h3 className="font-heading text-lg font-bold text-navy-deep sm:text-xl">
                  <span className="mr-1 text-green-strong">{step.n}.</span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Policy rules: two columns of rows */}
      <Section tone="surface">
        <ul className="grid gap-5 md:grid-cols-2">
          {POLICY_CARDS.map((card, index) => (
            <li key={card.title}>
              <Reveal delay={(index % 2) * 80} className="h-full">
                <div className="flex h-full gap-5 rounded-card rounded-tr-[2.5rem] border border-line bg-white p-6 shadow-soft sm:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                    <Icon name={card.icon} size={24} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy-deep sm:text-xl">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{card.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Payment methods as pills on navy */}
      <Section tone="navy">
        <Reveal>
          <SectionHeading
            eyebrow="Settle Up Your Way"
            title="Payment Methods Accepted"
            description={`Pay however suits you best. All amounts are quoted in ${brand.currency} and receipts are issued for every transaction.`}
            align="center"
            invert
            className="mb-10 sm:mb-12"
          />
        </Reveal>
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {PAYMENT_METHODS.map((method, index) => (
            <li key={method.label}>
              <Reveal delay={index * 70} className="flex min-h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-2 pr-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green/20 text-green">
                  <Icon name={method.icon} size={20} />
                </span>
                <span className="text-sm font-semibold text-white sm:text-base">{method.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Driver information: arched photo on the left, cards on the right */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="group relative mx-auto aspect-[4/5] max-w-lg overflow-hidden rounded-panel rounded-tr-[6rem] shadow-lift lg:max-w-none">
              <Image
                src={DRIVERS_IMAGE}
                alt="Driver's hand holding a leather-bound car key"
                fill
                className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-green">Our Promise</span>
                <h3 className="font-heading text-2xl font-extrabold italic text-white">
                  Absolute Precision.
                  <br />
                  Unrivaled Service.
                </h3>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading
                title="Critical Information For All Drivers"
                description="Before you begin your journey, please ensure you meet the following criteria for vehicle operation."
              />
            </Reveal>
            <ul className="mt-8 space-y-4">
              {DRIVER_INFO.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={index * 70}>
                    <div className="flex gap-4 rounded-card border border-line bg-surface p-5 sm:p-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-strong text-white">
                        <Icon name={item.icon} size={20} />
                      </span>
                      <div>
                        <h3 className="font-heading text-base font-bold text-navy-deep">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <section className="bg-surface py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-panel bg-navy-deep px-6 py-12 text-center text-white sm:px-12 sm:py-16">
              <span aria-hidden="true" className="absolute -right-10 top-0 -z-10 h-full w-40 -skew-x-[20deg] bg-green/15" />
              <h2 className="font-heading text-3xl font-extrabold italic sm:text-4xl">Ready To Reserve Your Car?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
                Experience the pinnacle of automotive excellence. Secure your premium vehicle today with our
                flexible booking options.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <ButtonLink
                  href={`https://wa.me/${brand.whatsapp}`}
                  variant="green"
                  pill
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now
                  <Icon name="arrow-right" size={18} />
                </ButtonLink>
                <ButtonLink
                  href="/cars"
                  variant="outline"
                  pill
                  size="lg"
                  className="border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep"
                >
                  View Our Fleet
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
