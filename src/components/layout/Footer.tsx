import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cities, carCategories, mainNav, policyLinks, services } from "@/data";
import { brand } from "@/lib/brand";

export function Footer() {
  const primaryCities = cities.filter((city) => city.type === "primary").slice(0, 8);

  return (
    <footer className="bg-primary text-white">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-white/65">{brand.tagline}</p>
            <div className="mt-5 space-y-1 text-sm text-white/70">
              <p>{brand.phone}</p>
              <p>{brand.email}</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-secondary">Explore</p>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-secondary">Popular Cities</p>
            <ul className="space-y-2">
              {primaryCities.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/rent-a-car/${item.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-secondary"
                  >
                    Rent a Car {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-secondary">Categories</p>
            <ul className="space-y-2">
              {carCategories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/categories/${item.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-secondary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side: Services */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-secondary">Services</p>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-secondary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {policyLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/55 transition-colors hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
