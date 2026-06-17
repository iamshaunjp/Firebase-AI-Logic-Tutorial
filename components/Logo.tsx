interface LogoProps {
  variant?: "light" | "dark";
}

export function Logo({ variant = "light" }: LogoProps) {
  const isDark = variant === "dark";
  return (
    <a href="/" className={isDark ? "landing-logo-dark" : "landing-logo"} aria-label="Chronicle.Me home">
      <svg
        className="landing-logo-mark"
        viewBox="0 0 38 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1" y="1" width="36" height="46"
          fill={isDark ? "transparent" : "#FAF7F2"}
          stroke={isDark ? "rgba(255,255,255,0.15)" : "#1E1811"}
          strokeWidth="1.5"
        />
        <rect x="1" y="1" width="6" height="46" fill="#D97757" />
        <line x1="13" y1="14" x2="33" y2="14" stroke={isDark ? "rgba(255,255,255,0.2)" : "#C9B9A5"} strokeWidth="1" />
        <line x1="13" y1="21" x2="33" y2="21" stroke={isDark ? "rgba(255,255,255,0.2)" : "#C9B9A5"} strokeWidth="1" />
        <line x1="13" y1="28" x2="33" y2="28" stroke={isDark ? "rgba(255,255,255,0.2)" : "#C9B9A5"} strokeWidth="1" />
        <line x1="13" y1="35" x2="26" y2="35" stroke="#D97757" strokeWidth="1.5" />
      </svg>
      <div className="landing-wordmark">
        <span className={isDark ? "landing-wordmark-name-dark" : "landing-wordmark-name"}>Chronicle</span>
        <span className={isDark ? "landing-wordmark-tag-dark" : "landing-wordmark-tag"}>.Me</span>
      </div>
    </a>
  );
}
