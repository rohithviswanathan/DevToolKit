interface ToolPrivacyNoticeProps {
  children?: React.ReactNode;
}

function ToolPrivacyNotice({
  children = "Everything runs locally in your browser. Nothing is uploaded.",
}: ToolPrivacyNoticeProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[var(--success)]/15 bg-[var(--success)]/5 px-4 py-3 text-xs text-[var(--muted)]">
      <span className="size-1.5 shrink-0 rounded-full bg-[var(--success)]" />

      <span>{children}</span>
    </div>
  );
}

export default ToolPrivacyNotice;