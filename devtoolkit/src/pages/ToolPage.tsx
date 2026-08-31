import { ArrowLeft, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getToolById } from "../data/tools";
import ToolCard from "../components/tools/ToolCard";
import ToolRenderer from "../components/tools/ToolRenderer";

function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();

  const tool = toolId
    ? getToolById(toolId)
    : undefined;

  /*
   * ---------------------------------------------------------
   * Tool not found
   * ---------------------------------------------------------
   */

  if (!tool) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <Wrench
              size={20}
              className="text-[var(--subtle)]"
            />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--error)]">
            Error 404
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Tool not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            The tool you're looking for doesn't exist or may
            have been moved.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <ArrowLeft size={15} />
            Back to DevToolkit
          </Link>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * Related tools
   * ---------------------------------------------------------
   */

  const relatedTools = tool.related
    .map((id) => getToolById(id))
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* =====================================================
          Breadcrumb
      ===================================================== */}
      <nav
        aria-label="Breadcrumb"
        className="mb-7 flex min-w-0 items-center gap-2 overflow-hidden text-sm"
      >
        <Link
          to="/"
          className="shrink-0 text-[var(--subtle)] transition-colors hover:text-[var(--foreground)]"
        >
          Home
        </Link>

        <span
          aria-hidden="true"
          className="shrink-0 text-[var(--subtle)]"
        >
          /
        </span>

        <span className="min-w-0 truncate text-[var(--muted)]">
          {tool.name}
        </span>
      </nav>

      {/* =====================================================
          Header
      ===================================================== */}
      <header className="max-w-3xl">
        <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
          <span className="text-xs font-medium text-[var(--accent)]">
            {tool.category}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.6rem]">
          {tool.name}
        </h1>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
          {tool.longDescription}
        </p>
      </header>

      {/* =====================================================
          Workspace
      ===================================================== */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm sm:mt-10">
        {/* Workspace header */}
        <div className="flex min-h-12 items-center justify-between gap-4 border-b border-[var(--border)] px-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/10">
              <Wrench
                size={13}
                className="text-[var(--accent)]"
              />
            </div>

            <span className="truncate text-sm font-medium text-[var(--foreground)]">
              {tool.name}
            </span>
          </div>

          <span className="hidden shrink-0 text-xs text-[var(--subtle)] sm:block">
            Runs in your browser
          </span>
        </div>

        {/* Tool */}
        <div className="min-w-0 p-4 sm:p-6">
          <ToolRenderer toolId={tool.id} />
        </div>
      </section>

      {/* =====================================================
          About
      ===================================================== */}
      <section className="mt-12 max-w-3xl sm:mt-14">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          About {tool.name}
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          {tool.longDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--subtle)]">
            Free to use
          </span>

          <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--subtle)]">
            No signup required
          </span>

          <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--subtle)]">
            Browser-based
          </span>
        </div>
      </section>

      {/* =====================================================
          Related Tools
      ===================================================== */}
      {relatedTools.length > 0 && (
        <section className="mt-12 sm:mt-14">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
              Related tools
            </h2>

            <p className="text-sm text-[var(--subtle)]">
              More utilities that may be useful for your workflow.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map(
              (relatedTool) =>
                relatedTool && (
                  <ToolCard
                    key={relatedTool.id}
                    tool={relatedTool}
                  />
                ),
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          Bottom navigation
      ===================================================== */}
      <div className="mt-12 border-t border-[var(--border)] pt-6 sm:mt-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft size={15} />
          Browse all tools
        </Link>
      </div>
    </main>
  );
}

export default ToolPage;