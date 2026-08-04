import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const CTA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc3GNuR7R2PJDNWWSrd4-G5nVIkhokc2VT4uHWZ_sSNnyEzVNwEoyoqf2p_A-PIvgCetOowJuxud7U1y6eoxexzmbLg5plfVTXnUXl65hrwGvPfabtXQ67g125AKm-66fJZytzGXsLvv3ldEmAfFMutCktm4RWhOGGOte125CwypHCEH-3ODBK3fYkDxRt-ETjKUcCy39JWMxQ2-B35tM0hIKMHerEJNcEcbjS0qZnTqvWjNZrgh";

export function HomeCta() {
  return (
    <section className="pb-16 sm:pb-24 lg:pb-[100px]">
      <Container>
        <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-3xl sm:min-h-[400px]">
          <Image src={CTA_IMAGE} alt="Luxury car interior at night" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full px-6 py-14 text-center sm:px-10">
            <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
              Ready to Experience the Extraordinary?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
              Book your dream vehicle today and redefine your travel expectations. Your journey deserves a
              signature touch.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/cars"
                className="rounded-full bg-accent px-10 py-4 text-sm font-semibold text-primary shadow-xl transition hover:scale-105"
              >
                Reserve Now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white bg-transparent px-10 py-4 text-sm font-semibold !text-white transition hover:bg-white/15 hover:!text-white"
              >
                Speak to an Agent
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
