import type { Tool, ToolCategory } from "../types/tools";

export const tools: Tool[] = [
  {
    id: "json-formatter",

    name: "JSON Formatter",

    description:
      "Format, validate, beautify and minify JSON instantly.",

    longDescription:
      "Format, validate, beautify and minify JSON directly in your browser. Quickly turn messy JSON into clean, readable data.",

    category: "JSON",

    icon: "braces",

    route: "/tools/json-formatter",

    keywords: [
      "json",
      "formatter",
      "validator",
      "validate",
      "beautify",
      "pretty print",
      "minify",
      "json minifier",
    ],

    related: [
      "json-to-typescript",
      "regex-tester",
    ],
  },

  {
    id: "json-to-typescript",

    name: "JSON → TypeScript",

    description:
      "Generate TypeScript interfaces and types from JSON.",

    longDescription:
      "Convert JSON objects into TypeScript interfaces or types directly in your browser. Customize the root type name and optional properties without sending your data anywhere.",

    category: "JSON",

    icon: "code",

    route: "/tools/json-to-typescript",

    keywords: [
      "json",
      "typescript",
      "interface",
      "interfaces",
      "type",
      "types",
      "converter",
      "json to typescript",
    ],

    related: [
      "json-formatter",
      "jwt-decoder",
    ],
  },

  {
    id: "uuid-generator",

    name: "UUID Generator",

    description:
      "Generate unique UUIDs instantly.",

    longDescription:
      "Generate random UUIDs directly in your browser. Useful for development, testing, mock data and generating unique identifiers.",

    category: "Utilities",

    icon: "fingerprint",

    route: "/tools/uuid-generator",

    keywords: [
      "uuid",
      "uuid generator",
      "guid",
      "unique id",
      "identifier",
      "random id",
      "uuid v4",
    ],

    related: [
      "json-to-typescript",
      "json-formatter",
    ],
  },

  {
    id: "base64",

    name: "Base64 Encoder / Decoder",

    description:
      "Encode and decode Base64 strings.",

    longDescription:
      "Encode text to Base64 or decode Base64 strings directly in your browser. Supports Unicode and UTF-8 text without sending your data anywhere.",

    category: "Encoding",

    icon: "binary",

    route: "/tools/base64",

    keywords: [
      "base64",
      "base64 encoder",
      "base64 decoder",
      "encode",
      "decode",
      "encoding",
      "decoder",
    ],

    related: [
      "jwt-decoder",
      "uuid-generator",
    ],
  },

  {
    id: "regex-tester",

    name: "Regex Tester",

    description:
      "Test regular expressions against sample text.",

    longDescription:
      "Build, test and debug regular expressions against sample text with instant feedback. View matches, indexes, lengths and capture groups directly in your browser.",

    category: "Regex",

    icon: "regex",

    route: "/tools/regex-tester",

    keywords: [
      "regex",
      "regexp",
      "regular expression",
      "regex tester",
      "pattern",
      "match",
      "capture groups",
      "javascript regex",
    ],

    related: [
      "json-formatter",
      "base64",
    ],
  },

  {
    id: "jwt-decoder",

    name: "JWT Decoder",

    description:
      "Decode and inspect JWT headers and payloads directly in your browser.",

    longDescription:
      "Decode JSON Web Tokens directly in your browser and inspect their header, payload and expiration information without sending the token to a server.",

    category: "Utilities",

    icon: "key-round",

    route: "/tools/jwt-decoder",

    keywords: [
      "jwt",
      "json web token",
      "token",
      "decode jwt",
      "jwt decoder",
      "authentication",
      "authorization",
      "bearer token",
      "access token",
    ],

    related: [
      "base64",
      "json-to-typescript",
    ],
  },
];

export function getToolById(
  id: string,
): Tool | undefined {
  return tools.find(
    (tool) => tool.id === id,
  );
}

export function getToolsByCategory(
  category: ToolCategory,
): Tool[] {
  return tools.filter(
    (tool) => tool.category === category,
  );
}