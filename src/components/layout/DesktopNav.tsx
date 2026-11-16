"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { hasMenu, isActive, NavSections } from "./NavLinks";

type DesktopNavProps = {
  pathname: string;
};

/**
 * Desktop navigation. Menus open on hover, and with the keyboard through the chevron button
 * (Enter/Space), close on Escape or when focus leaves, and always close after navigating.
 */
export function DesktopNav({ pathname }: DesktopNavProps) {
  // The open menu is remembered together with the path it was opened on, so it closes by itself after navigation.
  const [menu, setMenu] = useState<{ href: string | null; path: string }>({ href: null, path: pathname });
  const openHref = menu.path === pathname ? menu.href : null;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const setOpen = (href: string | null) => setMenu({ href, path: pathname });
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const open = (href: string) => {
    cancelClose();
    setOpen(href);
  };
  const closeSoon = (href: string) => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setMenu((current) => (current.href === href ? { href: null, path: current.path } : current));
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {mainNav.map((item) => {
          const active = isActive(pathname, item);
          const linkClass = cn(
            "relative inline-flex h-11 items-center whitespace-nowrap px-2.5 text-sm font-semibold transition-colors hover:text-green-strong",
            active
              ? "text-navy-deep after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-green"
              : "text-navy-deep",
          );

          if (!hasMenu(item)) {
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openHref === item.href;
          const mega = Boolean(item.groups?.length);
          const id = `${panelId}-${item.href.replace(/\W/g, "")}`;

          return (
            <li
              key={item.href}
              className={cn(!mega && "relative")}
              onMouseEnter={() => open(item.href)}
              onMouseLeave={() => closeSoon(item.href)}
              onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                  setOpen(null);
                  event.currentTarget.querySelector<HTMLElement>("[data-menu-toggle]")?.focus();
                }
              }}
              onBlur={(event) => {
                if (isOpen && !event.currentTarget.contains(event.relatedTarget)) setOpen(null);
              }}
            >
              <div className="flex items-center">
                <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(linkClass, "pr-1")}>
                  {item.label}
                </Link>
                <button
                  type="button"
                  data-menu-toggle
                  aria-label={`${item.label} menu`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? id : undefined}
                  onClick={() => (isOpen ? setOpen(null) : open(item.href))}
                  className="inline-flex h-11 w-6 items-center justify-center rounded-md text-navy-deep transition hover:text-green-strong"
                >
                  <Icon name="chevron-down" size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
                </button>
              </div>

              {isOpen ? (
                <div id={id} className={cn("z-50 pt-2", mega ? "absolute inset-x-0 top-full" : "absolute left-0 top-full")}>
                  <div className={cn(mega && "mx-auto max-w-[75rem] px-4 sm:px-6 lg:px-8")}>
                    <div
                      className={cn(
                        "rounded-card border border-line bg-white p-5 shadow-lift",
                        mega ? "max-h-[min(70vh,34rem)] overflow-y-auto p-6" : "min-w-[17rem]",
                      )}
                    >
                      <NavSections item={item} layout={mega ? "mega" : "dropdown"} onNavigate={() => setOpen(null)} />
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
