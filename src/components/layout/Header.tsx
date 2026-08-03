"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { NavItem, NavLink } from "@/types";

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname === item.href) return true;
  if (item.children?.some((child) => pathname === child.href)) return true;
  if (item.groups?.some((group) => group.items.some((child) => pathname === child.href))) return true;
  return pathname.startsWith(`${item.href}/`);
}

function hasMenu(item: NavItem) {
  return Boolean(item.children?.length || item.groups?.length);
}

function DropdownLink({
  item,
  onClick,
  className,
}: {
  item: NavLink;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn("inline-flex items-center gap-2.5 transition", className)}
    >
      {item.icon ? (
        <span className="material-symbols-outlined shrink-0 text-[18px] opacity-70">{item.icon}</span>
      ) : null}
      <span>{item.label}</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white backdrop-blur-xl">
      <Container className="relative flex h-14 items-center justify-between gap-2 sm:h-16 sm:gap-3 lg:h-[72px]">
        <Logo priority className="h-10 sm:h-12 lg:h-[60px]" />

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {mainNav.map((item) => {
            const active = isActive(pathname, item);
            const menu = hasMenu(item);

            if (!menu) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap px-2 py-2 text-sm transition-colors xl:px-3",
                    active
                      ? "border-b-2 border-accent pb-[6px] font-semibold text-white"
                      : "text-white/70 hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-0.5 whitespace-nowrap px-2 py-2 text-sm transition-colors xl:px-3",
                    active
                      ? "border-b-2 border-accent pb-[6px] font-semibold text-white"
                      : "text-white/70 hover:text-accent",
                  )}
                >
                  {item.label}
                  <span className="material-symbols-outlined text-[16px] opacity-70 transition group-hover:rotate-180">
                    expand_more
                  </span>
                </Link>

                <div
                  className={cn(
                    "invisible absolute top-full z-50 pt-3 opacity-0 transition",
                    "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
                    item.groups?.length ? "left-0" : "left-1/2 -translate-x-1/2",
                  )}
                >
                  <div
                    className={cn(
                      "max-h-[70vh] overflow-y-auto rounded-[14px] border border-primary/10 bg-white p-4 text-primary shadow-[0_18px_50px_rgba(0,11,29,0.12)]",
                      !item.groups?.length && "min-w-[240px]",
                      item.groups?.length === 2 && "min-w-[480px]",
                      (item.groups?.length ?? 0) >= 3 && "min-w-[min(640px,90vw)]",
                    )}
                  >
                    {item.children?.length ? (
                      <ul
                        className={cn(
                          "space-y-1",
                          item.groups?.length ? "mb-4 border-b border-primary/8 pb-3" : undefined,
                        )}
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <DropdownLink
                              item={child}
                              className="w-full rounded-[10px] px-3 py-2 text-sm text-primary/80 hover:bg-background hover:text-primary"
                            />
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.groups?.length ? (
                      <div
                        className={cn(
                          "grid gap-5",
                          item.groups.length === 2 ? "grid-cols-2" : undefined,
                          item.groups.length >= 3 ? "grid-cols-3" : undefined,
                        )}
                      >
                        {item.groups.map((group) => (
                          <div key={group.label}>
                            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                              {group.label}
                            </p>
                            <ul className="space-y-0.5">
                              {group.items.map((child) => (
                                <li key={child.href}>
                                  <DropdownLink
                                    item={child}
                                    className="w-full rounded-[10px] px-3 py-2 text-sm text-primary/80 hover:bg-background hover:text-primary"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white/85 transition hover:border-accent hover:text-accent"
          >
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary transition hover:brightness-110"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/20 text-white lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-[22px]">{open ? "close" : "menu"}</span>
        </button>
      </Container>

      {open ? (
        <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-navy sm:max-h-[calc(100dvh-4rem)] lg:hidden">
          <Container className="flex flex-col gap-1 py-3 pb-6">
            {mainNav.map((item) => {
              const menu = hasMenu(item);
              const expanded = mobileSection === item.href;
              const active = isActive(pathname, item);

              if (!menu) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-2.5 rounded-[10px] px-3 py-3 text-sm hover:bg-white/5 hover:text-accent",
                      active ? "bg-white/5 font-semibold text-accent" : "text-white/85",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon ? (
                      <span className="material-symbols-outlined text-[18px] opacity-70">{item.icon}</span>
                    ) : null}
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.href} className="rounded-[10px]">
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-[10px] px-3 py-3 text-left text-sm hover:bg-white/5",
                      active || expanded ? "bg-white/5 text-accent" : "text-white/85",
                    )}
                    aria-expanded={expanded}
                    onClick={() => setMobileSection(expanded ? null : item.href)}
                  >
                    <span className={cn("inline-flex items-center gap-2.5", expanded && "font-semibold")}>
                      {item.icon ? (
                        <span className="material-symbols-outlined text-[18px] opacity-70">{item.icon}</span>
                      ) : null}
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "material-symbols-outlined text-[20px] text-white/70 transition",
                        expanded && "rotate-180 text-accent",
                      )}
                    >
                      expand_more
                    </span>
                  </button>

                  {expanded ? (
                    <div className="mb-2 ml-2 space-y-3 border-l border-white/15 py-2 pl-3">
                      <Link
                        href={item.href}
                        className="block py-1.5 text-sm font-medium text-accent"
                        onClick={() => setOpen(false)}
                      >
                        View all {item.label}
                      </Link>

                      {item.children?.map((child) => (
                        <DropdownLink
                          key={child.href}
                          item={child}
                          onClick={() => setOpen(false)}
                          className="py-1.5 text-sm text-white/70 hover:text-accent"
                        />
                      ))}

                      {item.groups?.map((group) => (
                        <div key={group.label}>
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                            {group.label}
                          </p>
                          <div className="space-y-1">
                            {group.items.map((child) => (
                              <DropdownLink
                                key={child.href}
                                item={child}
                                onClick={() => setOpen(false)}
                                className="py-1.5 text-sm text-white/70 hover:text-accent"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 px-1 pt-4">
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white/85"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-accent px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-primary"
              >
                Book Now
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
