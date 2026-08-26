import ToolCard from "../components/tools/ToolCard";
import { tools } from "../data/tools";

function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative flex min-h-[500px] items-center justify-center py-16 sm:min-h-[540px] sm:py-20">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl sm:size-[440px]" />

        <div className="max-w-3xl text-center">
          <p className="mb-5 text-sm font-medium tracking-wide text-[var(--accent)]">
            Developer utilities
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Developer tools,
            <br />
            <span className="text-[var(--muted)]">
              without the nonsense.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Fast, focused utilities for developers.
            <br className="hidden sm:block" />
            No clutter. No unnecessary setup.
          </p>

          {/* Hero metadata */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--subtle)]">
            <span>
              {tools.length} tools
            </span>

            <span
              className="size-1 rounded-full bg-[var(--border)]"
              aria-hidden="true"
            />

            <span>
              Runs in your browser
            </span>

            <span
              className="size-1 rounded-full bg-[var(--border)]"
              aria-hidden="true"
            />

            <span>
              No setup required
            </span>
          </div>

          {/* Scroll hint */}
          <a
            href="#tools"
            className="mt-10 inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-medium text-[var(--muted)] transition-all duration-200 hover:border-white/15 hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          >
            Explore tools
          </a>
        </div>
      </section>

      {/* Popular */}
      <section
        id="tools"
        className="scroll-mt-24 pb-20"
      >
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Popular tools
            </h2>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Everything you need for everyday development.
            </p>
          </div>

          <span className="text-xs text-[var(--subtle)]">
            {tools.length} available
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;