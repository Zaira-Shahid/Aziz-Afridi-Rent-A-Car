import { Icon } from "@/components/ui/Icon";
import { brand } from "@/lib/brand";

/** Floating WhatsApp button for desktop. Phones and tablets get the sticky Call / WhatsApp bar instead. */
export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-green-strong text-white shadow-lift transition hover:bg-green-deep motion-safe:hover:scale-105 xl:flex"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
