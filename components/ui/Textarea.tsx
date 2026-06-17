import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  disabled = false,
  id,
  rows = 6,
  placeholder = "What happened today? Don't worry about how it sounds.",
  className,
  ...props
}: TextareaProps) {
  const textareaId =
    id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={textareaId}
          className="block font-sans text-xs font-semibold uppercase tracking-caps text-stone-600 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        disabled={disabled}
        rows={rows}
        placeholder={placeholder}
        className={[
          "block w-full box-border font-serif text-lg leading-diary text-stone-900 rounded-none",
          "border outline-none resize-y",
          "px-4 py-3.5",
          "transition-colors duration-120 ease-in-out",
          disabled
            ? "bg-stone-100 cursor-not-allowed opacity-70"
            : "bg-white",
          error
            ? "border-error focus:border-error"
            : "border-stone-300 focus:border-orange-500",
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
