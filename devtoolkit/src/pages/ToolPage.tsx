import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getToolById } from "../data/tools";
import ToolCard from "../components/tools/ToolCard";
import ToolRenderer from "../components/tools/ToolRenderer";

function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();

  const tool = toolId ? getToolById(toolId) : undefined;

  if (!tool) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--error)]">
            404
          </p>

          <h1 className="mt-2 text-2xl font-semibold">
            Tool not found
          </h1>

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
          >
            <ArrowLeft size={15} />
            Back to DevToolkit
          </Link>
        </div>
      </main>
    );
  }

  const relatedTools = tool.related
    .map((id) => getToolById(id))
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-[var(--subtle)]">
        <Link
          to="/"
          className="transition-colors hover:text-[var(--foreground)]"
        >
          Home
        </Link>

        <span>/</span>

        <span className="text-[var(--muted)]">
          {tool.name}
        </span>
      </div>

      {/* Header */}
      <section className="max-w-3xl">
        <span className="text-sm font-medium text-[var(--accent)]">
          {tool.category}
        </span>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {tool.name}
        </h1>

        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          {tool.longDescription}
        </p>
      </section>

      {/* Workspace */}
      <section className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex h-12 items-center justify-between border-b border-[var(--border)] px-4">
          <span className="text-sm font-medium text-[var(--foreground)]">
            Workspace
          </span>

          <span className="text-xs text-[var(--subtle)]">
            Coming soon
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <ToolRenderer toolId={tool.id} />
        </div>
      </section>

      {/* About */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          About this tool
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          {tool.longDescription}
        </p>
      </section>

      {/* Related */}
      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Related tools
          </h2>

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
    </main>
  );
}

export default ToolPage;