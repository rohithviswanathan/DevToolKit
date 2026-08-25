export interface ConversionOptions {
  rootName?: string;
  useInterfaces?: boolean;
  optionalProperties?: boolean;
}

interface GeneratedType {
  name: string;
  properties: string[];
}

function capitalize(value: string): string {
  if (!value) return "Root";

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function sanitizeTypeName(value: string): string {
  const cleaned = value
    .replace(/[^a-zA-Z0-9_$]/g, " ")
    .trim();

  if (!cleaned) return "Root";

  const words = cleaned.split(/\s+/);

  const result = words
    .map((word) => capitalize(word))
    .join("");

  if (/^\d/.test(result)) {
    return `Type${result}`;
  }

  return result;
}

function getTypeName(
  key: string,
  usedNames: Set<string>,
): string {
  const baseName = sanitizeTypeName(key);

  let name = baseName;
  let counter = 2;

  while (usedNames.has(name)) {
    name = `${baseName}${counter}`;
    counter += 1;
  }

  usedNames.add(name);

  return name;
}

function getPrimitiveType(value: unknown): string {
  if (value === null) {
    return "unknown";
  }

  if (Array.isArray(value)) {
    return "unknown[]";
  }

  switch (typeof value) {
    case "string":
      return "string";

    case "number":
      return "number";

    case "boolean":
      return "boolean";

    case "bigint":
      return "bigint";

    case "undefined":
      return "undefined";

    default:
      return "unknown";
  }
}

function getArrayType(
  value: unknown[],
  key: string,
  types: GeneratedType[],
  usedNames: Set<string>,
  options: ConversionOptions,
): string {
  if (value.length === 0) {
    return "unknown[]";
  }

  const nonNullValues = value.filter(
    (item) => item !== null,
  );

  if (nonNullValues.length === 0) {
    return "unknown[]";
  }

  const firstValue = nonNullValues[0];

  /*
   * Array of objects
   */
  if (
    typeof firstValue === "object" &&
    !Array.isArray(firstValue)
  ) {
    const typeName = getTypeName(
      key,
      usedNames,
    );

    processObject(
      firstValue as Record<string, unknown>,
      typeName,
      types,
      usedNames,
      options,
    );

    return `${typeName}[]`;
  }

  /*
   * Array of arrays
   */
  if (Array.isArray(firstValue)) {
    return `${getArrayType(
      firstValue,
      key,
      types,
      usedNames,
      options,
    )}[]`;
  }

  /*
   * Array of primitives
   */
  const typesFound = new Set(
    nonNullValues.map((item) =>
      getPrimitiveType(item),
    ),
  );

  if (typesFound.size === 1) {
    return `${Array.from(typesFound)[0]}[]`;
  }

  return `(${Array.from(typesFound).join(" | ")})[]`;
}

function processObject(
  object: Record<string, unknown>,
  typeName: string,
  types: GeneratedType[],
  usedNames: Set<string>,
  options: ConversionOptions,
): void {
  const properties: string[] = [];

  for (const [key, value] of Object.entries(object)) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(
      key,
    )
      ? key
      : `"${key}"`;

    const optional = options.optionalProperties
      ? "?"
      : "";

    let propertyType: string;

    /*
     * Nested object
     */
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      const nestedTypeName = getTypeName(
        key,
        usedNames,
      );

      processObject(
        value as Record<string, unknown>,
        nestedTypeName,
        types,
        usedNames,
        options,
      );

      propertyType = nestedTypeName;
    }

    /*
     * Array
     */
    else if (Array.isArray(value)) {
      propertyType = getArrayType(
        value,
        key,
        types,
        usedNames,
        options,
      );
    }

    /*
     * Primitive
     */
    else {
      propertyType = getPrimitiveType(value);
    }

    properties.push(
      `  ${safeKey}${optional}: ${propertyType};`,
    );
  }

  types.push({
    name: typeName,
    properties,
  });
}

export function jsonToTypeScript(
  json: string,
  options: ConversionOptions = {},
): string {
  const {
    rootName = "Root",
    useInterfaces = true,
    optionalProperties = false,
  } = options;

  if (!json.trim()) {
    throw new Error(
      "Enter some JSON to convert.",
    );
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Invalid JSON.";

    throw new Error(message);
  }

  if (
    parsed === null ||
    typeof parsed !== "object"
  ) {
    throw new Error(
      "The root JSON value must be an object or array.",
    );
  }

  const types: GeneratedType[] = [];

  const usedNames = new Set<string>();

  const safeRootName =
    sanitizeTypeName(rootName);

  usedNames.add(safeRootName);

  /*
   * Root object
   */
  if (
    !Array.isArray(parsed)
  ) {
    processObject(
      parsed as Record<string, unknown>,
      safeRootName,
      types,
      usedNames,
      {
        rootName: safeRootName,
        useInterfaces,
        optionalProperties,
      },
    );
  }

  /*
   * Root array
   */
  else {
    const firstValue = parsed.find(
      (item) => item !== null,
    );

    if (
      firstValue &&
      typeof firstValue === "object" &&
      !Array.isArray(firstValue)
    ) {
      processObject(
        firstValue as Record<string, unknown>,
        safeRootName,
        types,
        usedNames,
        {
          rootName: safeRootName,
          useInterfaces,
          optionalProperties,
        },
      );
    } else {
      const primitiveType =
        getPrimitiveType(firstValue);

      types.push({
        name: safeRootName,
        properties: [
          `  value: ${primitiveType};`,
        ],
      });
    }
  }

  /*
   * Reverse because nested types are
   * discovered before their parent.
   */
  const orderedTypes = [...types].reverse();

  if (useInterfaces) {
    return orderedTypes
      .map(
        (type) =>
          `interface ${type.name} {\n${type.properties.join(
            "\n",
          )}\n}`,
      )
      .join("\n\n");
  }

  return orderedTypes
    .map(
      (type) =>
        `type ${type.name} = {\n${type.properties.join(
          "\n",
        )}\n};`,
    )
    .join("\n\n");
}