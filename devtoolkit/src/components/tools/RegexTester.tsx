import {
  Check,
  Clipboard,
  Code2,
  FileText,
  Trash2,
} from "lucide-react";
import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { testRegex } from "../../lib/regex";
import { trackToolUsed } from "../../lib/analytics";

import ToolPrivacyNotice from "./shared/ToolPrivacyNotice";
import ToolError from "./shared/ToolError";
import ToolEmptyState from "./shared/ToolEmptyState";
import ToolActionButton from "./shared/ToolActionButton";

type Flag = {
  value: string;
  label: string;
};

const FLAGS: Flag[] = [
  {
    value: "g",
    label: "Global",
  },
  {
    value: "i",
    label: "Ignore case",
  },
  {
    value: "m",
    label: "Multiline",
  },
  {
    value: "s",
    label: "DotAll",
  },
  {
    value: "u",
    label: "Unicode",
  },
  {
    value: "y",
    label: "Sticky",
  },
];

const SAMPLE_PATTERN =
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

const SAMPLE_TEXT = `john@example.com
invalid-email
hello@example.com
admin@devtoolkit.io
not-an-email`;

function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("g");
  const [copied, setCopied] = useState(false);

  /*
   * ---------------------------------------------------------
   * Regex result
   * ---------------------------------------------------------
   */

  const result = useMemo(() => {
    if (!pattern) {
      return {
        matches: [],
        valid: true,
        error: null,
      };
    }

    return testRegex(
      pattern,
      flags,
      text,
    );
  }, [pattern, flags, text]);

  /*
   * ---------------------------------------------------------
   * Toggle flags
   * ---------------------------------------------------------
   */

  const toggleFlag = (flag: string) => {
    setFlags((current) => {
      if (current.includes(flag)) {
        const nextFlags = current.replace(flag, "");

        trackToolUsed(
          "regex-tester",
          `flag_removed_${flag}`,
        );

        return nextFlags;
      }

      /*
      * Keep flags in the normal JavaScript order.
      */
      const order = "dgimsuvy";

      const nextFlags = [...new Set(`${current}${flag}`)]
        .sort(
          (a, b) =>
            order.indexOf(a) -
            order.indexOf(b),
        )
        .join("");

      trackToolUsed(
        "regex-tester",
        `flag_added_${flag}`,
      );

      return nextFlags;
    });
  };

  /*
   * ---------------------------------------------------------
   * Sample
   * ---------------------------------------------------------
   */

  const loadSample = () => {
    setPattern(SAMPLE_PATTERN);
    setText(SAMPLE_TEXT);
    setFlags("gm");
    setCopied(false);
    trackToolUsed("regex-tester", "sample");
  };

  /*
   * ---------------------------------------------------------
   * Clear
   * ---------------------------------------------------------
   */

  const clearAll = () => {
    setPattern("");
    setText("");
    setFlags("g");
    setCopied(false);

    trackToolUsed(
      "regex-tester",
      "clear",
    );
  };

  /*
   * ---------------------------------------------------------
   * Copy
   * ---------------------------------------------------------
   */

  const copyPattern = async () => {
    if (!pattern) return;

    try {
      await navigator.clipboard.writeText(
        `/${pattern}/${flags}`,
      );

      setCopied(true);

      trackToolUsed(
        "regex-tester",
        "copy",
      );

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Highlight matches
   * ---------------------------------------------------------
   */

  const highlightedText = useMemo(() => {
    if (
      !text ||
      !result.valid ||
      result.matches.length === 0
    ) {
      return null;
    }

    const nodes: ReactNode[] = [];

    let cursor = 0;

    result.matches.forEach(
      (match, index) => {
        const start = match.index;
        const end =
          match.index + match.length;

        /*
         * Ignore invalid ranges.
         */
        if (
          start < cursor ||
          start > text.length
        ) {
          return;
        }

        /*
         * Normal text before the match.
         */
        if (start > cursor) {
          nodes.push(
            <span
              key={`text-${index}`}
            >
              {text.slice(
                cursor,
                start,
              )}
            </span>,
          );
        }

        /*
         * Matched section.
         */
        if (match.length > 0) {
          nodes.push(
            <mark
              key={`match-${index}`}
              className="rounded bg-[var(--accent)]/30 px-0.5 text-[var(--foreground)]"
            >
              {text.slice(
                start,
                end,
              )}
            </mark>,
          );

          cursor = end;
        }
      },
    );

    /*
     * Remaining text.
     */
    if (cursor < text.length) {
      nodes.push(
        <span key="remaining">
          {text.slice(cursor)}
        </span>,
      );
    }

    return nodes;
  }, [
    text,
    result,
  ]);

  return (
    <div className="space-y-4">
      {/* Privacy */}
      <ToolPrivacyNotice>
        Regex matching happens entirely in your
        browser. Your test data is never uploaded.
      </ToolPrivacyNotice>

      {/* Regex editor */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <Code2
              size={16}
              className="text-[var(--accent)]"
            />

            <span className="text-sm font-medium">
              Regular Expression
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-lg px-2.5 py-1.5 text-xs text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              Sample
            </button>

            <button
              type="button"
              onClick={copyPattern}
              disabled={!pattern}
              aria-label="Copy regular expression"
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
          </div>
        </div>

        {/* Pattern input */}
        <div className="flex items-center px-4">
          <span className="font-mono text-lg text-[var(--subtle)]">
            /
          </span>

          <input
            value={pattern}
            onChange={(event) => {
              setPattern(
                event.target.value,
              );
              setCopied(false);
            }}
            placeholder="Enter your regex..."
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent px-3 py-4 font-mono text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--subtle)]"
          />

          <span className="font-mono text-lg text-[var(--subtle)]">
            /{flags}
          </span>
        </div>

        {/* Flags */}
        <div className="border-t border-[var(--border)] px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {FLAGS.map((flag) => {
              const active =
                flags.includes(
                  flag.value,
                );

              return (
                <button
                  key={flag.value}
                  type="button"
                  title={flag.label}
                  onClick={() =>
                    toggleFlag(
                      flag.value,
                    )
                  }
                  className={[
                    "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors",
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                >
                  {flag.value}

                  <span className="ml-1.5 font-sans">
                    {flag.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Test text */}
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText
              size={16}
              className="text-[var(--accent)]"
            />

            <span className="text-sm font-medium">
              Test String
            </span>
          </div>

          <span className="text-xs text-[var(--subtle)]">
            {text.length.toLocaleString()}{" "}
            characters
          </span>
        </div>

        <textarea
          value={text}
          onChange={(event) =>
            setText(
              event.target.value,
            )
          }
          placeholder="Enter text to test..."
          spellCheck={false}
          className="min-h-[220px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--subtle)]"
        />
      </section>

      {/* Invalid regex */}
      {result.error && (
        <ToolError
          title="Invalid regular expression"
          message={result.error}
        />
      )}

      {/* No regex */}
      {!pattern && (
        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <ToolEmptyState
            icon={Code2}
            title="Start testing your regex"
            description="Enter a regular expression and some test text to see matches here."
          />
        </section>
      )}

      {/* Results */}
      {pattern &&
        result.valid && (
          <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            {/* Result header */}
            <div className="flex flex-col gap-3 border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[var(--success)]" />

                  <span className="text-xs text-[var(--muted)]">
                    Valid regex
                  </span>
                </div>

                <span className="h-3 w-px bg-[var(--border)]" />

                <span className="text-xs text-[var(--muted)]">
                  {result.matches.length}{" "}
                  {result.matches.length ===
                  1
                    ? "match"
                    : "matches"}
                </span>
              </div>

              <code className="break-all text-xs text-[var(--subtle)]">
                /{pattern}/{flags}
              </code>
            </div>

            {/* Highlighted results */}
            {text && (
              <div className="border-b border-[var(--border)] p-4">
                <span className="mb-2 block text-xs font-medium text-[var(--muted)]">
                  Matches
                </span>

                <div className="max-h-[280px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 font-mono text-sm leading-7 text-[var(--foreground)]">
                  {result.matches.length >
                  0 ? (
                    highlightedText
                  ) : (
                    <span className="text-[var(--subtle)]">
                      No matches found.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Match list */}
            <div>
              <div className="border-b border-[var(--border)] px-4 py-3">
                <span className="text-xs font-medium text-[var(--muted)]">
                  Match details
                </span>
              </div>

              {result.matches.length ===
              0 ? (
                <div className="px-4 py-8 text-center text-xs text-[var(--subtle)]">
                  No matches found.
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {result.matches.map(
                    (
                      match,
                      index,
                    ) => (
                      <div
                        key={`${match.index}-${index}`}
                        className="px-4 py-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 shrink-0 pt-2 text-right font-mono text-[10px] text-[var(--subtle)]">
                            {index + 1}
                          </span>

                          <div className="min-w-0 flex-1">
                            <code className="block break-all rounded-lg bg-[var(--background)] px-3 py-2 font-mono text-sm text-[var(--foreground)]">
                              {match.match ||
                                "(empty match)"}
                            </code>

                            <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-[var(--subtle)]">
                              <span>
                                Index:{" "}
                                {match.index}
                              </span>

                              <span>
                                Length:{" "}
                                {match.length}
                              </span>
                            </div>
                          </div>
                        </div>

                        {match.groups.length >
                          0 && (
                          <div className="ml-9 mt-3">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-wide text-[var(--subtle)]">
                              Capture groups
                            </span>

                            <div className="flex flex-wrap gap-2">
                              {match.groups.map(
                                (
                                  group,
                                  groupIndex,
                                ) => (
                                  <span
                                    key={
                                      groupIndex
                                    }
                                    className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-1 font-mono text-[10px] text-[var(--muted)]"
                                  >
                                    ${groupIndex + 1}:
                                    {" "}
                                    {group ||
                                      "(empty)"}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </section>
        )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <ToolActionButton
          variant="secondary"
          icon={Trash2}
          onClick={clearAll}
        >
          Clear
        </ToolActionButton>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--subtle)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          Powered by JavaScript's native RegExp engine.
        </span>

        <span>
          Your data never leaves your browser.
        </span>
      </div>
    </div>
  );
}

export default RegexTester;