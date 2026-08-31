import {
  ArrowLeftRight,
  Check,
  Clipboard,
  Code2,
  Download,
  FileText,
  Trash2,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  decodeBase64,
  encodeBase64,
} from "../../lib/base64";

import { trackToolUsed } from "../../lib/analytics";

import ToolPrivacyNotice from "./shared/ToolPrivacyNotice";
import ToolError from "./shared/ToolError";
import ToolEmptyState from "./shared/ToolEmptyState";
import ToolActionButton from "./shared/ToolActionButton";

type Mode = "encode" | "decode";

const SAMPLE_TEXT =
  "Hello, Developer Toolkit! 🚀";

const SAMPLE_BASE64 =
  "SGVsbG8sIERldmVsb3BlciBUb29sa2l0ISDwn5qA";

function Base64Tool() {
  const [mode, setMode] =
    useState<Mode>("encode");

  const [input, setInput] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  /*
   * ---------------------------------------------------------
   * Derived labels
   * ---------------------------------------------------------
   */

  const inputLabel =
    mode === "encode"
      ? "Text Input"
      : "Base64 Input";

  const outputLabel =
    mode === "encode"
      ? "Base64 Output"
      : "Decoded Text";

  /*
   * ---------------------------------------------------------
   * Reset result
   * ---------------------------------------------------------
   */

  const resetResult = () => {
    setOutput("");
    setError("");
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Convert
   * ---------------------------------------------------------
   */

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError(
        mode === "encode"
          ? "Enter some text to encode."
          : "Enter a Base64 string to decode.",
      );
      setCopied(false);

      return;
    }

    try {
      const result =
        mode === "encode"
          ? encodeBase64(input)
          : decodeBase64(input);

      setOutput(result);
      setError("");
      setCopied(false);

      trackToolUsed(
        "base64",
        mode === "encode"
          ? "encode"
          : "decode",
      );
    } catch (err) {
      setOutput("");
      setCopied(false);

      setError(
        err instanceof Error
          ? err.message
          : mode === "decode"
            ? "The provided value is not valid Base64."
            : "Unable to encode the input.",
      );
    }
  }, [input, mode]);

  /*
   * ---------------------------------------------------------
   * Mode change
   * ---------------------------------------------------------
   */

  const changeMode = (nextMode: Mode) => {
    if (nextMode === mode) return;

    setMode(nextMode);
    setInput("");
    resetResult();
  };

  /*
   * ---------------------------------------------------------
   * Swap
   * ---------------------------------------------------------
   */

  const swap = () => {
    if (!output) return;

    const nextMode: Mode =
      mode === "encode"
        ? "decode"
        : "encode";

    setMode(nextMode);
    setInput(output);
    setOutput("");
    setError("");
    setCopied(false);

    trackToolUsed(
      "base64",
      "swap",
    );
  };

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    setInput(
      mode === "encode"
        ? SAMPLE_TEXT
        : SAMPLE_BASE64,
    );

    resetResult();

    trackToolUsed(
      "base64",
      "sample",
    );
  };

  /*
   * ---------------------------------------------------------
   * Clear
   * ---------------------------------------------------------
   */

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);

    trackToolUsed(
      "base64",
      "clear",
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
        "base64",
        "copy",
      );

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError(
        "Unable to copy the output. Please copy it manually.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * Download
   * ---------------------------------------------------------
   */

  const downloadOutput = () => {
    if (!output) return;

    try {
      const blob = new Blob(
        [output],
        {
          type: "text/plain;charset=utf-8",
        },
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        mode === "encode"
          ? "encoded-base64.txt"
          : "decoded-text.txt";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      trackToolUsed(
        "base64",
        "download",
      );
    } catch {
      setError(
        "Unable to download the output.",
      );
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

        convert();
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
  }, [convert]);

  /*
   * ---------------------------------------------------------
   * Input change
   * ---------------------------------------------------------
   */

  const handleInputChange = (
    value: string,
  ) => {
    setInput(value);
    resetResult();
  };

  /*
   * ---------------------------------------------------------
   * Statistics
   * ---------------------------------------------------------
   */

  const inputBytes = input
    ? new TextEncoder().encode(input).length
    : 0;

  const outputBytes = output
    ? new TextEncoder().encode(output).length
    : 0;

  return (
    <div className="min-w-0 space-y-4">
      {/* =====================================================
          PRIVACY
      ===================================================== */}

      <ToolPrivacyNotice>
        Your data stays in your browser. Nothing is
        uploaded or sent to a server.
      </ToolPrivacyNotice>

      {/* =====================================================
          MODE SWITCHER
      ===================================================== */}

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <span className="block text-xs font-medium text-[var(--muted)]">
              Operation
            </span>

            <p className="mt-1 text-xs text-[var(--subtle)]">
              Convert between plain text and Base64.
            </p>
          </div>

          <div className="flex shrink-0 self-start rounded-lg border border-[var(--border)] bg-[var(--background)] p-1 sm:self-auto">
            <button
              type="button"
              onClick={() =>
                changeMode("encode")
              }
              aria-pressed={
                mode === "encode"
              }
              className={[
                "rounded-md px-4 py-2 text-xs font-medium transition-colors",
                mode === "encode"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
              ].join(" ")}
            >
              Encode
            </button>

            <button
              type="button"
              onClick={() =>
                changeMode("decode")
              }
              aria-pressed={
                mode === "decode"
              }
              className={[
                "rounded-md px-4 py-2 text-xs font-medium transition-colors",
                mode === "decode"
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
              ].join(" ")}
            >
              Decode
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          EDITORS
      ===================================================== */}

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        {/* ===================================================
            INPUT
        =================================================== */}

        <section className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              {mode === "encode" ? (
                <FileText
                  size={16}
                  className="shrink-0 text-[var(--accent)]"
                />
              ) : (
                <Code2
                  size={16}
                  className="shrink-0 text-[var(--accent)]"
                />
              )}

              <span className="truncate text-sm font-medium text-[var(--foreground)]">
                {inputLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={loadSample}
              className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              Sample
            </button>
          </div>

          <textarea
            value={input}
            onChange={(event) =>
              handleInputChange(
                event.target.value,
              )
            }
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Paste Base64 to decode..."
            }
            spellCheck={false}
            className="min-h-[240px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--subtle)] sm:min-h-[320px]"
          />

          <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>
              {input.length.toLocaleString()}{" "}
              characters
            </span>

            <span>
              {inputBytes.toLocaleString()}{" "}
              bytes
            </span>
          </div>
        </section>

        {/* ===================================================
            OUTPUT
        =================================================== */}

        <section className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              {output ? (
                <Check
                  size={16}
                  className="shrink-0 text-[var(--success)]"
                />
              ) : (
                <Code2
                  size={16}
                  className="shrink-0 text-[var(--subtle)]"
                />
              )}

              <span className="truncate text-sm font-medium text-[var(--foreground)]">
                {outputLabel}
              </span>

              {output && (
                <span className="hidden rounded-md bg-[var(--success)]/10 px-1.5 py-0.5 text-[10px] font-medium text-[var(--success)] sm:inline">
                  Ready
                </span>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                aria-label="Copy output"
                className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? (
                  <Check
                    size={15}
                    className="text-[var(--success)]"
                  />
                ) : (
                  <Clipboard size={15} />
                )}
              </button>

              <button
                type="button"
                onClick={downloadOutput}
                disabled={!output}
                aria-label="Download output"
                className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download size={15} />
              </button>
            </div>
          </div>

          {!output && (
            <ToolEmptyState
              icon={Code2}
              title="No output yet"
              description={
                mode === "encode"
                  ? "Enter some text and click Encode to generate Base64."
                  : "Enter Base64 and click Decode to see the original text."
              }
              minHeight="min-h-[240px] sm:min-h-[320px]"
            />
          )}

          {output && (
            <>
              <textarea
                value={output}
                readOnly
                spellCheck={false}
                className="min-h-[240px] w-full resize-y break-all bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none sm:min-h-[320px]"
              />

              <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
                <span>
                  {output.length.toLocaleString()}{" "}
                  characters
                </span>

                <span>
                  {outputBytes.toLocaleString()}{" "}
                  bytes
                </span>
              </div>
            </>
          )}
        </section>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <ToolError
          title={
            mode === "decode"
              ? "Invalid Base64"
              : "Encoding failed"
          }
          message={error}
        />
      )}

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="flex flex-wrap items-center gap-2">
        <ToolActionButton
          variant="primary"
          icon={Code2}
          onClick={convert}
        >
          {mode === "encode"
            ? "Encode"
            : "Decode"}

          <kbd className="hidden rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/80 sm:inline">
            Ctrl ↵
          </kbd>
        </ToolActionButton>

        <ToolActionButton
          variant="secondary"
          icon={ArrowLeftRight}
          onClick={swap}
          disabled={!output}
        >
          Swap
        </ToolActionButton>

        <ToolActionButton
          variant="secondary"
          icon={Trash2}
          onClick={clearAll}
        >
          Clear
        </ToolActionButton>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--subtle)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Supports Unicode and UTF-8 text.
        </span>

        <span>
          Processing happens entirely in your browser.
        </span>
      </div>
    </div>
  );
}

export default Base64Tool;