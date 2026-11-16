import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand } from "@/lib/brand";

const CTA_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc3GNuR7R2PJDNWWSrd4-G5nVIkhokc2VT4uHWZ_sSNnyEzVNwEoyoqf2p_A-PIvgCetOowJuxud7U1y6eoxexzmbLg5plfVTXnUXl65hrwGvPfabtXQ67g125AKm-66fJZytzGXsLvv3ldEmAfFMutCktm4RWhOGGOte125CwypHCEH-3ODBK3fYkDxRt-ETjKUcCy39JWMxQ2-B35tM0hIKMHerEJNcEcbjS0qZnTqvWjNZrgh";

export function HomeCta() {
  return (
    <Section className="pt-0 sm:pt-0 lg:pt-4">
      <Reveal>
        <div className="relative isolate grid overflow-hidden rounded-panel bg-navy-deep text-white md:min-h-[20rem] md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 flex flex-col justify-center gap-6 p-7 sm:p-10 lg:p-14">
            <span aria-hidden="true" className="hidden h-12 w-1.5 -skew-x-[20deg] rounded-full bg-green md:block" />
            <div>
              <h2 className="font-heading text-3xl font-extrabold italic leading-tight sm:text-4xl">
                Ready to Experience the Extraordinary?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Book your dream vehicle today and redefine your travel expectations. Your journey deserves a
                signature touch.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="green" pill size="lg" className="sm:min-w-44">
                Book Now
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({
                  variant: "outline",
                  pill: true,
                  size: "lg",
                  className: "border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep sm:min-w-44",
                })}
              >
                <Icon name="whatsapp" size={20} />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="relative min-h-[14rem] md:min-h-full">
            <Image
              src={CTA_IMAGE}
              alt="Luxury car interior at night"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/30 to-transparent md:bg-gradient-to-r md:from-navy-deep md:via-navy-deep/40" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
