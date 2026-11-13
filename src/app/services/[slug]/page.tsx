import { services } from "@/data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default function Page() {
  return null;
}
