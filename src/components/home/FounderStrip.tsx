import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function FounderStrip() {
  return (
    <Section tone="white" className="py-10 sm:py-12 lg:py-14">
      <Reveal>
        <div className="flex flex-col items-center gap-5 rounded-panel bg-surface p-6 text-center shadow-soft sm:flex-row sm:gap-8 sm:p-8 sm:text-left">
          <Image
            src="/images/aziz-afridi-ceo.webp"
            alt="Aziz Afridi, Founder & CEO of Aziz Afridi Rent a Car"
            width={112}
            height={112}
            className="h-28 w-28 shrink-0 rounded-full object-cover object-[50%_25%] shadow-lift ring-4 ring-white"
          />
          <div className="flex-1">
            <p className="font-heading text-2xl font-extrabold italic text-navy-deep">Aziz Afridi</p>
            <p className="mt-1 font-semibold text-green-strong">Founder &amp; CEO</p>
          </div>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 font-semibold text-navy hover:text-green-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Learn more about us
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
