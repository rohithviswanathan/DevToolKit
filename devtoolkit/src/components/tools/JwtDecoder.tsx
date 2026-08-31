import {
  Check,
  Clipboard,
  Code2,
  FileText,
  Trash2,
  X,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import {
  decodeJwt,
  formatJwtJson,
  getJwtExpiration,
  getJwtIssuedAt,
  isJwtExpired,
  type DecodedJwt,
} from "../../lib/jwt";

import { trackToolUsed } from "../../lib/analytics";

import ToolPrivacyNotice from "./shared/ToolPrivacyNotice";
import ToolError from "./shared/ToolError";
import ToolEmptyState from "./shared/ToolEmptyState";
import ToolActionButton from "./shared/ToolActionButton";

const SAMPLE_JWT =
  "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiUm9oaXRoIPCfmoAiLCJjaXR5IjoiQmVuZ2FsdXJ1Iiwicm9sZSI6ImRldmVsb3BlciJ9.test-signature";

type OutputSectionProps = {
  title: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
};

function OutputSection({
  title,
  value,
  copied,
  onCopy,
}: OutputSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Code2
            size={16}
            className="shrink-0 text-[var(--accent)]"
          />

          <span className="truncate text-sm font-medium text-[var(--foreground)]">
            {title}
          </span>
        </div>

        <button
          type="button"
          onClick={onCopy}
          disabled={!value}
          aria-label={`Copy ${title}`}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? (
            <>
              <Check
                size={14}
                className="text-[var(--success)]"
              />
              Copied
            </>
          ) : (
            <>
              <Clipboard size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="min-h-[220px] overflow-auto whitespace-pre-wrap break-words bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)]">
        {value}
      </pre>
    </section>
  );
}

function JwtDecoder() {
  const [input, setInput] =
    useState("");

  const [decoded, setDecoded] =
    useState<DecodedJwt | null>(null);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState<"header" | "payload" | null>(
      null,
    );

  /*
   * ---------------------------------------------------------
   * Derived values
   * ---------------------------------------------------------
   */

  const headerOutput = useMemo(() => {
    if (!decoded) return "";

    return formatJwtJson(
      decoded.header,
    );
  }, [decoded]);

  const payloadOutput = useMemo(() => {
    if (!decoded) return "";

    return formatJwtJson(
      decoded.payload,
    );
  }, [decoded]);

  const expiration = useMemo(() => {
    if (!decoded) return null;

    return getJwtExpiration(
      decoded.payload,
    );
  }, [decoded]);

  const issuedAt = useMemo(() => {
    if (!decoded) return null;

    return getJwtIssuedAt(
      decoded.payload,
    );
  }, [decoded]);

  const expired = useMemo(() => {
    if (!decoded) return null;

    return isJwtExpired(
      decoded.payload,
    );
  }, [decoded]);

  /*
   * ---------------------------------------------------------
   * Decode
   * ---------------------------------------------------------
   */

  const decode = () => {
    if (!input.trim()) {
      setDecoded(null);
      setError(
        "Enter a JWT to decode.",
      );
      setCopied(null);

      return;
    }

    try {
      const result =
        decodeJwt(input);

      setDecoded(result);
      setError("");
      setCopied(null);

      trackToolUsed(
        "jwt-decoder",
        "decode",
      );
    } catch (err) {
      setDecoded(null);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to decode JWT.",
      );

      setCopied(null);
    }
  };

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    setInput(SAMPLE_JWT);
    setDecoded(null);
    setError("");
    setCopied(null);

    trackToolUsed(
      "jwt-decoder",
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
    setDecoded(null);
    setError("");
    setCopied(null);

    trackToolUsed(
      "jwt-decoder",
      "clear",
    );
  };

  /*
   * ---------------------------------------------------------
   * Input change
   * ---------------------------------------------------------
   */

  const handleInputChange = (
    value: string,
  ) => {
    setInput(value);
    setDecoded(null);
    setError("");
    setCopied(null);
  };

  /*
   * ---------------------------------------------------------
   * Copy
   * ---------------------------------------------------------
   */

  const copyValue = async (
    type: "header" | "payload",
  ) => {
    const value =
      type === "header"
        ? headerOutput
        : payloadOutput;

    if (!value) return;

    try {
      await navigator.clipboard.writeText(
        value,
      );

      setCopied(type);

      trackToolUsed(
        "jwt-decoder",
        `copy-${type}`,
      );

      window.setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch {
      setError(
        "Unable to copy the output.",
      );
    }
  };

  return (
    <div className="min-w-0 space-y-4">
      {/* Privacy */}

      <ToolPrivacyNotice>
        Your JWT stays in your browser. Nothing is
        uploaded or sent to a server.
      </ToolPrivacyNotice>

      {/* Input */}

      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex flex-col gap-2 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <FileText
              size={16}
              className="text-[var(--accent)]"
            />

            <span className="text-sm font-medium text-[var(--foreground)]">
              JWT Input
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

        <textarea
          value={input}
          onChange={(event) =>
            handleInputChange(
              event.target.value,
            )
          }
          placeholder="Paste your JWT here..."
          spellCheck={false}
          className="min-h-[180px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--subtle)] sm:min-h-[220px]"
        />

        <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--subtle)]">
          <span>
            {input.length.toLocaleString()}{" "}
            characters
          </span>

          <span>
            JWT
          </span>
        </div>
      </section>

      {/* Error */}

      {error && (
        <ToolError
          title="JWT decoding failed"
          message={error}
        />
      )}

      {/* Output */}

      {!decoded && !error && (
        <ToolEmptyState
          icon={Code2}
          title="No JWT decoded yet"
          description="Paste a JWT and click Decode to inspect its header and payload."
          minHeight="min-h-[220px]"
        />
      )}

      {decoded && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <OutputSection
              title="Header"
              value={headerOutput}
              copied={copied === "header"}
              onCopy={() =>
                copyValue("header")
              }
            />

            <OutputSection
              title="Payload"
              value={payloadOutput}
              copied={copied === "payload"}
              onCopy={() =>
                copyValue("payload")
              }
            />
          </div>

          {/* Token information */}

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="mb-4 flex items-center gap-2">
              {expired === true ? (
                <X
                  size={16}
                  className="text-[var(--error)]"
                />
              ) : (
                <Check
                  size={16}
                  className="text-[var(--success)]"
                />
              )}

              <h2 className="text-sm font-medium text-[var(--foreground)]">
                Token information
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <p className="text-xs text-[var(--subtle)]">
                  Structure
                </p>

                <p className="mt-1 text-sm font-medium text-[var(--success)]">
                  Valid JWT structure
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <p className="text-xs text-[var(--subtle)]">
                  Expiration
                </p>

                <p
                  className={[
                    "mt-1 text-sm font-medium",
                    expired === true
                      ? "text-[var(--error)]"
                      : "text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {expiration
                    ? expiration.toLocaleString()
                    : "Not provided"}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <p className="text-xs text-[var(--subtle)]">
                  Issued at
                </p>

                <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                  {issuedAt
                    ? issuedAt.toLocaleString()
                    : "Not provided"}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <p className="text-xs text-[var(--subtle)]">
                  Signature
                </p>

                <p className="mt-1 truncate font-mono text-xs text-[var(--muted)]">
                  {decoded.signature}
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Actions */}

      <div className="flex flex-wrap items-center gap-2">
        <ToolActionButton
          variant="primary"
          icon={Code2}
          onClick={decode}
        >
          Decode
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
          JWT decoding happens entirely in your browser.
        </span>

        <span>
          Decoding does not verify the token signature.
        </span>
      </div>
    </div>
  );
}

export default JwtDecoder;