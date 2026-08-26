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
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const lineNumbersRef =
    useRef<HTMLDivElement>(null);

  const lineCount = Math.max(
    1,
    value.split("\n").length,
  );

  const lines = Array.from(
    { length: lineCount },
    (_, index) => index + 1,
  );

  /*
   * ---------------------------------------------------------
   * Sync line numbers with editor scroll
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!textarea || !lineNumbers) {
      return;
    }

    const handleScroll = () => {
      lineNumbers.style.transform = `translateY(-${textarea.scrollTop}px)`;
    };

    textarea.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    return () => {
      textarea.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  return (
    <div
      className="flex overflow-hidden bg-[var(--background)]"
      style={{
        minHeight,
      }}
    >
      {/* =================================================
          LINE NUMBERS
      ================================================= */}

      <div
        aria-hidden="true"
        className="relative w-12 shrink-0 overflow-hidden border-r border-[var(--border)] bg-[var(--surface-elevated)]"
      >
        <div
          ref={lineNumbersRef}
          className="absolute left-0 right-0 top-0 py-5 font-mono text-xs leading-7 text-[var(--subtle)]"
        >
          {lines.map((line) => (
            <div
              key={line}
              className="px-3 text-right"
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* =================================================
          EDITOR
      ================================================= */}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        wrap="off"
        className={[
          "block w-full flex-1",
          "resize-y",
          "overflow-auto",
          "bg-transparent",
          "px-4 py-5",
          "font-mono text-sm leading-7",
          "text-[var(--foreground)]",
          "outline-none",
          "placeholder:text-[var(--subtle)]",
          "selection:bg-[var(--accent)]/20",
          readOnly
            ? "cursor-default"
            : "cursor-text",
        ].join(" ")}
        style={{
          minHeight,
        }}
      />
    </div>
  );
}

export default JsonEditor;