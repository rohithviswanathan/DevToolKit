import { useEffect } from "react";
import ToolCard from "../components/tools/ToolCard";
import { tools } from "../data/tools";

function Home() {
  useEffect(() => {
    document.title = "DevToolkit — Free Developer Tools";
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* =====================================================
          Hero
      ===================================================== */}
      <section className="relative flex min-h-[500px] items-center justify-center py-16 sm:min-h-[540px] sm:py-20">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl sm:size-[440px]"
        />

        <div className="max-w-3xl text-center">
          <p className="mb-5 text-sm font-medium tracking-wide text-[var(--accent)]">
            Free developer utilities
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Developer tools,
            <br />
            <span className="text-[var(--muted)]">
              without the nonsense.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Fast, focused developer tools for everyday tasks.
            Format JSON, test regex, decode JWTs, generate UUIDs,
            and more — directly in your browser.
          </p>

          {/* Hero metadata */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--subtle)]">
            <span>{tools.length} free tools</span>

            <span
              className="size-1 rounded-full bg-[var(--border)]"
              aria-hidden="true"
            />

            <span>Runs in your browser</span>

            <span
              className="size-1 rounded-full bg-[var(--border)]"
              aria-hidden="true"
            />

            <span>No signup required</span>
          </div>

          {/* CTA */}
          <a
            href="#tools"
            className="mt-10 inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--accent-hover)]"
          >
            Explore developer tools
          </a>

          <p className="mt-4 text-xs text-[var(--subtle)]">
            No downloads. No account. Just useful tools.
          </p>
        </div>
      </section>

      {/* =====================================================
          Value strip
      ===================================================== */}
      <section
        aria-label="DevToolkit benefits"
        className="border-y border-[var(--border)] py-5"
      >
        <div className="grid gap-4 text-center sm:grid-cols-3 sm:divide-x sm:divide-[var(--border)]">
          <div className="px-4">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Browser-based
            </p>

            <p className="mt-1 text-xs leading-5 text-[var(--subtle)]">
              Your developer tools run directly in your browser.
            </p>
          </div>

          <div className="px-4">
            <p className="text-sm font-medium text-[var(--foreground)]">
              No signup
            </p>

            <p className="mt-1 text-xs leading-5 text-[var(--subtle)]">
              Start using the tools immediately without an account.
            </p>
          </div>

          <div className="px-4">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Free to use
            </p>

            <p className="mt-1 text-xs leading-5 text-[var(--subtle)]">
              Simple utilities for everyday development tasks.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          Tools
      ===================================================== */}
      <section
        id="tools"
        className="scroll-mt-24 pb-20 pt-20 sm:pt-24"
      >
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
              Developer tools
            </h2>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Practical utilities for everyday development.
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