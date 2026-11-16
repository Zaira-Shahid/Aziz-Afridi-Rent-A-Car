"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { buttonClasses } from "@/components/ui/button-styles";
import { brand } from "@/lib/brand";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  // Remember the path the menu was opened on, so it closes by itself after navigation.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const mobileOpen = menu.open && menu.path === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenu({ open: false, path: pathname });
    toggleRef.current?.focus();
  }, [pathname]);

  const whatsappHref = `https://wa.me/${brand.whatsapp}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[75rem] items-center justify-between gap-3 px-4 sm:px-6 xl:h-[5.5rem] xl:gap-6 xl:px-8">
        <Logo priority className="h-12 xl:h-[4.5rem]" />

        <DesktopNav pathname={pathname} />

        <div className="flex shrink-0 items-center gap-2 xl:gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={buttonClasses({ variant: "green", pill: true, size: "sm", className: "size-11 !px-0 xl:size-auto xl:!px-5" })}
          >
            <Icon name="whatsapp" size={20} />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <Link href="/contact" className={buttonClasses({ variant: "solid", pill: true, size: "sm", className: "xl:min-h-12 xl:px-6" })}>
            <Icon name="calendar" size={18} />
            Book Now
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMenu({ open: true, path: pathname })}
            className="inline-flex size-11 items-center justify-center rounded-xl text-navy-deep transition hover:bg-surface xl:hidden"
          >
            <Icon name="menu" size={26} />
          </button>
        </div>
      </div>

      {mobileOpen ? <MobileMenu pathname={pathname} onClose={closeMenu} /> : null}
    </header>
  );
}
