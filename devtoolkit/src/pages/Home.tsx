import ToolCard from "../components/tools/ToolCard";
import { tools } from "../data/tools";

function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center justify-center py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" />

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
        </div>
      </section>

      {/* Popular */}
      <section id="tools" className="pb-20">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Popular tools
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Everything you need for everyday development.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;