import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand, formatPhoneDisplay } from "@/lib/brand";

/** Sticky Call / WhatsApp bar for phones and tablets. The desktop header already carries these actions. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Call or WhatsApp"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-line bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(0_32_72/0.08)] xl:hidden"
    >
      <a
        href={`tel:${brand.phone}`}
        aria-label={`Call ${formatPhoneDisplay()}`}
        className={buttonClasses({ variant: "outline", pill: true, size: "md" })}
      >
        <Icon name="phone" size={20} />
        Call
      </a>
      <a
        href={`https://wa.me/${brand.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({ variant: "green", pill: true, size: "md" })}
      >
        <Icon name="whatsapp" size={20} />
        WhatsApp
      </a>
    </nav>
  );
}
