import { ArrowLeft, Wrench } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | DevToolkit";

    return () => {
      document.title = "DevToolkit — Free Developer Tools";
    };
  }, []);

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
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          The page you're looking for doesn't exist or may
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

export default NotFound;