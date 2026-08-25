# DevToolkit

DevToolkit is a browser-based collection of focused utilities for everyday software development. It provides quick tools for transforming data, checking syntax, generating identifiers, and testing patterns without requiring a separate command-line utility or sending input to a server.

The application is built with React, TypeScript, Vite, React Router, Tailwind CSS, and Lucide React icons.

## Features

### JSON Formatter

Format, validate, and minify JSON in a readable workspace.

- Pretty-print valid JSON with two-space indentation.
- Minify JSON into a compact single-line representation.
- Validate JSON without changing the input.
- Display parsing errors and the reported error position when available.
- Load JSON from a local file or drag and drop a file into the editor.
- Copy formatted output or download it as a text file.
- View input and output line and character counts.

### JSON to TypeScript

Generate TypeScript declarations from a JSON object.

- Choose the name of the root type.
- Generate either interfaces or type aliases.
- Mark generated properties as optional when needed.
- Handle nested objects and arrays through the conversion utility.
- Copy the generated declaration.
- Use `Ctrl+Enter` on Windows/Linux or `Command+Enter` on macOS to convert.

### UUID Generator

Generate UUIDs locally for development, testing, and fixture data.

- Generate 1, 5, 10, 25, or 50 UUIDs at a time.
- Copy an individual UUID or the complete generated list.
- Download the list as `uuids.txt`.
- Clear the current results and generate a fresh batch.

### Base64 Encoder / Decoder

Convert text to Base64 or decode a Base64 string back to text.

- Switch between encode and decode modes.
- Swap the current output into the input of the opposite mode.
- Load an example value for either mode.
- Copy or download the result.
- Show useful errors for empty or invalid input.

### Regex Tester

Build and inspect JavaScript regular expressions against sample text.

- Test a pattern as you type.
- Toggle Global, Ignore case, Multiline, DotAll, Unicode, and Sticky flags.
- Keep flags in normal JavaScript order.
- Show match counts and match details.
- Highlight matches in the sample text.
- Copy the complete expression, including its flags.
- Load an email-validation example or clear the workspace.

## Privacy

All transformations and tests run in the browser. DevToolkit does not upload JSON, text, regular expressions, or generated values to a backend. File loading is performed locally by the browser, and generated downloads are created in the browser as temporary text files.

Clipboard and download actions depend on the browser permissions and capabilities available to the current page.

## Getting Started

### Requirements

- Node.js 20 or newer is recommended.
- npm, included with Node.js.

### Install dependencies

From the application directory:

```bash
cd devtoolkit
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, normally `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

The compiled application is written to the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Routes

| Route | Tool |
| --- | --- |
| `/` | Tool directory and home page |
| `/tools/json-formatter` | JSON Formatter |
| `/tools/json-to-typescript` | JSON to TypeScript |
| `/tools/uuid-generator` | UUID Generator |
| `/tools/base64` | Base64 Encoder / Decoder |
| `/tools/regex-tester` | Regex Tester |

Unknown routes are rendered through the tool page and show a not-found state when no matching tool exists.

## Project Structure

```text
.
├── devtoolkit/
│   ├── public/                  Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          Navigation, logo, and theme controls
│   │   │   ├── tools/           Tool workspaces and shared tool UI
│   │   │   └── ui/              Reusable interface primitives
│   │   ├── data/                Tool metadata and relationships
│   │   ├── lib/                 Encoding, regex, UUID, and conversion logic
│   │   ├── pages/               Home and routed tool pages
│   │   └── types/               Shared TypeScript types
│   ├── index.html               Vite entry document
│   ├── package.json             Scripts and dependencies
│   ├── vite.config.ts           Vite configuration
│   └── tsconfig*.json           TypeScript configuration
└── README.md                    Repository-level documentation
```

## Development Notes

Tool metadata is centralized in `src/data/tools.ts`. Each tool has an identifier, category, route, description, keywords, and related tools. `ToolRenderer` maps the identifier to the corresponding workspace component, while `ToolPage` supplies the shared page layout and not-found behavior.

Domain-specific operations live in `src/lib/` so the UI components can focus on state, input, output, and interaction. Shared notices, errors, empty states, and action buttons live under `src/components/tools/shared/`.

The theme is controlled through the document's `html.light` class and CSS variables in `src/index.css`. The default theme is dark, with a light theme available through the navigation controls.

## Adding a Tool

1. Add the tool metadata and route information to `src/data/tools.ts`.
2. Implement the workspace component under `src/components/tools/`.
3. Add pure conversion or validation logic to `src/lib/` when appropriate.
4. Register the component in `src/components/tools/ToolRenderer.tsx`.
5. Add related tools and keywords to the metadata.
6. Run `npm run lint` and `npm run build` from `devtoolkit/`.

## License

No license has been specified for this project yet.
