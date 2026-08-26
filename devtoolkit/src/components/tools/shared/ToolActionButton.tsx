import type { LucideIcon } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ToolActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

function ToolActionButton({
  icon: Icon,
  variant = "secondary",
  children,
  className = "",
  ...props
}: ToolActionButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white shadow-sm hover:-translate-y-px hover:bg-[var(--accent-hover)] hover:shadow-md",

    secondary:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:-translate-y-px hover:border-[var(--accent)]/40 hover:bg-white/[0.05] hover:text-[var(--foreground)] hover:shadow-sm",

    ghost:
      "text-[var(--muted)] hover:bg-white/[0.05] hover:text-[var(--foreground)]",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && (
        <Icon
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
}

export default ToolActionButton;