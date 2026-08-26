import {
  Check,
  Clipboard,
  Copy,
  Download,
  Fingerprint,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { generateUuids } from "../../lib/uuid";
import { trackToolUsed } from "../../lib/analytics";

import ToolPrivacyNotice from "./shared/ToolPrivacyNotice";
import ToolError from "./shared/ToolError";
import ToolEmptyState from "./shared/ToolEmptyState";
import ToolActionButton from "./shared/ToolActionButton";

const QUANTITY_OPTIONS = [
  1,
  5,
  10,
  25,
  50,
];

function UuidGenerator() {
  const [quantity, setQuantity] = useState(5);

  const [uuids, setUuids] = useState<string[]>([]);

  const [copiedIndex, setCopiedIndex] =
    useState<number | null>(null);

  const [copiedAll, setCopiedAll] =
    useState(false);

  const [error, setError] = useState("");

  /*
   * ---------------------------------------------------------
   * Generate
   * ---------------------------------------------------------
   */

  const handleGenerate = () => {
    try {
      const generated = generateUuids(quantity);

      setUuids(generated);
      setError("");
      setCopiedIndex(null);
      setCopiedAll(false);

      trackToolUsed(
        "uuid-generator",
        "generate",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate UUIDs.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * Copy single UUID
   * ---------------------------------------------------------
   */

  const handleCopy = async (
    uuid: string,
    index: number,
  ) => {
    try {
      await navigator.clipboard.writeText(uuid);

      setCopiedIndex(index);

      window.setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch {
      setError("Unable to copy UUID.");
    }
  };

  /*
   * ---------------------------------------------------------
   * Copy all
   * ---------------------------------------------------------
   */

  const allUuids = useMemo(
    () => uuids.join("\n"),
    [uuids],
  );

  const handleCopyAll = async () => {
    if (!allUuids) return;

    try {
      await navigator.clipboard.writeText(
        allUuids,
      );

      setCopiedAll(true);

      window.setTimeout(() => {
        setCopiedAll(false);
      }, 1500);
    } catch {
      setError("Unable to copy UUIDs.");
    }
  };

  /*
   * ---------------------------------------------------------
   * Download
   * ---------------------------------------------------------
   */

  const handleDownload = () => {
    if (!allUuids) return;

    const blob = new Blob([allUuids], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "uuids.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /*
   * ---------------------------------------------------------
   * Clear
   * ---------------------------------------------------------
   */

  const handleClear = () => {
    setUuids([]);
    setError("");
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  return (
    <div className="space-y-4">
      {/* Privacy */}
      <ToolPrivacyNotice>
        UUIDs are generated locally in your browser.
        Nothing is uploaded.
      </ToolPrivacyNotice>

      {/* Configuration */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          {/* Quantity */}
          <div>
            <span className="mb-2 block text-xs font-medium text-[var(--muted)]">
              Quantity
            </span>

            <div className="flex flex-wrap gap-1.5">
              {QUANTITY_OPTIONS.map((option) => {
                const selected =
                  quantity === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setQuantity(option)
                    }
                    className={[
                      "min-w-10 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                      selected
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]",
                    ].join(" ")}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Version */}
          <div className="sm:min-w-40">
            <span className="mb-2 block text-xs font-medium text-[var(--muted)]">
              UUID version
            </span>

            <div className="flex h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3">
              <Fingerprint
                size={15}
                className="text-[var(--accent)]"
              />

              <span className="text-xs text-[var(--foreground)]">
                UUID v4
              </span>
            </div>
          </div>

          {/* Generate */}
          <div className="w-full sm:w-auto">
            <ToolActionButton
              variant="primary"
              icon={RefreshCw}
              onClick={handleGenerate}
              className="w-full sm:w-auto"
            >
              Generate UUIDs
            </ToolActionButton>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint
              size={16}
              className="text-[var(--accent)]"
            />

            <span className="text-sm font-medium">
              Generated UUIDs
            </span>

            {uuids.length > 0 && (
              <span className="rounded-md bg-[var(--surface-elevated)] px-1.5 py-0.5 text-[10px] text-[var(--subtle)]">
                {uuids.length}
              </span>
            )}
          </div>

          {uuids.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={handleCopyAll}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                {copiedAll ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy all
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                <Download size={14} />
                Download
              </button>

              <ToolActionButton
                variant="ghost"
                icon={Trash2}
                onClick={handleClear}
              >
                Clear
              </ToolActionButton>
            </div>
          )}
        </div>

        {/* Empty state */}
        {uuids.length === 0 && (
          <ToolEmptyState
            icon={Fingerprint}
            title="No UUIDs generated yet"
            description="Choose how many UUIDs you need and click Generate UUIDs."
          />
        )}

        {/* UUID list */}
        {uuids.length > 0 && (
          <div className="divide-y divide-[var(--border)]">
            {uuids.map((uuid, index) => (
              <div
                key={uuid}
                className="group flex min-w-0 items-center gap-2 px-3 py-3 transition-colors hover:bg-white/[0.02] sm:gap-3 sm:px-4"
              >
                <span className="w-5 shrink-0 text-right font-mono text-[10px] text-[var(--subtle)] sm:w-6">
                  {index + 1}
                </span>

                <code className="min-w-0 flex-1 break-all font-mono text-sm text-[var(--foreground)]">
                  {uuid}
                </code>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      uuid,
                      index,
                    )
                  }
                  aria-label={`Copy UUID ${index + 1}`}
                  className="shrink-0 rounded-lg p-2 text-[var(--subtle)] opacity-100 transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)] sm:opacity-0 sm:group-hover:opacity-100"
                >
                  {copiedIndex === index ? (
                    <Check
                      size={15}
                      className="text-[var(--success)]"
                    />
                  ) : (
                    <Clipboard size={15} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <ToolError
          title="Generation failed"
          message={error}
        />
      )}

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--subtle)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          UUID v4 uses cryptographically secure
          random values.
        </span>

        <span>
          Runs entirely in your browser.
        </span>
      </div>
    </div>
  );
}

export default UuidGenerator;