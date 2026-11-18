import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { footerCompanyLinks, footerLocationLinks, footerServiceLinks, policyLinks } from "@/data";
import { brand, formatPhoneDisplay } from "@/lib/brand";

const linkClass = "transition hover:text-green";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 font-heading text-base font-bold text-white">{title}</h2>
      <ul className="space-y-1">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex min-h-9 items-center gap-2.5 text-sm text-white/75 ${linkClass}`}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Facebook", href: brand.social.facebook, icon: "facebook" },
  { label: "Instagram", href: brand.social.instagram, icon: "instagram" },
  { label: "Pinterest", href: brand.social.pinterest, icon: "pinterest" },
  { label: "X", href: brand.social.x, icon: "x" },
];

function ContactRow({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-green">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0 flex-1 break-words">{children}</span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-4">
            {/* The supplied logo has a white background, so it sits on a white panel. */}
            <div className="inline-block rounded-xl bg-white px-3 py-2">
              <Logo className="h-14" />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              Redefining luxury travel standards across Pakistan. Your premium mobility partner.
            </p>
            <ul className="space-y-3 text-sm text-white/75">
              <ContactRow icon="phone">
                <a href={`tel:${brand.phone}`} className={linkClass}>
                  {formatPhoneDisplay()}
                </a>
              </ContactRow>
              <ContactRow icon="mail">
                <a href={`mailto:${brand.email}`} className={linkClass}>
                  {brand.email}
                </a>
              </ContactRow>
              <ContactRow icon="map-pin">
                <a href={brand.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {brand.location.address}
                </a>
              </ContactRow>
            </ul>
            <a
              href={brand.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-white/40 px-4 text-sm font-semibold text-white transition hover:border-green hover:bg-green hover:text-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon name="map-pin" size={18} />
              Find us on Google
            </a>
            <ul className="flex flex-wrap gap-2.5" aria-label="Social media">
              {socialLinks.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-green hover:bg-green hover:text-navy-deep"
                  >
                    <Icon name={icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:col-span-2 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <FooterColumn title="Company" links={footerCompanyLinks} />
            <FooterColumn title="Services" links={footerServiceLinks} />
            <FooterColumn title="Popular Locations" links={footerLocationLinks} />
            <FooterColumn title="Legal" links={policyLinks} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <a
            href="https://www.developerx.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit flex-col text-xs text-white/70 transition hover:text-green"
          >
            Website By DeveloperX
            <span className="developerx-line" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
