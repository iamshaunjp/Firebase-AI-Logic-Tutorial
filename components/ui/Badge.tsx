import type { HTMLAttributes } from "react";

export type BadgeVariant =
  | "default"
  | "orange"
  | "green"
  | "accent"
  | "secondary"
  | "outline"
  | "dark";
export type BadgeSize = "xs" | "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:   "bg-stone-100 text-stone-600 border-stone-200",
  orange:    "bg-orange-500 text-white border-transparent",
  green:     "bg-green-500 text-white border-transparent",
  accent:    "bg-orange-50 text-orange-600 border-orange-200",
  secondary: "bg-green-50 text-green-600 border-green-200",
  outline:   "bg-transparent text-stone-600 border-stone-300",
  dark:      "bg-stone-800 text-stone-200 border-transparent",
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: "text-[9px] px-[7px] py-[3px]",
  sm: "text-[10px] px-[9px] py-[4px]",
  md: "text-xs px-3 py-[5px]",
};

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "font-sans font-semibold uppercase tracking-wider",
        "rounded-none border",
        "whitespace-nowrap select-none leading-none",
        variantClasses[variant],
        sizeClasses[size],
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
