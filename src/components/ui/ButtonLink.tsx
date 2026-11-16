import Link from "next/link";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  className?: string;
  target?: string;
  rel?: string;
};

export function ButtonLink({ href, children, variant, size, pill, className, target, rel }: ButtonLinkProps) {
  return (
    <Link href={href} target={target} rel={rel} className={buttonClasses({ variant, size, pill, className })}>
      {children}
    </Link>
  );
}
