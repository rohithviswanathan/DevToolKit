import {
  Binary,
  Braces,
  ChevronRight,
  Code2,
  Fingerprint,
  KeyRound,
  Regex,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import type { Tool } from "../../types/tools";

interface ToolCardProps {
  tool: Tool;
}

const icons: Record<string, LucideIcon> = {
  braces: Braces,
  code: Code2,
  fingerprint: Fingerprint,
  binary: Binary,
  regex: Regex,
  "key-round": KeyRound,
};

function ToolCard({
  tool,
}: ToolCardProps) {
  const Icon = icons[tool.icon];

  return (
    <Link
      to={tool.route}
      aria-label={`Open ${tool.name}`}
      title={`Open ${tool.name}`}
      className={[
        "group flex h-full min-h-[170px] flex-col",
        "rounded-2xl border border-[var(--border)]",
        "bg-[var(--surface)] p-5",
        "transition-[transform,border-color,background-color,box-shadow]",
        "duration-200",
        "hover:-translate-y-0.5",
        "hover:border-white/15",
        "hover:bg-[var(--surface-elevated)]",
        "hover:shadow-lg hover:shadow-black/10",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--accent)]/50",
        "motion-reduce:transition-none",
        "motion-reduce:hover:translate-y-0",
      ].join(" ")}
    >
      {/* =====================================================
          Top row
      ===================================================== */}
      <div className="flex items-start justify-between gap-4">
        {/* Icon */}
        <div
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-200 group-hover:border-[var(--accent)]/20 group-hover:bg-[var(--accent)]/5 motion-reduce:transition-none"
        >
          {Icon ? (
            <Icon
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
              className="text-[var(--accent)]"
            />
          ) : (
            <Code2
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
              className="text-[var(--accent)]"
            />
          )}
        </div>

        {/* Arrow */}
        <div
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-white/[0.04] motion-reduce:transition-none"
        >
          <ChevronRight
            size={18}
            className="text-[var(--subtle)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)] motion-reduce:transition-none"
          />
        </div>
      </div>

      {/* =====================================================
          Content
      ===================================================== */}
      <div className="mt-auto pt-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h2 className="min-w-0 text-base font-medium tracking-tight text-[var(--foreground)]">
            {tool.name}
          </h2>

          <span
            aria-hidden="true"
            className="shrink-0 rounded-md border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--subtle)]"
          >
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