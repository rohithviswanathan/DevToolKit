import {
  Check,
  Clipboard,
  Code2,
  Download,
  FileJson,
  FileUp,
  Minimize2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import JsonEditor from "./JsonEditor";
import { trackToolUsed } from "../../lib/analytics";

const SAMPLE_JSON = `{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28,
  "active": true,
  "skills": [
    "React",
    "TypeScript",
    "JavaScript"
  ],
  "address": {
    "city": "Bengaluru",
    "country": "India"
  }
}`;

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [error, setError] = useState("");
  const [errorPosition, setErrorPosition] =
    useState<number | null>(null);

  const [isValid, setIsValid] =
    useState<boolean | null>(null);

  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /*
   * ---------------------------------------------------------
   * Stats
   * ---------------------------------------------------------
   */

  const inputLines = useMemo(() => {
    if (!input) return 0;

    return input.split("\n").length;
  }, [input]);

  const outputLines = useMemo(() => {
    if (!output) return 0;

    return output.split("\n").length;
  }, [output]);

  const inputCharacters = input.length;
  const outputCharacters = output.length;

  /*
   * ---------------------------------------------------------
   * Error position
   * ---------------------------------------------------------
   */

  const extractErrorPosition = (message: string) => {
    const match = message.match(/position\s+(\d+)/i);

    if (!match) return null;

    return Number(match[1]);
  };

  /*
   * ---------------------------------------------------------
   * Format
   * ---------------------------------------------------------
   */

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("Enter some JSON to format.");
      setErrorPosition(null);
      setIsValid(false);

      return;
    }

    try {
      const parsed = JSON.parse(input);

      const formatted = JSON.stringify(
        parsed,
        null,
        2,
      );

      setOutput(formatted);
      setError("");
      setErrorPosition(null);
      setIsValid(true);
      trackToolUsed("json-formatter", "format");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid JSON.";

      setOutput("");
      setError(message);
      setErrorPosition(
        extractErrorPosition(message),
      );
      setIsValid(false);
    }
  }, [input]);

  /*
   * ---------------------------------------------------------
   * Minify
   * ---------------------------------------------------------
   */

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("Enter some JSON to minify.");
      setErrorPosition(null);
      setIsValid(false);

      return;
    }

    try {
      const parsed = JSON.parse(input);

      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setError("");
      setErrorPosition(null);
      setIsValid(true);
      trackToolUsed("json-formatter", "minify");
      
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid JSON.";

      setOutput("");
      setError(message);
      setErrorPosition(
        extractErrorPosition(message),
      );
      setIsValid(false);
    }
  }, [input]);

  /*
   * ---------------------------------------------------------
   * Validate
   * ---------------------------------------------------------
   */

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError("Enter some JSON to validate.");
      setErrorPosition(null);
      setIsValid(false);

      return;
    }

    try {
      JSON.parse(input);

      setError("");
      setErrorPosition(null);
      setIsValid(true);
      trackToolUsed("json-formatter", "validate");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Invalid JSON.";

      setError(message);
      setErrorPosition(
        extractErrorPosition(message),
      );
      setIsValid(false);
    }
  }, [input]);

  /*
   * ---------------------------------------------------------
   * Clear
   * ---------------------------------------------------------
   */

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setErrorPosition(null);
    setIsValid(null);
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    setOutput("");
    setError("");
    setErrorPosition(null);
    setIsValid(null);
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Copy
   * ---------------------------------------------------------
   */

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError(
        "Unable to copy. Please copy the output manually.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * Download
   * ---------------------------------------------------------
   */

  const downloadJson = () => {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "formatted.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /*
   * ---------------------------------------------------------
   * File upload
   * ---------------------------------------------------------
   */

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please select a .json file.");
      setIsValid(false);

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const contents = reader.result;

      if (typeof contents !== "string") {
        setError("Unable to read the selected file.");
        setIsValid(false);

        return;
      }

      setInput(contents);
      setOutput("");
      setError("");
      setErrorPosition(null);
      setIsValid(null);
      setCopied(false);
    };

    reader.onerror = () => {
      setError("Unable to read the selected file.");
      setIsValid(false);
    };

    reader.readAsText(file);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      processFile(file);
    }

    event.target.value = "";
  };

  /*
   * ---------------------------------------------------------
   * Drag & drop
   * ---------------------------------------------------------
   */

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setIsDragging(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  /*
   * ---------------------------------------------------------
   * Keyboard shortcut
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier =
        event.ctrlKey || event.metaKey;

      if (modifier && event.key === "Enter") {
        event.preventDefault();

        formatJson();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [formatJson]);

  /*
   * ---------------------------------------------------------
   * Input change
   * ---------------------------------------------------------
   */

  const handleInputChange = (value: string) => {
    setInput(value);

    setOutput("");
    setError("");
    setErrorPosition(null);
    setIsValid(null);
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      {/* Privacy */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--success)]/15 bg-[var(--success)]/5 px-4 py-3 text-xs text-[var(--muted)]">
        <span className="size-1.5 shrink-0 rounded-full bg-[var(--success)]" />

        <span>
          Your JSON stays in your browser. Nothing is
          uploaded.
        </span>
      </div>

      {/* Workspace */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* =================================================
            INPUT
        ================================================= */}
        <div
          className={[
            "overflow-hidden rounded-2xl border bg-[var(--surface)]",
            isDragging
              ? "border-[var(--accent)]"
              : "border-[var(--border)]",
          ].join(" ")}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2">
              <FileJson
                size={16}
                className="text-[var(--accent)]"
              />

              <span className="text-sm font-medium">
                Input
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                <FileUp size={14} />
                Upload
              </button>

              <button
                type="button"
                onClick={loadSample}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                <Code2 size={14} />
                Sample
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Editor */}
          <div className="relative">
            <JsonEditor
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your JSON here..."
            />

            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-sm">
                <div className="text-center">
                  <Upload
                    size={28}
                    className="mx-auto text-[var(--accent)]"
                  />

                  <p className="mt-3 text-sm font-medium">
                    Drop your JSON file here
                  </p>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Only .json files are supported
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>
              {inputCharacters.toLocaleString()} characters
            </span>

            <span>
              {inputLines.toLocaleString()} lines
            </span>
          </div>
        </div>

        {/* =================================================
            OUTPUT
        ================================================= */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2">
              {isValid === true ? (
                <Check
                  size={16}
                  className="text-[var(--success)]"
                />
              ) : isValid === false ? (
                <X
                  size={16}
                  className="text-[var(--error)]"
                />
              ) : (
                <FileJson
                  size={16}
                  className="text-[var(--subtle)]"
                />
              )}

              <span className="text-sm font-medium">
                Output
              </span>

              {isValid === true && (
                <span className="rounded-md bg-[var(--success)]/10 px-1.5 py-0.5 text-[10px] font-medium text-[var(--success)]">
                  Valid JSON
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard size={14} />
                    Copy
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={downloadJson}
                disabled={!output}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>

          {/* Editor */}
          <JsonEditor
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
          />

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>
              {outputCharacters.toLocaleString()} characters
            </span>

            <span>
              {outputLines.toLocaleString()} lines
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5 px-4 py-3">
          <X
            size={16}
            className="mt-0.5 shrink-0 text-[var(--error)]"
          />

          <div className="min-w-0">
            <p className="text-sm font-medium text-[var(--error)]">
              Invalid JSON
            </p>

            <p className="mt-1 break-words text-xs leading-5 text-[var(--muted)]">
              {error}
            </p>

            {errorPosition !== null && (
              <p className="mt-1 text-xs text-[var(--subtle)]">
                Error near character{" "}
                {errorPosition.toLocaleString()}.
              </p>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          ACTIONS
      ================================================= */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Format */}
        <button
          type="button"
          onClick={formatJson}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          <Code2 size={16} />

          <span>Format</span>

          <kbd className="hidden rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/80 sm:inline">
            Ctrl ↵
          </kbd>
        </button>

        {/* Minify */}
        <button
          type="button"
          onClick={minifyJson}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
        >
          <Minimize2 size={16} />
          Minify
        </button>

        {/* Validate */}
        <button
          type="button"
          onClick={validateJson}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
        >
          <Check size={16} />
          Validate
        </button>

        {/* Clear */}
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
        >
          <Trash2 size={15} />
          Clear
        </button>
      </div>

      {/* Bottom info */}
      <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--subtle)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Tip: Press{" "}
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[10px]">
            Enter
          </kbd>{" "}
          to format.
        </span>

        <span>
          Runs entirely in your browser.
        </span>
      </div>
    </div>
  );
}

export default JsonFormatter;