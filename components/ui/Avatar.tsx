import type { HTMLAttributes } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: AvatarSize | number;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

export function Avatar({ src, name, size = "md", className, ...props }: AvatarProps) {
  const px = typeof size === "number" ? size : (sizeMap[size] ?? 40);

  // Deterministic warm hue from name (20–80 range = amber/orange/green family)
  const hue = name
    ? ([...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 60) + 20
    : 35;

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const fontSize = Math.round(px * 0.36);

  return (
    <div
      className={[
        "relative rounded-none overflow-hidden shrink-0",
        "inline-flex items-center justify-center",
        "border border-black/10 select-none",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: px,
        height: px,
        backgroundColor: src ? undefined : `hsl(${hue}, 32%, 48%)`,
      }}
      title={name}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name ?? "Avatar"}
          className="w-full h-full object-cover block"
        />
      ) : (
        <span
          className="font-sans font-bold text-white leading-none"
          style={{ fontSize, letterSpacing: "-0.01em" }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
