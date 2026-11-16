import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions",
  description: "Terms and conditions for Aziz Afridi Rent A Car bookings and rentals.",
  path: "/terms",
});


const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD94szhMRd1So2I6jXVuFIZ2tQbFKaT4zBBLATaAWysZMcTnkWlqTfcKoiPnl4lDDMDJS0Va5Hvd-RpJ24HPehx7rUABKnCdSMv5GJrVrDx9zuEF52W39EthPpz_ZLvSVs8CWqZYMdPdkqwepdvOnBcigUucoJM3zRN6cpoS8PTDxip4rt-DX10lKmmNn0sDs303-NN-w2NS3-wo_9ar-erHkSyWUWVD8PEQTsQZUsTrdCpDIpjMIjp";

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "agreement", label: "Rental Agreement" },
  { id: "customer", label: "Customer Responsibilities" },
  { id: "usage", label: "Vehicle Usage Policy" },
  { id: "payment", label: "Payment Terms" },
  { id: "cancellation", label: "Cancellation Policy" },
  { id: "insurance", label: "Insurance Information" },
  { id: "liability", label: "Liability" },
  { id: "privacy", label: "Privacy Rules" },
  { id: "amendments", label: "Amendments" },
];

function SectionHeading({ n, title, id }: { n: number; title: string; id: string }) {
  return (
    <div className="mb-6 flex items-center gap-4" id={id}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-strong font-heading text-lg font-bold text-white">
        {n}
      </span>
      <h2 className="font-heading text-2xl font-extrabold italic text-navy-deep sm:text-3xl">{title}</h2>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-white">
                Home
              </Link>
              <Icon name="chevron-right" size={14} />
              <span aria-current="page" className="text-white">Terms &amp; Conditions</span>
            </nav>
            <h1 className="font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl">
              Terms &amp; <span className="text-green">Conditions</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Please read these terms carefully before using our services. This agreement governs your rental
              experience with {brand.name}.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <Image src={HERO} alt="Luxury sedan interior detail" fill priority className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </Container>
      </header>

      <Section tone="surface">
        <nav aria-label="Contents" className="mb-10">
          <h2 className="sr-only">Contents</h2>
          <ul className="flex flex-wrap gap-2">
            {TOC.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-navy-deep transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto max-w-4xl space-y-8">
            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={1} title="Introduction" id="intro" />
              <div className="space-y-4 text-muted">
                <p className="text-base leading-relaxed sm:text-lg">
                  Welcome to {brand.name}. These terms and conditions outline the rules and regulations for the use
                  of our vehicle rental service. By accessing this website and booking a vehicle, we assume you
                  accept these terms and conditions in full. Do not continue to use {brand.name}&apos;s services if
                  you do not accept all of the terms and conditions stated on this page.
                </p>
                <p className="text-sm leading-relaxed sm:text-base">
                  Terminology: &ldquo;Client&rdquo;, &ldquo;You&rdquo; and &ldquo;Your&rdquo; refers to you, the
                  person accessing this website and accepting the Company&apos;s terms and conditions. &ldquo;The
                  Company&rdquo;, &ldquo;Ourselves&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo; and &ldquo;Us&rdquo;,
                  refers to {brand.name}.
                </p>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={2} title="Rental Agreement" id="agreement" />
              <div className="space-y-6 text-muted">
                <div className="rounded-card border-l-4 border-green-strong bg-surface p-6">
                  <p className="mb-2 text-sm font-semibold text-navy-deep">Core Provision</p>
                  <p className="text-sm sm:text-base">
                    The rental agreement becomes binding once the deposit is received and the booking confirmation
                    is issued by our system. All rentals are subject to vehicle availability at the time of pickup.
                  </p>
                </div>
                <ul className="list-disc space-y-3 pl-6 text-sm sm:text-base">
                  <li>All drivers must be at least 25 years of age for standard models and 30 years for premium categories.</li>
                  <li>A valid international driving permit is required for non-resident clients.</li>
                  <li>Minimum rental period is 24 hours. Early returns do not entitle the client to a refund.</li>
                </ul>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={3} title="Customer Responsibilities" id="customer" />
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                  <Icon name="briefcase" size={24} className="text-green-strong mb-4" />
                  <h4 className="mb-3 font-heading text-lg font-semibold text-navy-deep">Documentation</h4>
                  <p className="text-sm text-muted">
                    Clients must provide original identification documents, a valid license, and the credit card
                    used for booking during vehicle handover.
                  </p>
                </div>
                <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                  <Icon name="car" size={24} className="text-green-strong mb-4" />
                  <h4 className="mb-3 font-heading text-lg font-semibold text-navy-deep">Vehicle Inspection</h4>
                  <p className="text-sm text-muted">
                    You are required to inspect the vehicle with our representative and sign the condition report
                    before departure. Any pre-existing damage must be documented.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-card border border-line bg-surface p-6 sm:p-8">
                <p className="mb-6 text-base font-semibold text-navy-deep sm:text-lg">
                  Damage &amp; Accident Reporting Procedure
                </p>
                <ol className="space-y-4 text-sm text-muted sm:text-base">
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-strong/10 text-xs font-semibold text-green-strong">
                      1
                    </span>
                    <span>
                      Ensure the safety of all passengers first and move the vehicle to a safe location if it is
                      drivable and legally permitted.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-strong/10 text-xs font-semibold text-green-strong">
                      2
                    </span>
                    <span>
                      Contact our 24/7 emergency support line at {formatPhoneDisplay()} immediately to report the incident,
                      regardless of severity.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-strong/10 text-xs font-semibold text-green-strong">
                      3
                    </span>
                    <span>
                      Obtain an official police report (FIR) for any collision, theft, or third-party damage. Claims
                      without a police report may be rejected by our insurer.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-strong/10 text-xs font-semibold text-green-strong">
                      4
                    </span>
                    <span>
                      Take clear photographs of the damage, the surrounding scene, and all involved parties&apos;
                      documents before the vehicle is moved or repaired.
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-strong/10 text-xs font-semibold text-green-strong">
                      5
                    </span>
                    <span>
                      Complete and sign our incident report form within 24 hours. Do not admit fault or negotiate
                      settlement with a third party without our written consent.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={4} title="Vehicle Usage Policy" id="usage" />
              <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                <p className="mb-6 text-base font-semibold text-navy-deep sm:text-lg">
                  Strict prohibitions apply to all fleet vehicles:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Icon name="alert-circle" size={24} className="text-danger mt-1 shrink-0" />
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-navy-deep">No Racing/Off-roading:</span> Vehicles must
                      remain on paved public roads. Track use is strictly forbidden and voids all insurance.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="alert-circle" size={24} className="text-danger mt-1 shrink-0" />
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-navy-deep">Smoke-Free Policy:</span> All vehicles are
                      strictly non-smoking. A deep cleaning fee applies to any violation.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="user" size={24} className="text-danger mt-1 shrink-0" />
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-navy-deep">Unauthorized Drivers:</span> Only drivers listed
                      on the agreement are permitted to operate the vehicle.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="plane" size={24} className="text-danger mt-1 shrink-0" />
                    <p className="text-sm text-muted sm:text-base">
                      <span className="font-semibold text-navy-deep">Cross-Border Travel:</span> Taking any vehicle
                      outside Pakistan is strictly prohibited without prior written approval from {brand.name}.
                      Unauthorized cross-border travel voids all insurance coverage and immediately terminates the
                      rental agreement, making the client fully liable for the vehicle&apos;s value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-card border-l-4 border-green-strong bg-surface p-6">
                <p className="mb-2 text-sm font-semibold text-navy-deep">Fuel Policy</p>
                <p className="text-sm text-muted sm:text-base">
                  All vehicles are provided on a &ldquo;Full-to-Full&rdquo; basis unless a different arrangement is
                  confirmed in writing at booking. The vehicle is handed over with a full tank and must be returned
                  with a full tank of the correct fuel grade. If the vehicle is returned with less fuel, the
                  shortfall will be charged at prevailing market rates plus a refueling service fee. Damage caused
                  by misfuelling (incorrect fuel type) is the sole responsibility of the client and is not covered
                  by insurance.
                </p>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={5} title="Payment Terms" id="payment" />
              <div className="space-y-6 text-muted">
                <p className="text-sm sm:text-base">
                  All rental rates are quoted in {brand.currency} and are inclusive of applicable taxes unless
                  stated otherwise. A security deposit will be pre-authorized on your card at the time of pickup.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-card border border-line bg-surface p-6 text-center">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Booking Deposit</p>
                    <p className="font-heading text-lg font-semibold text-navy-deep">30%</p>
                  </div>
                  <div className="rounded-card border border-line bg-surface p-6 text-center">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Security Bond</p>
                    <p className="font-heading text-lg font-semibold text-navy-deep">Varies</p>
                  </div>
                  <div className="rounded-card border border-line bg-surface p-6 text-center">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Late Return Fee</p>
                    <p className="font-heading text-lg font-semibold text-navy-deep">Daily Rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={6} title="Cancellation Policy" id="cancellation" />
              <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
                  <div className="flex-1">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-strong">Full Refund</h5>
                    <p className="text-sm text-muted sm:text-base">
                      Cancellations made more than 72 hours before the scheduled pickup time.
                    </p>
                  </div>
                  <div className="hidden w-px bg-line sm:block" />
                  <div className="flex-1">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      Partial Refund (50%)
                    </h5>
                    <p className="text-sm text-muted sm:text-base">Cancellations made between 24 and 72 hours before pickup.</p>
                  </div>
                  <div className="hidden w-px bg-line sm:block" />
                  <div className="flex-1">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide text-danger">No Refund</h5>
                    <p className="text-sm text-muted sm:text-base">Cancellations within 24 hours of pickup or &ldquo;no-shows&rdquo;.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={7} title="Insurance Information" id="insurance" />
              <p className="mb-6 text-sm text-muted sm:text-base">
                All {brand.name} vehicles are covered by comprehensive commercial insurance. However, the client is
                responsible for the &ldquo;Insurance Excess&rdquo; amount in the event of an accident.
              </p>
              <div className="rounded-card rounded-tr-[3.5rem] bg-navy-deep p-7 text-white sm:p-10">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green/20">
                    <Icon name="shield-check" size={30} className="text-green" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-heading text-lg font-semibold">Premium Protection Plan</h4>
                    <p className="mt-2 text-sm text-white/80">
                      Reduce your excess to zero and enjoy full peace of mind. Available for an additional daily
                      fee at the time of booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={8} title="Liability" id="liability" />
              <p className="text-sm text-muted sm:text-base">
                {brand.name} shall not be held liable for any indirect, incidental, or consequential damages
                resulting from the use or inability to use our vehicles. Our total liability to the client for any
                claim shall not exceed the total rental fee paid for the specific booking.
              </p>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={9} title="Privacy Rules" id="privacy" />
              <div className="space-y-6 text-muted">
                <p className="text-sm sm:text-base">
                  Your privacy is important to us. We use the information you provide to process your booking and
                  improve our service. For more detailed information, please refer to our{" "}
                  <Link href="/privacy" className="font-semibold text-green-strong hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  page.
                </p>
                <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <Icon name="map-pin" size={24} className="text-green-strong mt-1 shrink-0" />
                    <div>
                      <h4 className="mb-2 font-heading text-base font-semibold text-navy-deep">GPS Tracking Notice</h4>
                      <p className="text-sm sm:text-base">
                        All {brand.name} vehicles are fitted with GPS tracking devices for safety, theft recovery,
                        route verification, and mileage monitoring. By accepting these terms, the client consents to
                        this monitoring for the duration of the rental period. Location data is used solely for
                        operational and safety purposes, is stored securely, and is shared with law enforcement only
                        where legally required &mdash; such as in the event of an accident, theft, or violation of
                        the vehicle usage policy (including unauthorized cross-border travel or geofenced areas).
                        Tracking is disabled automatically upon vehicle return and closure of the rental agreement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-mt-24 rounded-panel border border-line bg-white p-6 shadow-soft sm:p-10">
              <SectionHeading n={10} title="Amendments" id="amendments" />
              <div className="space-y-4 text-muted">
                <p className="text-sm sm:text-base">
                  {brand.name} reserves the right to review, revise, or amend these Terms &amp; Conditions at any
                  time to reflect changes in our fleet, pricing, legal requirements, or operating procedures.
                  Amendments become effective immediately upon publication on this page, and the &ldquo;Last
                  Updated&rdquo; date below will be revised accordingly.
                </p>
                <p className="text-sm sm:text-base">
                  Continued use of our services after any amendment constitutes acceptance of the revised terms. We
                  encourage clients to review this page periodically. Material changes affecting an active or
                  confirmed booking will be communicated directly via email or WhatsApp prior to taking effect.
                </p>
              </div>
            </div>

            <div className="rounded-panel rounded-tr-[4rem] bg-navy-deep p-7 text-white sm:p-9">
              <h2 className="font-heading text-xl font-extrabold italic">Need Help?</h2>
              <p className="mt-2 text-sm text-white/80">Our support team is available for any clarifications.</p>
              <a
                href={`mailto:${brand.email}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-green hover:text-white"
              >
                Contact Support
                <Icon name="arrow-up-right" size={16} />
              </a>
            </div>
            <p className="text-xs text-muted">Last Updated: October 24, 2024</p>
        </div>
      </Section>
    </>
  );
}
