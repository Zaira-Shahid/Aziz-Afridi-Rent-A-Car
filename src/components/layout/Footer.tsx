import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  footerCompanyLinks,
  footerLocationLinks,
  footerServiceLinks,
  policyLinks,
} from "@/data";
import { brand } from "@/lib/brand";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-6 text-base font-semibold">{title}</h4>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-white/55 transition hover:text-accent">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Logo className="h-12 sm:h-14" />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Redefining luxury travel standards across Pakistan. Your premium mobility partner.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-accent hover:text-primary"
                aria-label="WhatsApp"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
              <a
                href={`tel:${brand.phone}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-accent hover:text-primary"
                aria-label="Call"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-accent hover:text-primary"
                aria-label="Email"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>

          <FooterColumn title="Company" links={footerCompanyLinks} />
          <FooterColumn title="Services" links={footerServiceLinks} />
          <FooterColumn title="Popular Locations" links={footerLocationLinks} />
          <FooterColumn title="Legal" links={policyLinks} />
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
