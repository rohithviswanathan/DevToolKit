import type { LucideIcon } from "lucide-react";

interface ToolEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  minHeight?: string;
}

function ToolEmptyState({
  icon: Icon,
  title,
  description,
  minHeight = "min-h-[320px]",
}: ToolEmptyStateProps) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center px-6 py-8`}
    >
      <div className="max-w-sm text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm">
          <Icon
            size={21}
            strokeWidth={1.8}
            className="text-[var(--subtle)]"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-4 text-sm font-medium leading-5 text-[var(--foreground)]">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ToolEmptyState;