import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  compact?: boolean;
}

function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="DevToolkit home"
      className="flex items-center gap-2.5"
    >
      <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] shadow-sm">
        <Terminal
          size={16}
          strokeWidth={2}
          className="text-[var(--accent)]"
        />
      </div>

      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight text-[var(--foreground)]">
          DevToolkit
        </span>
      )}
    </Link>
  );
}

export default Logo;