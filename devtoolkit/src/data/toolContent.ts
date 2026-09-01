export interface ToolContent {
  intro: string;
  sections: {
    title: string;
    paragraphs?: string[];
    steps?: string[];
  }[];
}

export const toolContent: Record<string, ToolContent> = {
  "json-formatter": {
    intro:
      "Format, validate, beautify, and minify JSON directly in your browser. DevToolkit's JSON Formatter helps developers clean up API responses, configuration files, request payloads, and other JSON data without unnecessary setup.",

    sections: [
      {
        title: "What is a JSON formatter?",
        paragraphs: [
          "A JSON formatter takes JSON data and applies consistent indentation and spacing so that objects, arrays, and nested values are easier to read. Formatting is especially useful when working with compact API responses or JSON that has been copied from another application.",
          "Validation checks whether the JSON follows the required syntax and helps identify malformed data before it is used in an application, configuration file, or API request.",
        ],
      },
      {
        title: "Format, beautify, and minify JSON",
        paragraphs: [
          "Beautifying JSON makes the structure easier to inspect by adding indentation and readable spacing. Minifying JSON does the opposite by removing unnecessary whitespace, which can be useful when a compact representation is required.",
        ],
      },
      {
        title: "How to use the JSON Formatter",
        steps: [
          "Paste or enter your JSON into the editor.",
          "Choose the formatting, validation, or minification action you need.",
          "Review the resulting JSON and check for any validation errors.",
          "Copy the result for use in your application, API request, or configuration.",
        ],
      },
      {
        title: "Is my JSON uploaded?",
        paragraphs: [
          "No. DevToolkit processes JSON directly in your browser. Your JSON input is not intentionally sent to a DevToolkit server.",
        ],
      },
    ],
  },

  "json-to-typescript": {
    intro:
      "Convert JSON objects into TypeScript interfaces or types directly in your browser. Generate a useful starting point for API responses, mock data, configuration objects, and other JSON structures without manually defining every property.",

    sections: [
      {
        title: "What is JSON to TypeScript conversion?",
        paragraphs: [
          "JSON to TypeScript conversion analyzes the structure of a JSON object and generates TypeScript type definitions that represent its properties and values.",
          "This can save time when working with unfamiliar API responses or existing JSON data. The generated definitions can then be reviewed and adapted to match the requirements of your application.",
        ],
      },
      {
        title: "Interfaces, types, and optional properties",
        paragraphs: [
          "TypeScript interfaces and type definitions provide compile-time information about the structure of your data. Depending on your use case, you can use the generated definitions as interfaces, types, or as a starting point for more detailed application models.",
          "Optional-property support can be useful when working with data where certain fields may not always be present.",
        ],
      },
      {
        title: "How to convert JSON to TypeScript",
        steps: [
          "Paste a valid JSON object into the input editor.",
          "Choose the root type or interface name.",
          "Adjust optional-property settings if required.",
          "Review the generated TypeScript definitions.",
          "Copy the result into your TypeScript project.",
        ],
      },
      {
        title: "Is my JSON uploaded?",
        paragraphs: [
          "No. The conversion runs directly in your browser. Your JSON input is not intentionally sent to a DevToolkit server.",
        ],
      },
    ],
  },

  "uuid-generator": {
    intro:
      "Generate UUIDs instantly in your browser for development, testing, mock data, database records, and other situations where unique identifiers are useful.",

    sections: [
      {
        title: "What is a UUID?",
        paragraphs: [
          "A UUID, or Universally Unique Identifier, is a standardized identifier represented as a 128-bit value. UUIDs are commonly used to identify records, objects, resources, requests, and other entities in software systems.",
          "UUIDs are designed to make accidental identifier collisions extremely unlikely when generated correctly, making them useful when a centralized ID-generation system is not required.",
        ],
      },
      {
        title: "What are UUIDs used for?",
        paragraphs: [
          "Developers commonly use UUIDs for database records, test fixtures, mock data, API resources, distributed systems, and application objects that need identifiers without relying on sequential numeric IDs.",
        ],
      },
      {
        title: "How to generate a UUID",
        steps: [
          "Open the UUID Generator.",
          "Generate a new UUID.",
          "Copy the generated identifier.",
          "Use it wherever a unique identifier is required.",
        ],
      },
      {
        title: "Where are generated UUIDs processed?",
        paragraphs: [
          "UUID generation happens directly in your browser. No account or server-side processing is required to generate an identifier.",
        ],
      },
    ],
  },

  base64: {
    intro:
      "Encode text into Base64 or decode Base64 strings directly in your browser. Use the tool when working with APIs, encoded data, debugging tasks, data representations, and development workflows that require Base64 conversion.",

    sections: [
      {
        title: "What is Base64?",
        paragraphs: [
          "Base64 is an encoding scheme that represents binary or text data using a defined set of ASCII characters. It is commonly used when data needs to be represented in a text-friendly format.",
          "Base64 is an encoding format, not encryption. Encoding data with Base64 does not provide confidentiality or security.",
        ],
      },
      {
        title: "When is Base64 used?",
        paragraphs: [
          "Base64 is frequently encountered when working with APIs, data URLs, embedded resources, authentication-related data, serialized content, and systems that require binary data to be represented as text.",
        ],
      },
      {
        title: "How to encode or decode Base64",
        steps: [
          "Enter the text or Base64 value you want to process.",
          "Choose whether to encode or decode the value.",
          "Review the resulting output.",
          "Copy the result when you are ready to use it.",
        ],
      },
      {
        title: "Is my Base64 data uploaded?",
        paragraphs: [
          "No. Encoding and decoding are performed directly in your browser. Your input is not intentionally sent to a DevToolkit server.",
        ],
      },
    ],
  },

  "regex-tester": {
    intro:
      "Test and debug regular expressions against sample text with instant feedback. Inspect matches, indexes, lengths, and capture groups while developing JavaScript-compatible regular expression patterns.",

    sections: [
      {
        title: "What is a regular expression?",
        paragraphs: [
          "A regular expression, commonly called a regex or regexp, is a pattern used to search, match, validate, or extract text. Regular expressions are commonly used for input validation, text processing, parsing, search operations, and data transformation.",
        ],
      },
      {
        title: "What can you test with a regex?",
        paragraphs: [
          "A regex tester can help you understand whether a pattern matches your sample text and inspect the exact portions of text that were matched.",
          "Capture groups can also help you examine portions of a match separately, which is useful when building patterns for parsing or extracting structured information.",
        ],
      },
      {
        title: "How to test a regular expression",
        steps: [
          "Enter your regular expression pattern.",
          "Add the sample text you want to test.",
          "Select the regular expression flags required by your pattern.",
          "Review matches, indexes, lengths, and capture groups.",
          "Adjust the pattern and test again as needed.",
        ],
      },
      {
        title: "Is my test data uploaded?",
        paragraphs: [
          "No. Regular expression testing happens directly in your browser. Your pattern and sample text are not intentionally sent to a DevToolkit server.",
        ],
      },
    ],
  },

  "jwt-decoder": {
    intro:
      "Decode and inspect JSON Web Tokens directly in your browser. View JWT headers, payload data, claims, and expiration information without intentionally sending the token to a DevToolkit server.",

    sections: [
      {
        title: "What is a JWT?",
        paragraphs: [
          "A JSON Web Token (JWT) is a compact token format commonly used to transfer claims between systems. A JWT commonly contains a header, payload, and signature, with the sections represented using Base64URL encoding.",
        ],
      },
      {
        title: "What can you inspect in a JWT?",
        paragraphs: [
          "The header can contain information about the token type and signing algorithm, while the payload can contain claims such as an issuer, subject, audience, issued-at time, or expiration time.",
          "Decoding a JWT only reveals its encoded contents. It does not verify the token's signature or prove that the token is authentic.",
        ],
      },
      {
        title: "How to decode a JWT",
        steps: [
          "Paste the JWT into the decoder.",
          "Review the decoded header and payload.",
          "Inspect available claims and expiration information.",
          "Use the decoded information for debugging or development.",
        ],
      },
      {
        title: "Is my JWT uploaded?",
        paragraphs: [
          "No. JWT decoding is performed directly in your browser. The token is not intentionally sent to a DevToolkit server.",
        ],
      },
    ],
  },
};
