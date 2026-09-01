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
      "A JSON formatter helps you turn compact or poorly formatted JSON into clean, readable data. Use it to format, validate, beautify, or minify JSON while working with APIs, configuration files, and application data.",

    sections: [
      {
        title: "What is a JSON formatter?",
        paragraphs: [
          "JSON formatting adds consistent indentation and spacing to JSON data, making nested objects and arrays easier to read. Validation also helps identify syntax errors before you use the data in an application or API request.",
        ],
      },
      {
        title: "How to use the JSON formatter",
        steps: [
          "Paste or enter your JSON into the editor.",
          "Choose the formatting or validation action you need.",
          "Review the formatted or validated result.",
          "Copy the result for use in your project.",
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
      "Convert JSON objects into TypeScript interfaces or types directly in your browser. This is useful when working with API responses, mock data, configuration objects, and existing JSON structures.",

    sections: [
      {
        title: "What is JSON to TypeScript conversion?",
        paragraphs: [
          "JSON to TypeScript conversion generates TypeScript type definitions from the structure of a JSON object. Instead of manually describing every property, you can generate a starting point and adapt it to your application.",
        ],
      },
      {
        title: "How to convert JSON to TypeScript",
        steps: [
          "Paste a valid JSON object into the input editor.",
          "Choose the root type or interface name.",
          "Adjust optional-property settings if needed.",
          "Copy the generated TypeScript definitions.",
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
          "A UUID, or Universally Unique Identifier, is a standardized identifier designed to provide a very low probability of accidental duplication. UUIDs are commonly used for records, objects, requests, and test data.",
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
      "Encode text into Base64 or decode Base64 strings directly in your browser. Useful when working with APIs, encoded data, debugging, and development workflows that require Base64 conversion.",

    sections: [
      {
        title: "What is Base64?",
        paragraphs: [
          "Base64 is an encoding scheme that represents binary data using a limited set of text characters. It is commonly used to represent data in places where text is more convenient to transmit or store.",
        ],
      },
      {
        title: "How to use the Base64 encoder and decoder",
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
      "Test and debug regular expressions against sample text with instant feedback. Inspect matches, indexes, lengths, and capture groups while developing JavaScript-compatible patterns.",

    sections: [
      {
        title: "What is a regular expression?",
        paragraphs: [
          "A regular expression is a pattern used to search, match, validate, or extract text. Regular expressions are commonly used for tasks such as input validation, text processing, parsing, and search operations.",
        ],
      },
      {
        title: "How to test a regular expression",
        steps: [
          "Enter your regular expression.",
          "Add the sample text you want to test.",
          "Select the required regular expression flags.",
          "Review matches, indexes, lengths, and capture groups.",
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
      "Decode and inspect JSON Web Tokens directly in your browser. View JWT headers, payload data, and expiration information without sending the token to a DevToolkit server.",

    sections: [
      {
        title: "What is a JWT?",
        paragraphs: [
          "A JSON Web Token (JWT) is a compact format commonly used to transfer claims between systems. A JWT typically contains a header, payload, and signature, encoded into separate sections.",
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