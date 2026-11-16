import Link from "next/link";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: string;
  rel?: string;
};

export function ButtonLink({ href, children, variant, size, className, target, rel }: ButtonLinkProps) {
  return (
    <Link href={href} target={target} rel={rel} className={buttonClasses({ variant, size, className })}>
      {children}
    </Link>
  );
}
