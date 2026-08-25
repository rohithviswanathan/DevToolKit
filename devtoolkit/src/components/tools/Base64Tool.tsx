import {
  ArrowLeftRight,
  Check,
  Clipboard,
  Code2,
  Download,
  FileText,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  decodeBase64,
  encodeBase64,
} from "../../lib/base64";

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
   * Convert
   * ---------------------------------------------------------
   */

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      setError(
        mode === "encode"
          ? "Enter some text to encode."
          : "Enter a Base64 string to decode.",
      );

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
    } catch (err) {
      setOutput("");

      setError(
        err instanceof Error
          ? err.message
          : "Unable to process the input.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * Swap
   * ---------------------------------------------------------
   */

  const swap = () => {
    setMode((currentMode) =>
      currentMode === "encode"
        ? "decode"
        : "encode",
    );

    setInput(output);
    setOutput("");
    setError("");
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    if (mode === "encode") {
      setInput(SAMPLE_TEXT);
    } else {
      setInput(SAMPLE_BASE64);
    }

    setOutput("");
    setError("");
    setCopied(false);
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

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setError(
        "Unable to copy the output.",
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
  };

  /*
   * ---------------------------------------------------------
   * Statistics
   * ---------------------------------------------------------
   */

  const inputBytes = useMemo(() => {
    if (!input) return 0;

    return new TextEncoder()
      .encode(input).length;
  }, [input]);

  const outputBytes = useMemo(() => {
    if (!output) return 0;

    return new TextEncoder()
      .encode(output).length;
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Privacy */}
      <ToolPrivacyNotice>
        Your data stays in your browser. Nothing is
        uploaded or sent to a server.
      </ToolPrivacyNotice>

      {/* Mode switcher */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="block text-xs font-medium text-[var(--muted)]">
              Operation
            </span>

            <p className="mt-1 text-xs text-[var(--subtle)]">
              Convert between plain text and Base64.
            </p>
          </div>

          <div className="flex rounded-lg border border-[var(--border)] bg-[var(--background)] p-1">
            <button
              type="button"
              onClick={() => {
                setMode("encode");
                setInput("");
                setOutput("");
                setError("");
                setCopied(false);
              }}
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
              onClick={() => {
                setMode("decode");
                setInput("");
                setOutput("");
                setError("");
                setCopied(false);
              }}
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
      </div>

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2">
              {mode === "encode" ? (
                <FileText
                  size={16}
                  className="text-[var(--accent)]"
                />
              ) : (
                <Code2
                  size={16}
                  className="text-[var(--accent)]"
                />
              )}

              <span className="text-sm font-medium">
                {inputLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={loadSample}
              className="rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              Sample
            </button>
          </div>

          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setOutput("");
              setError("");
              setCopied(false);
            }}
            placeholder={
              mode === "encode"
                ? "Enter text to encode..."
                : "Paste Base64 to decode..."
            }
            spellCheck={false}
            className="min-h-[320px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--subtle)]"
          />

          <div className="flex justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>
              {input.length.toLocaleString()} characters
            </span>

            <span>
              {inputBytes.toLocaleString()} bytes
            </span>
          </div>
        </div>

        {/* Output */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-2">
              {output ? (
                <Check
                  size={16}
                  className="text-[var(--success)]"
                />
              ) : (
                <Code2
                  size={16}
                  className="text-[var(--subtle)]"
                />
              )}

              <span className="text-sm font-medium">
                {outputLabel}
              </span>
            </div>

            <div className="flex items-center gap-1">
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
            />
          )}

          {output && (
            <>
              <textarea
                value={output}
                readOnly
                spellCheck={false}
                className="min-h-[320px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none"
              />

              <div className="flex justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
                <span>
                  {output.length.toLocaleString()} characters
                </span>

                <span>
                  {outputBytes.toLocaleString()} bytes
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error */}
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

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <ToolActionButton
          variant="primary"
          icon={Code2}
          onClick={convert}
        >
          {mode === "encode"
            ? "Encode"
            : "Decode"}
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

      {/* Bottom information */}
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