import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

function IconButton({
  label,
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-[var(--muted)] transition-colors hover:border-white/10 hover:bg-white/[0.05] hover:text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;