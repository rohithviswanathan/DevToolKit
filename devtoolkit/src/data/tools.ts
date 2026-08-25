import type { Tool, ToolCategory } from "../types/tools";

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate and beautify JSON instantly.",
    longDescription:
      "Format and validate JSON directly in your browser. Quickly turn messy JSON into clean, readable data.",
    category: "JSON",
    icon: "braces",
    route: "/tools/json-formatter",
    keywords: [
      "json",
      "formatter",
      "validator",
      "beautify",
      "pretty print",
    ],
    related: ["json-to-typescript", "regex-tester"],
  },

  {
    id: "json-to-typescript",
    name: "JSON → TypeScript",
    description: "Generate TypeScript interfaces from JSON.",
    longDescription:
      "Convert JSON objects into TypeScript interfaces and types without sending your data anywhere.",
    category: "JSON",
    icon: "code",
    route: "/tools/json-to-typescript",
    keywords: [
      "json",
      "typescript",
      "interface",
      "type",
      "converter",
    ],
    related: ["json-formatter", "uuid-generator"],
  },

  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate unique UUIDs instantly.",
    longDescription:
      "Generate random UUIDs directly in your browser. Useful for development, testing and data generation.",
    category: "Utilities",
    icon: "fingerprint",
    route: "/tools/uuid-generator",
    keywords: [
      "uuid",
      "guid",
      "unique id",
      "identifier",
      "random id",
    ],
    related: ["base64", "json-formatter"],
  },

  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 strings.",
    longDescription:
      "Encode text to Base64 or decode Base64 strings directly in your browser.",
    category: "Encoding",
    icon: "binary",
    route: "/tools/base64",
    keywords: [
      "base64",
      "encode",
      "decode",
      "encoding",
      "decoder",
    ],
    related: ["json-formatter", "regex-tester"],
  },

  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions against sample text.",
    longDescription:
      "Build, test and debug regular expressions against sample text with instant feedback.",
    category: "Regex",
    icon: "regex",
    route: "/tools/regex-tester",
    keywords: [
      "regex",
      "regexp",
      "regular expression",
      "pattern",
      "match",
    ],
    related: ["json-formatter", "base64"],
  },
];

export function getToolById(id: string) {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: ToolCategory) {
  return tools.filter((tool) => tool.category === category);
}