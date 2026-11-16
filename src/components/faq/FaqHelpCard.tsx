import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { cn } from "@/lib/utils";

const AGENT_IMAGE =
  "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=900&q=80";

type FaqHelpCardProps = {
  className?: string;
};

/** Wide help card: agent photo on the left, call and WhatsApp buttons on the right. */
export function FaqHelpCard({ className }: FaqHelpCardProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-panel bg-navy-deep text-white shadow-lift md:grid-cols-[0.8fr_1.2fr]",
        className,
      )}
    >
      <div className="relative min-h-[240px] md:min-h-[300px]">
        <Image
          src={AGENT_IMAGE}
          alt="Call agent with headset ready to help"
          fill
          className="object-cover object-[center_15%]"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-navy-deep/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
          </span>
          Agent Online
        </span>
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green/20 text-green">
          <Icon name="headset" size={26} />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-extrabold italic">Need immediate help?</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
          Talk to a live Aziz Afridi agent for bookings, changes, and roadside support — available 24/7.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`tel:${brand.phone}`} variant="green" pill size="md">
            <Icon name="headset" size={18} />
            Call Agent
          </ButtonLink>
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
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-white/70">{formatPhoneDisplay()}</p>
      </div>
    </div>
  );
}
