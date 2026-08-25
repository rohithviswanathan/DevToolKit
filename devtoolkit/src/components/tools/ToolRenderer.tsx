import Base64Tool from "./Base64Tool";
import JsonFormatter from "./JsonFormatter";
import JsonToTypeScript from "./JsonToTypescript";
import RegexTester from "./RegexTester";
import UuidGenerator from "./UuidGenerator";

const toolComponents = {
  "json-formatter": JsonFormatter,
  "json-to-typescript": JsonToTypeScript,
  "uuid-generator": UuidGenerator,
  base64: Base64Tool,
  "regex-tester": RegexTester,
} as const;

interface ToolRendererProps {
  toolId: string;
}

function ToolRenderer({
  toolId,
}: ToolRendererProps) {
  const ToolComponent =
    toolComponents[
      toolId as keyof typeof toolComponents
    ];

  if (!ToolComponent) {
    return (
      <div className="flex min-h-[420px] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
            <span className="font-mono text-sm text-[var(--muted)]">
              {"</>"}
            </span>
          </div>

          <h2 className="mt-4 text-lg font-medium text-[var(--foreground)]">
            This tool is being prepared.
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            We're building this utility to be fast,
            simple and completely browser-based.
          </p>
        </div>
      </div>
    );
  }

  return <ToolComponent />;
}

export default ToolRenderer;