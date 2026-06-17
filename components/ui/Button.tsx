import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:border-orange-600",
  secondary:
    "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600",
  ghost:
    "bg-transparent text-orange-500 border-orange-500 hover:bg-orange-50",
  outline:
    "bg-transparent text-stone-900 border-stone-300 hover:bg-stone-100",
  subtle:
    "bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200 hover:border-stone-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-[14px] py-[7px]",
  md: "px-5 py-[10px]",
  lg: "px-7 py-[13px] text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2",
    "font-sans text-xs font-bold uppercase tracking-caps",
    "border-2 rounded-none",
    "transition-colors duration-120 ease-in-out",
    "select-none whitespace-nowrap leading-none cursor-pointer",
    "disabled:opacity-[0.45] disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={(props as ButtonAsButton).disabled}
      className={classes}
      {...(props as ButtonAsButton)}
    >
      {children}
    </button>
  );
}
