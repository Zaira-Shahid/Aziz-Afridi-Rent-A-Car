import Image from "next/image";
import { CtaBanner } from "@/components/shared";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/types";
import { BlockHead, FeatureGrid, InfoSection, PackageCards, ProcessSteps } from "./ServiceBlocks";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";

type WeeklyCarRentalDetailProps = {
  data: ServiceDetail;
};

const processImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCDsayYY0RK1_tAozq3TmWwYebo70XvSmKhrIoJ26YpoZAY5KrKTXNRxEFptwdQOAABHk2plNSkCTig1OgTfkNRkxeEYM6AvbLiVxzI0KeYME4UiVT0FJPDQhLY7sal59-MRwRHCB1ZUOX7FN-XrNF1m_U3LlA1Dm2-JUDOaAfUcEzY2C_WkVvAVF5VYmVAmCklRl_ZJvCEBRbkepjZ5j-n38eA6oIwVc4JdQX8cWOnAeFOKm5HSec",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDsG-abBgIbU4fYsrAV0muqTps_tvwT8L-NiTgMnVTjr-tSxev-eDgTY2Top6c6k-ZK1buDx1N2nfQiMGxnycKEwi4OGHApYP2sdHiLcVvmgAOIMNvffU4ICA82oRqzyvv4c8gMkdc8EDKVrNcNSZOaJ_d4Wo-J7qJvoRoYr65nOQyOaa7TjGbZFdtlWU7K4YbBVMsjXI9hi2AYHE2Ob-BB57x4lp-cTMhWO579PQxs-Awb-u9RvEvW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCyODs5eCaVJw8UTDaNAsT6kRPhOMV3inuOc4IzXHXMaSbMGM21U30NbcXbDYvGZ04EYmvbkow0zM5v-sXmfBk9-0sJFyh5KWTNLfKKB5eNnfEArkRLH2dS0KrFYBAYQrOcZmymZ-DaJBU74xQ1C3zvWFC_od2iQyHQeeqjqwCtdLRy9RKFoch3B31PbDDVHUpjmcx7IQssHJ3cWOMjC5m-9aaTfjmbV4nvDD3mCmNV4UPe-Rm-Kj14",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-38msxt9PF81vFNxRKS8y9Vt7iqEOfg73pdkAb3zpQ8EhsYhVx4HfggCRNRwgZb_ku4ZOpJz24vY6PwBMfwOPufOW_xQXSkZwkfNBTMASiM7XU42eQA3tuxVCpQHkD7ns5K-eBcUeGztFz_yE4oRZ3MfPdYkx27sK-CY5YSMy4JA_2lR-7Rm8drKrx_MsxxRSh3wvYS-UoX4kaKu1a6B_VGdgcVjRvwfT3c4IPWyPcFWTcNQl7Ve7",
];

export function WeeklyCarRentalDetail({ data }: WeeklyCarRentalDetailProps) {
  const { hero, features, fleet, packages, process, testimonials, faqs, included, audience } = data;

  return (
    <>
      <ServiceHero hero={hero} flip />

      <Section tone="white">
        <BlockHead title={features.title} description={features.description} align="center" />
        <FeatureGrid items={features.items} variant="rows" />
      </Section>

      {packages ? (
        <Section tone="navy" id="packages">
          <BlockHead title={packages.title} description={packages.description} align="center" invert />
          <PackageCards packages={packages.items} service={data.name} />
        </Section>
      ) : null}

      {process ? (
        <Section tone="surface">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {processImages.map((src, index) => (
                <Reveal key={src} delay={index * 80}>
                  <div
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden rounded-card shadow-soft",
                      index % 2 === 1 && "mt-6 sm:mt-10",
                      index === 0 && "rounded-tl-[3rem]",
                      index === 3 && "rounded-br-[3rem]",
                    )}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                </Reveal>
              ))}
            </div>
            <div>
              <BlockHead title={process.title} />
              <ProcessSteps steps={process.steps} variant="list" />
              <ButtonLink href="/contact" variant="green" pill size="lg" className="mt-9">
                Book Your Weekly
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
            </div>
          </div>
        </Section>
      ) : null}

      <Section tone="white" id="fleet">
        <BlockHead title={fleet.title} description={fleet.description} />
        <ServiceFleetGrid items={fleet.items} />
      </Section>

      {included ? <InfoSection block={included} kind="included" tone="surface" /> : null}
      {audience ? <InfoSection block={audience} kind="cards" tone="white" /> : null}

      {testimonials ? (
        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-12">
            <div>
              <BlockHead title={testimonials.title} />
              {testimonials.ratingSummary ? (
                <Reveal className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-strong/10 text-green-strong">
                    <Icon name="star" size={28} />
                  </span>
                  <div>
                    <span className="block font-semibold text-navy-deep">{testimonials.ratingSummary.value}</span>
                    <span className="text-sm text-muted">{testimonials.ratingSummary.label}</span>
                  </div>
                </Reveal>
              ) : null}
            </div>
            <ServiceTestimonials items={testimonials.items} />
          </div>
        </Section>
      ) : null}

      {faqs ? (
        <Section tone="white">
          <div className="mx-auto max-w-3xl">
            <BlockHead title={faqs.title} align="center" />
            <ServiceFaqAccordion items={faqs.items} />
          </div>
        </Section>
      ) : null}

      <CtaBanner
        title="Need a Custom Plan?"
        description="Our team can tailor weekly rentals for corporate fleets or special events. Contact us for a bespoke quote."
      />
    </>
  );
}
