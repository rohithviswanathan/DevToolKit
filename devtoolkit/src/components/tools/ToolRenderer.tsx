import {
  lazy,
  Suspense,
} from "react";
import {
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

const toolComponents = {
  "json-formatter": lazy(
    () => import("./JsonFormatter"),
  ),
  "json-to-typescript": lazy(
    () => import("./JsonToTypescript"),
  ),
  "uuid-generator": lazy(
    () => import("./UuidGenerator"),
  ),
  base64: lazy(
    () => import("./Base64Tool"),
  ),
  "regex-tester": lazy(
    () => import("./RegexTester"),
  ),
  "jwt-decoder": lazy(
    () => import("./JwtDecoder"),
  ),
};

type ToolId = keyof typeof toolComponents;

interface ToolRendererProps {
  toolId: string;
}

function ToolLoading() {
  return (
    <div className="flex min-h-[420px] items-center justify-center p-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
          <LoaderCircle
            size={18}
            className="animate-spin text-[var(--accent)]"
          />
        </div>

        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          Loading tool...
        </p>

        <p className="mt-1 text-xs text-[var(--muted)]">
          Preparing the browser-based utility.
        </p>
      </div>
    </div>
  );
}

function ToolUnavailable() {
  return (
    <div className="flex min-h-[420px] items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
          <AlertCircle
            size={20}
            className="text-[var(--subtle)]"
          />
        </div>

        <h2 className="mt-4 text-lg font-medium text-[var(--foreground)]">
          Tool unavailable
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          This tool isn't currently available. Please
          return to the tools page and choose another
          utility.
        </p>
      </div>
    </div>
  );
}

function ToolRenderer({
  toolId,
}: ToolRendererProps) {
  const ToolComponent =
    toolComponents[
      toolId as ToolId
    ];

  /*
   * ---------------------------------------------------------
   * Invalid / unavailable tool
   * ---------------------------------------------------------
   */

  if (!ToolComponent) {
    return <ToolUnavailable />;
  }

  /*
   * ---------------------------------------------------------
   * Lazy-loaded tool
   * ---------------------------------------------------------
   *
   * Only the selected tool's JavaScript is loaded when
   * the route is opened.
   */
  return (
    <Suspense fallback={<ToolLoading />}>
      <div className="posthog-mask">
        <ToolComponent />
      </div>
    </Suspense>
  );
}

export default ToolRenderer;
