import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Aziz Afridi Rent A Car"
    >
      <span className="site-brand-wordmark flex flex-col leading-none whitespace-nowrap">
        <span className="text-[19px] font-black italic tracking-tight sm:text-[25px]"><span className="text-secondary">AZIZ</span> <span>AFRIDI</span></span>
        <span className="mt-1 text-center text-[9px] font-bold tracking-[0.28em] sm:text-[11px]">RENT A CAR</span>
      </span>
    </Link>
  );
}
