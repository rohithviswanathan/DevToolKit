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
    <div className="flex items-start gap-3 rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5 px-4 py-3">
      <AlertCircle
        size={16}
        className="mt-0.5 shrink-0 text-[var(--error)]"
      />

      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--error)]">
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