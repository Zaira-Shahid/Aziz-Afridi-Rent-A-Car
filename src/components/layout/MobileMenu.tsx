"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { buttonClasses } from "@/components/ui/button-styles";
import { mainNav } from "@/data/navigation";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { hasMenu, isActive, NavSections } from "./NavLinks";

type MobileMenuProps = {
  pathname: string;
  onClose: () => void;
};

const FOCUSABLE = "a[href], button:not([disabled])";

/** Full-screen mobile menu. Escape closes it, Tab stays inside it, and the page behind does not scroll. */
export function MobileMenu({ pathname, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      className="fixed inset-0 z-[60] flex flex-col bg-white xl:hidden"
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-line px-4 sm:px-6">
        <Logo className="h-12" onClick={onClose} />
        <button
          type="button"
          data-autofocus
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded-xl border border-line text-navy-deep transition hover:bg-surface"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      <nav aria-label="Main" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6">
        <ul className="mx-auto max-w-2xl divide-y divide-line">
          {mainNav.map((item) => {
            const active = isActive(pathname, item);
            const rowClass = cn(
              "flex min-h-12 flex-1 items-center py-2 font-heading text-lg font-bold",
              active ? "text-green-strong" : "text-navy-deep",
            );

            if (!hasMenu(item)) {
              return (
                <li key={item.href}>
                  <Link href={item.href} onClick={onClose} aria-current={active ? "page" : undefined} className={rowClass}>
                    {item.label}
                  </Link>
                </li>
              );
            }

            const isExpanded = expanded === item.href;
            const panelId = `mobile-menu-${item.href.replace(/\W/g, "")}`;

            return (
              <li key={item.href}>
                <div className="flex items-center">
                  <Link href={item.href} onClick={onClose} aria-current={active ? "page" : undefined} className={rowClass}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${item.label} menu`}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isExpanded ? null : item.href)}
                    className="inline-flex size-11 items-center justify-center rounded-xl text-navy-deep transition hover:bg-surface"
                  >
                    <Icon name="chevron-down" size={20} className={cn("transition-transform", isExpanded && "rotate-180")} />
                  </button>
                </div>
                {isExpanded ? (
                  <div id={panelId} className="pb-4">
                    <NavSections item={item} layout="mobile" onNavigate={onClose} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="grid shrink-0 gap-3 border-t border-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:grid-cols-2 sm:px-6">
        <a
          href={`https://wa.me/${brand.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "green", pill: true, size: "lg" })}
        >
          <Icon name="whatsapp" size={20} />
          WhatsApp
        </a>
        <Link href="/contact" onClick={onClose} className={buttonClasses({ variant: "solid", pill: true, size: "lg" })}>
          <Icon name="calendar" size={20} />
          Book Now
        </Link>
      </div>
    </div>
  );
}
