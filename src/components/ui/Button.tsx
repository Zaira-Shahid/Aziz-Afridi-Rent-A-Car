import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
};

export function Button({ className, variant, size, pill, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, pill, className })} {...props} />;
}
