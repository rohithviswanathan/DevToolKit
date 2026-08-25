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
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  const variants = {
    primary:
      "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",

    secondary:
      "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:bg-white/[0.05] hover:text-[var(--foreground)]",

    ghost:
      "text-[var(--muted)] hover:bg-white/[0.05] hover:text-[var(--foreground)]",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export default ToolActionButton;