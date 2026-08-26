import { AlertCircle } from "lucide-react";

interface ToolErrorProps {
  title?: string;
  message: string;
}

function ToolError({
  title = "Something went wrong",
  message,
}: ToolErrorProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5 px-4 py-3.5 transition-colors"
    >
      <div
        aria-hidden="true"
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--error)]/10"
      >
        <AlertCircle
          size={16}
          className="text-[var(--error)]"
        />
      </div>

      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-medium leading-5 text-[var(--error)]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ToolError;