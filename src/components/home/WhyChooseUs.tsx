import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    icon: "verified",
    title: "Impeccable Fleet Maintenance",
    text: "Every vehicle undergoes a 50-point inspection and deep detailing after every rental.",
  },
  {
    icon: "support_agent",
    title: "24/7 Concierge Service",
    text: "Our dedicated assistants are always available to help with any request during your rental.",
  },
];

const IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQEloNqcb2r1-SUuMSIhMG9c6HtNIohNtGgY8isRNnduk8piLHAXAtn-y6TvegQ6vdH_seIqdlCo7bMaKfGbI45a3PTPATwCIbjJ_GizCPsKQsNAbd6xRPJ1g5cNIjWmj9OZ9GC-oB5rYJixz6t4kuXo_qf5b1CxP2075F5SPadqTy0BAmfEHT-jTeI-vJM6uKqJ8XaffuXnRrwz4Q5wGJrzUJFcfeTKKW4eeUsGD6WXsKTVSF48PA";

export function WhyChooseUs() {
  return (
    <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Signature Edge
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Uncompromising Standards for Unforgettable Journeys
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            We don&apos;t just rent cars; we curate experiences. Our commitment to excellence ensures every
            mile you drive is defined by comfort, safety, and prestige.
          </p>
          <div className="mt-10 space-y-6">
            {FEATURES.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                  <span className="material-symbols-outlined text-accent">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/60 sm:text-base">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-accent transition hover:gap-2"
          >
            Learn more about us <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
            <Image src={IMAGE} alt="Premium key handover service" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-2 hidden rounded-xl bg-accent p-6 text-primary shadow-xl sm:block md:-left-6 md:p-8">
            <div className="font-heading text-3xl font-bold md:text-4xl">15+</div>
            <div className="text-xs font-semibold uppercase tracking-wide">Years of Excellence</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
