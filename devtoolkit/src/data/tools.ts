import type { Tool, ToolCategory } from "../types/tools";

export const tools: Tool[] = [
  {
    id: "json-formatter",

    name: "JSON Formatter",

    description:
      "Format, validate, beautify and minify JSON instantly.",

    longDescription:
      "Format, validate, beautify and minify JSON directly in your browser. Quickly turn messy JSON into clean, readable data.",

    seoTitle:
      "JSON Formatter & Validator Online — Free | DevToolkit",

    seoDescription:
      "Format, validate, beautify and minify JSON online. Free browser-based JSON formatter and validator with no signup required.",

    category: "JSON",

    icon: "braces",

    route: "/tools/json-formatter",

    keywords: [
      "json",
      "json formatter",
      "json validator",
      "json beautifier",
      "json pretty print",
      "json minifier",
      "format json",
      "validate json",
      "beautify json",
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

    seoTitle:
      "JSON to TypeScript Converter — Free Online Tool | DevToolkit",

    seoDescription:
      "Convert JSON to TypeScript interfaces and types online. Generate clean TypeScript definitions directly in your browser with no signup required.",

    category: "JSON",

    icon: "code",

    route: "/tools/json-to-typescript",

    keywords: [
      "json to typescript",
      "json to typescript converter",
      "json to interface",
      "json to type",
      "typescript interface generator",
      "typescript type generator",
      "json converter",
      "json interface generator",
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

    seoTitle:
      "UUID Generator — Generate UUID v4 Online | DevToolkit",

    seoDescription:
      "Generate random UUID v4 identifiers online for free. Create UUIDs instantly in your browser for development, testing and mock data.",

    category: "Utilities",

    icon: "fingerprint",

    route: "/tools/uuid-generator",

    keywords: [
      "uuid",
      "uuid generator",
      "uuid v4 generator",
      "generate uuid",
      "random uuid",
      "guid generator",
      "unique id generator",
      "uuid online",
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

    seoTitle:
      "Base64 Encoder & Decoder Online — Free | DevToolkit",

    seoDescription:
      "Encode and decode Base64 strings online for free. Convert text to Base64 or decode Base64 directly in your browser with Unicode and UTF-8 support.",

    category: "Encoding",

    icon: "binary",

    route: "/tools/base64",

    keywords: [
      "base64",
      "base64 encoder",
      "base64 decoder",
      "base64 encode",
      "base64 decode",
      "encode base64",
      "decode base64",
      "base64 online",
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

    seoTitle:
      "Regex Tester — Test Regular Expressions Online | DevToolkit",

    seoDescription:
      "Test and debug regular expressions online with instant match results, indexes, lengths and capture groups. Free browser-based regex tester.",

    category: "Regex",

    icon: "regex",

    route: "/tools/regex-tester",

    keywords: [
      "regex",
      "regex tester",
      "regular expression tester",
      "regex tester online",
      "regexp tester",
      "regular expression tester online",
      "javascript regex tester",
      "regex matcher",
      "regex debugger",
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

    seoTitle:
      "JWT Decoder — Decode JSON Web Tokens Online | DevToolkit",

    seoDescription:
      "Decode and inspect JWT headers and payloads online for free. View JWT claims and expiration information directly in your browser.",

    category: "Utilities",

    icon: "key-round",

    route: "/tools/jwt-decoder",

    keywords: [
      "jwt",
      "jwt decoder",
      "jwt decoder online",
      "decode jwt",
      "json web token decoder",
      "jwt token decoder",
      "jwt claims",
      "jwt payload",
      "jwt header",
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
