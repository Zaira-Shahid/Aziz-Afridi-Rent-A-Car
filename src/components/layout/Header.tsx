"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.8 3.5 3.1 4.8 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.7c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1l-2.2 2.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16.5 16.5 20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const iconBtnClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/15 text-white/85 transition hover:border-secondary hover:text-secondary";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b border-white/10 bg-primary/95 text-white backdrop-blur">
      <Container className="relative grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/* Left: Logo */}
        <Logo priority className="z-10" />

        {/* Center: Nav pages */}
        <nav className="hidden items-center justify-center gap-5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-white/80 transition-colors hover:text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Icons */}
        <div className="z-10 ml-auto hidden items-center gap-1.5 self-center lg:flex">
          <Link href="/cars" className={iconBtnClass} aria-label="Search cars">
            <SearchIcon className="h-4 w-4" />
          </Link>
          <a href={`tel:${brand.phone}`} className={iconBtnClass} aria-label="Call us">
            <PhoneIcon className="h-4 w-4" />
          </a>
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtnClass}
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="z-10 ml-auto inline-flex h-9 w-9 items-center justify-center self-center rounded-[10px] border border-white/20 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn("block h-0.5 w-5 bg-white transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-white transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-white transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-white/10 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[10px] px-3 py-2.5 text-sm text-white/85 hover:bg-white/5 hover:text-secondary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 px-1">
              <a href={`tel:${brand.phone}`} className={iconBtnClass} aria-label="Call us">
                <PhoneIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={iconBtnClass}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <Link href="/cars" className={iconBtnClass} aria-label="Search cars" onClick={() => setOpen(false)}>
                <SearchIcon className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
