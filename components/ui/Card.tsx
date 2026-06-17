import type { HTMLAttributes } from "react";

export type CardVariant = "default" | "raised" | "warm" | "bordered" | "dark";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  clickable?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default:  "bg-white border border-stone-200",
  raised:   "bg-white border border-stone-200 shadow-sm",
  warm:     "bg-stone-100 border border-stone-200",
  bordered: "bg-white border-2 border-stone-300",
  dark:     "bg-stone-900 border border-white/[0.06] text-stone-100",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm:   "p-3",
  md:   "px-6 py-5",
  lg:   "p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  clickable = false,
  className,
  onClick,
  children,
  ...props
}: CardProps) {
  const isClickable = clickable || !!onClick;

  return (
    <div
      onClick={onClick}
      className={[
        "relative rounded-none",
        "transition-all duration-220 ease-in-out",
        isClickable
          ? "cursor-pointer hover:shadow-md hover:border-stone-300"
          : "",
        variantClasses[variant],
        paddingClasses[padding],
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
