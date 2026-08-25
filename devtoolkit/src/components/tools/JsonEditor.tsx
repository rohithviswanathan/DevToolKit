import { useEffect, useRef } from "react";

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
}

function JsonEditor({
  value,
  onChange,
  placeholder,
  readOnly = false,
  minHeight = "320px",
}: JsonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lineCount = Math.max(1, value.split("\n").length);

  const lines = Array.from(
    { length: lineCount },
    (_, index) => index + 1,
  );

  /*
   * Keep line numbers vertically synchronized
   * with the textarea when scrolling.
   */
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!textarea || !lineNumbers) return;

    const handleScroll = () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener("scroll", handleScroll);

    return () => {
      textarea.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="flex overflow-hidden bg-[var(--background)]"
      style={{ minHeight }}
    >
      {/* Line numbers */}
      <div
        ref={lineNumbersRef}
        aria-hidden="true"
        className="w-12 shrink-0 overflow-hidden border-r border-[var(--border)] bg-[var(--surface-elevated)] py-5 text-right font-mono text-xs leading-7 text-[var(--subtle)]"
      >
        <div>
          {lines.map((line) => (
            <div key={line} className="px-3">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        wrap="off"
        className={[
          "min-h-full w-full flex-1 resize-y",
          "overflow-auto bg-transparent",
          "px-4 py-5",
          "font-mono text-sm leading-7",
          "text-[var(--foreground)]",
          "outline-none",
          "placeholder:text-[var(--subtle)]",
          readOnly ? "cursor-default" : "",
        ].join(" ")}
      />
    </div>
  );
}

export default JsonEditor;