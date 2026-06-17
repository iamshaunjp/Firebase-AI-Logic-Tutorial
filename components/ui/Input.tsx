import type { InputHTMLAttributes } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "px-[10px] py-[7px] text-sm",
  md: "px-3 py-[10px] text-base",
  lg: "px-4 py-[13px] text-lg",
};

export function Input({
  label,
  error,
  hint,
  inputSize = "md",
  disabled = false,
  id,
  className,
  ...props
}: InputProps) {
  const inputId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-sans text-xs font-semibold uppercase tracking-caps text-stone-600 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        className={[
          "block w-full box-border font-serif text-stone-900 rounded-none",
          "border outline-none",
          "transition-colors duration-120 ease-in-out",
          disabled
            ? "bg-stone-100 cursor-not-allowed opacity-70"
            : "bg-white",
          error
            ? "border-error focus:border-error"
            : "border-stone-300 focus:border-orange-500",
          sizeClasses[inputSize],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && (
        <span className="font-sans text-xs text-error mt-1.25">{error}</span>
      )}
      {hint && !error && (
        <span className="font-sans text-xs text-stone-400 mt-1.25">{hint}</span>
      )}
    </div>
  );
}
