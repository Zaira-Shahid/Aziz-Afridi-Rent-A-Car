import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

const features: { icon: IconName; title: string; text: string }[] = [
  { icon: "headset", title: "24/7 Support", text: "We're always here for you" },
  { icon: "user-check", title: "Professional Drivers", text: "Experienced, polite, and reliable" },
  { icon: "car-sparkles", title: "Clean Vehicles", text: "Well-maintained and sanitized" },
  { icon: "smartphone-check", title: "Easy Booking", text: "Quick, simple, and hassle-free" },
];

export function FeatureStrip() {
  return (
    <section aria-label="Why book with us" className="bg-white pb-6 pt-10 sm:pb-10 sm:pt-12">
      <Container>
        <ul className="grid grid-cols-4 divide-x divide-line">
          {features.map((item) => (
            <li
              key={item.title}
              className="flex flex-col items-center gap-2 px-1.5 text-center sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:text-left"
            >
              <span className="text-green">
                <Icon name={item.icon} size={36} className="size-7 sm:size-10" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold leading-tight text-navy-deep sm:text-base">
                  {item.title}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-muted sm:text-sm">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
