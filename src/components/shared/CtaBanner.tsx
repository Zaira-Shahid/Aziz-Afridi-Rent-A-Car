import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand } from "@/lib/brand";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

/** Closing call-to-action panel used at the bottom of most pages. */
export function CtaBanner({
  title = "Ready to book your ride?",
  description = "Get a premium car with professional driver across Pakistan.",
}: CtaBannerProps) {
  return (
    <section className="bg-surface py-12 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel bg-navy-deep px-6 py-9 text-white sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
            <span
              aria-hidden="true"
              className="absolute -right-10 top-0 -z-10 h-full w-40 -skew-x-[20deg] bg-green/15"
            />
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-extrabold italic leading-tight sm:text-3xl">{title}</h2>
              <p className="mt-3 text-base text-white/80 sm:text-lg">{description}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <ButtonLink href="/contact" variant="green" pill size="lg" className="sm:min-w-40">
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
                  className: "border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep sm:min-w-40",
                })}
              >
                <Icon name="whatsapp" size={20} />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
