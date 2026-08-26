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

import ToolPrivacyNotice from "./shared/ToolPrivacyNotice";
import ToolError from "./shared/ToolError";
import ToolActionButton from "./shared/ToolActionButton";

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

  const extractErrorPosition = (
    message: string,
  ) => {
    const match = message.match(
      /position\s+(\d+)/i,
    );

    if (!match) return null;

    return Number(match[1]);
  };

  /*
   * ---------------------------------------------------------
   * Reset result state
   * ---------------------------------------------------------
   */

  const resetResult = () => {
    setOutput("");
    setError("");
    setErrorPosition(null);
    setIsValid(null);
    setCopied(false);
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
      setCopied(false);

      trackToolUsed(
        "json-formatter",
        "format",
      );
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
      setCopied(false);
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
      setCopied(false);

      trackToolUsed(
        "json-formatter",
        "minify",
      );
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
      setCopied(false);
    }
  }, [input]);

  /*
   * ---------------------------------------------------------
   * Validate
   * ---------------------------------------------------------
   */

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError(
        "Enter some JSON to validate.",
      );
      setErrorPosition(null);
      setIsValid(false);

      return;
    }

    try {
      JSON.parse(input);

      setError("");
      setErrorPosition(null);
      setIsValid(true);

      trackToolUsed(
        "json-formatter",
        "validate",
      );
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

    trackToolUsed(
      "json-formatter",
      "clear",
    );
  };

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    resetResult();

    trackToolUsed(
      "json-formatter",
      "sample",
    );
  };

  /*
   * ---------------------------------------------------------
   * Copy
   * ---------------------------------------------------------
   */

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(
        output,
      );

      setCopied(true);

      trackToolUsed(
        "json-formatter",
        "copy",
      );

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

    const blob = new Blob(
      [output],
      {
        type: "application/json",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "formatted.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    trackToolUsed(
      "json-formatter",
      "download",
    );
  };

  /*
   * ---------------------------------------------------------
   * File upload
   * ---------------------------------------------------------
   */

  const processFile = (file: File) => {
    if (
      !file.name
        .toLowerCase()
        .endsWith(".json")
    ) {
      setError(
        "Please select a .json file.",
      );
      setErrorPosition(null);
      setIsValid(false);

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const contents =
        reader.result;

      if (
        typeof contents !== "string"
      ) {
        setError(
          "Unable to read the selected file.",
        );
        setIsValid(false);

        return;
      }

      setInput(contents);
      setOutput("");
      setError("");
      setErrorPosition(null);
      setIsValid(null);
      setCopied(false);

      trackToolUsed(
        "json-formatter",
        "upload",
      );
    };

    reader.onerror = () => {
      setError(
        "Unable to read the selected file.",
      );
      setErrorPosition(null);
      setIsValid(false);
    };

    reader.readAsText(file);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

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
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const file =
      event.dataTransfer.files?.[0];

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
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const modifier =
        event.ctrlKey ||
        event.metaKey;

      if (
        modifier &&
        event.key === "Enter"
      ) {
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

  const handleInputChange = (
    value: string,
  ) => {
    setInput(value);

    setOutput("");
    setError("");
    setErrorPosition(null);
    setIsValid(null);
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      {/* =====================================================
          PRIVACY
      ===================================================== */}

      <ToolPrivacyNotice>
        Your JSON stays in your browser. Nothing is
        uploaded or sent to a server.
      </ToolPrivacyNotice>

      {/* =====================================================
          WORKSPACE
      ===================================================== */}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ===================================================
            INPUT
        =================================================== */}

        <section
          className={[
            "overflow-hidden rounded-2xl border bg-[var(--surface)] transition-colors",
            isDragging
              ? "border-[var(--accent)]"
              : "border-[var(--border)]",
          ].join(" ")}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Header */}

          <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <FileJson
                size={16}
                className="shrink-0 text-[var(--accent)]"
              />

              <span className="text-sm font-medium text-[var(--foreground)]">
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
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--background)]/90 px-6 text-center backdrop-blur-sm">
                <div>
                  <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                    <Upload
                      size={24}
                      className="text-[var(--accent)]"
                    />
                  </div>

                  <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
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
              {inputCharacters.toLocaleString()}{" "}
              characters
            </span>

            <span>
              {inputLines.toLocaleString()}{" "}
              lines
            </span>
          </div>
        </section>

        {/* ===================================================
            OUTPUT
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {/* Header */}

          <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              {isValid === true ? (
                <Check
                  size={16}
                  className="shrink-0 text-[var(--success)]"
                />
              ) : isValid === false ? (
                <X
                  size={16}
                  className="shrink-0 text-[var(--error)]"
                />
              ) : (
                <FileJson
                  size={16}
                  className="shrink-0 text-[var(--subtle)]"
                />
              )}

              <span className="text-sm font-medium text-[var(--foreground)]">
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

          {/* Output editor */}

          <JsonEditor
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
          />

          {/* Footer */}

          <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>
              {outputCharacters.toLocaleString()}{" "}
              characters
            </span>

            <span>
              {outputLines.toLocaleString()}{" "}
              lines
            </span>
          </div>
        </section>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <ToolError
          title={
            isValid === false
              ? "Invalid JSON"
              : "Something went wrong"
          }
          message={
            errorPosition !== null
              ? `${error} Error near character ${errorPosition.toLocaleString()}.`
              : error
          }
        />
      )}

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="flex flex-wrap items-center gap-2">
        <ToolActionButton
          variant="primary"
          icon={Code2}
          onClick={formatJson}
        >
          Format

          <kbd className="hidden rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/80 sm:inline">
            Ctrl ↵
          </kbd>
        </ToolActionButton>

        <ToolActionButton
          variant="secondary"
          icon={Minimize2}
          onClick={minifyJson}
        >
          Minify
        </ToolActionButton>

        <ToolActionButton
          variant="secondary"
          icon={Check}
          onClick={validateJson}
        >
          Validate
        </ToolActionButton>

        <ToolActionButton
          variant="ghost"
          icon={Trash2}
          onClick={clearAll}
        >
          Clear
        </ToolActionButton>
      </div>

      {/* =====================================================
          BOTTOM INFO
      ===================================================== */}

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
          Processing happens entirely in your browser.
        </span>
      </div>
    </div>
  );
}

export default JsonFormatter;