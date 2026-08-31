interface ToolPrivacyNoticeProps {
  children?: React.ReactNode;
}

function ToolPrivacyNotice({
  children = "Everything runs locally in your browser. Nothing is uploaded.",
}: ToolPrivacyNoticeProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-[var(--success)]/15 bg-[var(--success)]/5 px-4 py-3 text-xs leading-5 text-[var(--muted)]">
      <span
        aria-hidden="true"
        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--success)] shadow-[0_0_6px_var(--success)]"
      />

      <span className="min-w-0">
        {children}
      </span>
    </div>
  );
}

export default ToolPrivacyNotice;
