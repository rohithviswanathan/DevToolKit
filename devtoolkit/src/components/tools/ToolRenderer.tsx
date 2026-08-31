import {
  AlertCircle,
} from "lucide-react";

import Base64Tool from "./Base64Tool";
import JsonFormatter from "./JsonFormatter";
import JsonToTypeScript from "./JsonToTypescript";
import RegexTester from "./RegexTester";
import UuidGenerator from "./UuidGenerator";
import JwtDecoder from "./JwtDecoder";

const toolComponents = {
  "json-formatter": JsonFormatter,
  "json-to-typescript": JsonToTypeScript,
  "uuid-generator": UuidGenerator,
  base64: Base64Tool,
  "regex-tester": RegexTester,
  "jwt-decoder": JwtDecoder,
} as const;

type ToolId = keyof typeof toolComponents;

interface ToolRendererProps {
  toolId: string;
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
   *
   * This should only appear if a tool exists in the route/data
   * layer but has not been registered in this renderer.
   */
  if (!ToolComponent) {
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

  return <ToolComponent />;
}

export default ToolRenderer;
