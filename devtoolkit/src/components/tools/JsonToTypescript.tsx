import {
  Check,
  Clipboard,
  Code2,
  Download,
  FileJson,
  Trash2,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import JsonEditor from "./JsonEditor";
import { jsonToTypeScript } from "../../lib/jsonToTypescript";
import { trackToolUsed } from "../../lib/analytics";

import ToolPrivacyNotice from "./shared/ToolPrivacyNotice";
import ToolError from "./shared/ToolError";
import ToolActionButton from "./shared/ToolActionButton";

const SAMPLE_JSON = `{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "active": true,
  "roles": [
    "admin",
    "user"
  ],
  "profile": {
    "age": 28,
    "city": "Bengaluru"
  }
}`;

function JsonToTypeScript() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [rootName, setRootName] =
    useState("Root");

  const [useInterfaces, setUseInterfaces] =
    useState(true);

  const [
    optionalProperties,
    setOptionalProperties,
  ] = useState(false);

  /*
   * ---------------------------------------------------------
   * Convert
   * ---------------------------------------------------------
   */

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setError("Enter some JSON to convert.");
      setCopied(false);

      return;
    }

    try {
      const result = jsonToTypeScript(
        input,
        {
          rootName,
          useInterfaces,
          optionalProperties,
        },
      );

      setOutput(result);
      setError("");
      setCopied(false);

      trackToolUsed(
        "json-to-typescript",
        "generate",
      );
    } catch (err) {
      setOutput("");

      setError(
        err instanceof Error
          ? err.message
          : "Unable to convert JSON.",
      );

      setCopied(false);
    }
  }, [
    input,
    rootName,
    useInterfaces,
    optionalProperties,
  ]);

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    setOutput("");
    setError("");
    setCopied(false);

    trackToolUsed(
      "json-to-typescript",
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
      "json-to-typescript",
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
      await navigator.clipboard.writeText(output);

      setCopied(true);

      trackToolUsed(
        "json-to-typescript",
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
          type: "text/typescript",
        },
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = `${rootName || "types"}.ts`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      trackToolUsed(
        "json-to-typescript",
        "download",
      );
    } catch {
      setError(
        "Unable to download the generated TypeScript.",
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
        event.ctrlKey || event.metaKey;

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
    setOutput("");
    setError("");
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Root name change
   * ---------------------------------------------------------
   */

  const handleRootNameChange = (
    value: string,
  ) => {
    setRootName(value);
    setOutput("");
    setError("");
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Output style change
   * ---------------------------------------------------------
   */

  const handleInterfaceChange = (
    value: boolean,
  ) => {
    setUseInterfaces(value);
    setOutput("");
    setError("");
    setCopied(false);
  };

  /*
   * ---------------------------------------------------------
   * Optional properties
   * ---------------------------------------------------------
   */

  const handleOptionalChange = () => {
    setOptionalProperties(
      (value) => !value,
    );

    setOutput("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="space-y-4">
      {/* =================================================
          PRIVACY
      ================================================= */}

      <ToolPrivacyNotice>
        Your JSON stays in your browser. Nothing is
        uploaded.
      </ToolPrivacyNotice>

      {/* =================================================
          OPTIONS
      ================================================= */}

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Root name */}

          <div>
            <label
              htmlFor="root-name"
              className="mb-2 block text-xs font-medium text-[var(--muted)]"
            >
              Root type name
            </label>

            <input
              id="root-name"
              type="text"
              value={rootName}
              onChange={(event) =>
                handleRootNameChange(
                  event.target.value,
                )
              }
              placeholder="Root"
              spellCheck={false}
              className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 font-mono text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--subtle)] focus:border-[var(--accent)]"
            />
          </div>

          {/* Output style */}

          <div>
            <span className="mb-2 block text-xs font-medium text-[var(--muted)]">
              Output style
            </span>

            <div className="flex h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] p-1">
              <button
                type="button"
                onClick={() =>
                  handleInterfaceChange(
                    true,
                  )
                }
                aria-pressed={useInterfaces}
                className={[
                  "flex-1 rounded-md px-3 text-xs font-medium transition-colors",
                  useInterfaces
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                Interface
              </button>

              <button
                type="button"
                onClick={() =>
                  handleInterfaceChange(
                    false,
                  )
                }
                aria-pressed={!useInterfaces}
                className={[
                  "flex-1 rounded-md px-3 text-xs font-medium transition-colors",
                  !useInterfaces
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                Type
              </button>
            </div>
          </div>

          {/* Optional properties */}

          <div>
            <span className="mb-2 block text-xs font-medium text-[var(--muted)]">
              Properties
            </span>

            <button
              type="button"
              onClick={
                handleOptionalChange
              }
              aria-pressed={
                optionalProperties
              }
              className="flex h-10 w-full items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <span>
                Optional properties
              </span>

              <span
                className={[
                  "relative h-5 w-9 rounded-full transition-colors",
                  optionalProperties
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--surface-elevated)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 size-4 rounded-full bg-white transition-transform",
                    optionalProperties
                      ? "translate-x-4"
                      : "translate-x-0.5",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          EDITORS
      ================================================= */}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* =================================================
            INPUT
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <FileJson
                size={16}
                className="text-[var(--accent)]"
              />

              <span className="text-sm font-medium">
                JSON Input
              </span>
            </div>

            <button
              type="button"
              onClick={loadSample}
              className="flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              <Code2 size={14} />
              Sample
            </button>
          </div>

          <JsonEditor
            value={input}
            onChange={handleInputChange}
            placeholder="Paste your JSON here..."
          />

          <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>JSON</span>

            <span>
              {input.length.toLocaleString()}{" "}
              characters
            </span>
          </div>
        </section>

        {/* =================================================
            OUTPUT
        ================================================= */}

        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
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
                TypeScript Output
              </span>

              {output && (
                <span className="rounded-md bg-[var(--success)]/10 px-1.5 py-0.5 text-[10px] font-medium text-[var(--success)]">
                  Generated
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                aria-label="Copy TypeScript output"
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
                onClick={downloadOutput}
                disabled={!output}
                aria-label="Download TypeScript output"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>

          <JsonEditor
            value={output}
            readOnly
            placeholder="Generated TypeScript will appear here..."
          />

          <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
            <span>TypeScript</span>

            <span>
              {output.length.toLocaleString()}{" "}
              characters
            </span>
          </div>
        </section>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <ToolError
          title="Conversion failed"
          message={error}
        />
      )}

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex flex-wrap items-center gap-2">
        <ToolActionButton
          variant="primary"
          icon={Code2}
          onClick={convert}
        >
          Convert

          <kbd className="hidden rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] sm:inline">
            Ctrl ↵
          </kbd>
        </ToolActionButton>

        <ToolActionButton
          variant="secondary"
          icon={Trash2}
          onClick={clearAll}
        >
          Clear
        </ToolActionButton>
      </div>

      {/* =================================================
          BOTTOM INFO
      ================================================= */}

      <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--subtle)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          JSON → TypeScript conversion happens locally.
        </span>

        <span>
          No data leaves your browser.
        </span>
      </div>
    </div>
  );
}

export default JsonToTypeScript;