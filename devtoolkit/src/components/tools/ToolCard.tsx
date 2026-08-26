import {
  Binary,
  Braces,
  ChevronRight,
  Code2,
  Fingerprint,
  Regex,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Tool } from "../../types/tools";

interface ToolCardProps {
  tool: Tool;
}

const icons = {
  braces: Braces,
  code: Code2,
  fingerprint: Fingerprint,
  binary: Binary,
  regex: Regex,
};

function ToolCard({ tool }: ToolCardProps) {
  const Icon =
    icons[tool.icon as keyof typeof icons];

  return (
    <Link
      to={tool.route}
      className="group flex h-full min-h-[170px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-[var(--surface-elevated)] hover:shadow-lg hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-200 group-hover:border-[var(--accent)]/20 group-hover:bg-[var(--accent)]/5">
          {Icon && (
            <Icon
              size={19}
              strokeWidth={1.8}
              className="text-[var(--accent)]"
            />
          )}
        </div>

        <div className="flex size-8 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-white/[0.04]">
          <ChevronRight
            size={18}
            className="text-[var(--subtle)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-auto pt-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className="font-medium tracking-tight text-[var(--foreground)]">
            {tool.name}
          </h3>

          <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--subtle)]">
            {tool.category}
          </span>
        </div>

        <p className="text-sm leading-6 text-[var(--muted)]">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}

export default ToolCard;