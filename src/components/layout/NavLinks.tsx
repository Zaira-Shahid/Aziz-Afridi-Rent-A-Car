import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { NavItem, NavLink } from "@/types";

export function isActive(pathname: string, item: NavItem) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (item.href === "/") return path === "/";
  if (path === item.href) return true;
  if (item.children?.some((child) => path === child.href)) return true;
  if (item.groups?.some((group) => group.items.some((child) => path === child.href))) return true;
  return path.startsWith(`${item.href}/`);
}

export function hasMenu(item: NavItem) {
  return Boolean(item.children?.length || item.groups?.length);
}

type NavLinkItemProps = {
  item: NavLink;
  onNavigate?: () => void;
};

/** One link inside a dropdown or the mobile menu. Car links show their brand logo, city links a pin. */
export function NavLinkItem({ item, onNavigate }: NavLinkItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="flex min-h-11 w-full min-w-0 items-center gap-3 rounded-lg px-3 text-sm font-medium text-navy-deep transition hover:bg-surface hover:text-green-strong"
    >
      {item.logo ? (
        <Image src={item.logo} alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
      ) : item.href.startsWith("/rent-a-car/") ? (
        <Icon name="map-pin" size={16} className="text-green-strong" />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
    </Link>
  );
}

type NavSectionsProps = {
  item: NavItem;
  layout: "dropdown" | "mega" | "mobile";
  onNavigate?: () => void;
};

/** The children and grouped links of a nav item, shared by the desktop dropdowns and the mobile menu. */
export function NavSections({ item, layout, onNavigate }: NavSectionsProps) {
  const groups = item.groups ?? [];
  const wide = layout === "mega" && groups.length === 2;

  return (
    <div className="space-y-5">
      {item.children?.length ? (
        <ul className={cn("grid gap-1", layout === "mega" && "sm:grid-cols-2 xl:grid-cols-3")}>
          {item.children.map((child) => (
            <li key={`${child.href}-${child.label}`} className="min-w-0">
              <NavLinkItem item={child} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      ) : null}

      {groups.length ? (
        <div className={cn("gap-6", wide ? "grid xl:grid-cols-[15rem_minmax(0,1fr)]" : "space-y-5")}>
          {groups.map((group, index) => {
            const isLongList = group.items.length > 12;
            return (
              <div
                key={group.label}
                className={cn("min-w-0", wide && index === 0 && "xl:border-r xl:border-line xl:pr-6")}
              >
                <div className="mb-2 flex items-center justify-between gap-3 px-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-strong">{group.label}</p>
                  {group.label === "All Cars" ? (
                    <Link
                      href="/cars"
                      onClick={onNavigate}
                      className="text-xs font-semibold text-navy hover:text-green-strong hover:underline"
                    >
                      View all
                    </Link>
                  ) : null}
                </div>
                <ul
                  className={cn(
                    "grid gap-1",
                    isLongList && layout === "mega" && "sm:grid-cols-2 xl:grid-cols-3",
                    isLongList && layout === "mobile" && "sm:grid-cols-2",
                  )}
                >
                  {group.items.map((child) => (
                    <li key={`${child.href}-${child.label}`} className="min-w-0">
                      <NavLinkItem item={child} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
