import type { ServiceFeature } from "@/types";

type ServiceFeatureGridProps = {
  items: ServiceFeature[];
};

export function ServiceFeatureGrid({ items }: ServiceFeatureGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-primary/8 bg-white p-6 shadow-[0_10px_30px_rgba(14,28,46,0.04)] transition hover:-translate-y-1 sm:p-8"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f3f4f5]">
            <span className="material-symbols-outlined text-primary">{item.icon}</span>
          </div>
          <h4 className="font-heading text-lg font-semibold sm:text-xl">{item.title}</h4>
          <p className="mt-3 text-sm text-muted">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
