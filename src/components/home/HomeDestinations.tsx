import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const DESTINATIONS = [
  {
    name: "Islamabad",
    meta: "Capital City",
    href: "/rent-a-car/islamabad",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEsOO-S2DyklYxXEvORM4Sex9eaWzntlyc_4N1GKWwfN7q5SiN-FaCt5WumWGAclKDV5-iuMETh4Pp5TT7UXVj97YG4unFzR-DOAu5xaPfIlaQbEglo28biLgc92WyP44w89bB9RhxBs9EqqFEx9C7lzkQDA8_uL5kjxOAGxO7eTS_yizjCa5he15Tdq0376IlnVEn3TaURbc9TA9eTHJtjUF6Xii8mVVM8kFJKpL98ms4X1P4lqM",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Lahore",
    meta: "Cultural Hub",
    href: "/rent-a-car/lahore",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBu2jgMj_QfGnhZQgVd4TRc8aW6ADIUadRDmc5We8ZS3jRR8uvAq3FKIaGHuQswZgqJHL9WDt-m5IypKs071yZUarzJvWYL7srDq3P4uxU1EOXD7e1wLw1hOaVnJA0cdkmHD0z1BX4kBoqvXI80IYusN1Mm5jOhZblLs5H7Qg0Y5xGxbeFnq07mq-yfYJnw5e8HnNfjGEbC2o_nN-O7Rzk-VQs582D4gmx__otJ2V4m595qN0yHYMEb",
    className: "md:col-span-2",
  },
  {
    name: "Karachi",
    meta: "Coastal Metropolis",
    href: "/rent-a-car/karachi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9DfIcAOqVY-KFaY-8uHfe3G9Ur9bEXo8sZiGRVrhtJbIbKiMwoC4TJQxAnagc3IdX56PuL7A6rk9426l9td6pexSDv_jtc-a_JfvxnWDnQBdculn9r_-rbGU362ovaf6KeQ_eTRN1lIlUX6DcLVd1OxGnG2rEIRiHGui7o_24VajnirUOClZ_OfNb4M08DzmNUVV_a0IChsG8NMJz8rSVGDEwyQ-Y31gdlY6ov0kdGSaVchHJRMD",
    className: "",
  },
  {
    name: "Hunza",
    meta: "Northern Escape",
    href: "/rent-a-car/hunza",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw0DCv15PoG1w9hfCNj2vf16txCJ15GHLj4HrhsBAunRkQVuBHQuR7sXb34I5mAtXZ-Vh9gehoAUT6HGjUVYJDagEztop-Cym8YErgaWQjtB8W0091zOFrq9jZjjWpwURtQKjtIlSwPKfznw9BvVd9hRj5Xe_ptc65Y4lIyjbDc-rVm20qhB7edCRrt5JoMK6fHQs2twGIaqKkMzg4gL1VoyE6O7lu8DDBef3HCAaPZDN62WXJPClH",
    className: "",
  },
];

export function HomeDestinations() {
  return (
    <section className="bg-[#f3f4f5] py-16 sm:py-24 lg:py-[100px]">
      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Drive Across Pakistan
          </h2>
          <p className="mt-4 text-muted">Discover our premier service hubs across iconic destinations.</p>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] md:grid-cols-4 md:grid-rows-2 md:h-[560px] md:auto-rows-fr">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative overflow-hidden rounded-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white sm:bottom-8 sm:left-8">
                <h3 className="font-heading text-lg font-semibold sm:text-2xl">{item.name}</h3>
                <p className="text-xs text-white/80 sm:text-sm">{item.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
