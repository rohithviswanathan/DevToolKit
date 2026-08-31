export interface ConversionOptions {
  rootName?: string;
  useInterfaces?: boolean;
  optionalProperties?: boolean;
}

interface GeneratedType {
  name: string;
  properties: string[];
}

type JsonObject = Record<string, unknown>;

function capitalize(value: string): string {
  if (!value) return "Root";

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function sanitizeTypeName(value: string): string {
  const cleaned = value
    .replace(/[^a-zA-Z0-9_$]/g, " ")
    .trim();

  if (!cleaned) {
    return "Root";
  }

  const words = cleaned.split(/\s+/);

  const result = words
    .map((word) => capitalize(word))
    .join("");

  if (!result) {
    return "Root";
  }

  if (/^\d/.test(result)) {
    return `Type${result}`;
  }

  return result;
}

function getUniqueTypeName(
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

function isObject(
  value: unknown,
): value is JsonObject {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

/*
 * ---------------------------------------------------------
 * Primitive type
 * ---------------------------------------------------------
 */

function getPrimitiveType(
  value: unknown,
): string {
  if (value === null) {
    return "null";
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

    case "symbol":
      return "symbol";

    case "function":
      return "Function";

    default:
      return "unknown";
  }
}

/*
 * ---------------------------------------------------------
 * Type merging
 * ---------------------------------------------------------
 *
 * Used mainly for arrays containing multiple objects.
 *
 * Example:
 *
 * [
 *   { id: 1, name: "John" },
 *   { id: 2, email: "john@example.com" }
 * ]
 *
 * becomes:
 *
 * {
 *   id: number;
 *   name?: string;
 *   email?: string;
 * }
 */

function mergeObjects(
  objects: JsonObject[],
): JsonObject {
  const merged: JsonObject = {};

  const allKeys = new Set<string>();

  for (const object of objects) {
    Object.keys(object).forEach((key) => {
      allKeys.add(key);
    });
  }

  for (const key of allKeys) {
    const values = objects
      .filter((object) =>
        Object.prototype.hasOwnProperty.call(
          object,
          key,
        ),
      )
      .map((object) => object[key]);

    merged[key] = mergeValues(values);
  }

  return merged;
}

function mergeValues(
  values: unknown[],
): unknown {
  if (values.length === 0) {
    return undefined;
  }

  /*
   * If all values are objects,
   * recursively merge their properties.
   */
  const objectValues = values.filter(isObject);

  if (
    objectValues.length > 0 &&
    objectValues.length === values.length
  ) {
    return mergeObjects(objectValues);
  }

  /*
   * If all values are arrays,
   * combine their contents.
   */
  const arrayValues = values.filter(
    Array.isArray,
  );

  if (
    arrayValues.length > 0 &&
    arrayValues.length === values.length
  ) {
    return arrayValues.flat();
  }

  /*
   * Keep the first value when we need
   * to represent the original structure.
   */
  return values[0];
}

/*
 * ---------------------------------------------------------
 * Collect union types
 * ---------------------------------------------------------
 */

function getUniqueTypeStrings(
  values: unknown[],
): string[] {
  const types = new Set<string>();

  for (const value of values) {
    types.add(getValueType(value));
  }

  return Array.from(types);
}

function getValueType(
  value: unknown,
): string {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  if (isObject(value)) {
    return "object";
  }

  return getPrimitiveType(value);
}

/*
 * ---------------------------------------------------------
 * Property name
 * ---------------------------------------------------------
 */

function formatPropertyName(
  key: string,
): string {
  if (
    /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(
      key,
    )
  ) {
    return key;
  }

  return JSON.stringify(key);
}

/*
 * ---------------------------------------------------------
 * Array type
 * ---------------------------------------------------------
 */

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

  /*
   * -------------------------------------------------------
   * Arrays containing objects
   * -------------------------------------------------------
   */

  const objectValues = value.filter(isObject);

  if (objectValues.length > 0) {
    const typeName = getUniqueTypeName(
      key,
      usedNames,
    );

    /*
     * Merge all objects in the array so
     * properties aren't lost.
     */
    const mergedObject =
      mergeObjects(objectValues);

    const allKeys = Object.keys(
      mergedObject,
    );

    processObject(
      mergedObject,
      typeName,
      types,
      usedNames,
      options,
      {
        optionalKeys:
          new Set(
            allKeys.filter(
              (property) =>
                !objectValues.every(
                  (object) =>
                    Object.prototype.hasOwnProperty.call(
                      object,
                      property,
                    ),
                ),
            ),
          ),
      },
    );

    /*
     * If some values in the array are not
     * objects, create a union.
     */
    const hasNonObjectValues =
      value.some(
        (item) => !isObject(item),
      );

    if (hasNonObjectValues) {
      const otherTypes = value
        .filter((item) => !isObject(item))
        .map((item) =>
          getValueType(item),
        );

      const uniqueOtherTypes =
        Array.from(
          new Set(otherTypes),
        );

      if (uniqueOtherTypes.length > 0) {
        return `(${[
          typeName,
          ...uniqueOtherTypes,
        ].join(" | ")})[]`;
      }
    }

    return `${typeName}[]`;
  }

  /*
   * -------------------------------------------------------
   * Arrays containing arrays
   * -------------------------------------------------------
   */

  if (
    value.every(
      (item) => Array.isArray(item),
    )
  ) {
    const flattened = value.flat();

    if (flattened.length === 0) {
      return "unknown[][]";
    }

    return `${getArrayElementType(
      flattened,
      key,
      types,
      usedNames,
      options,
    )}[]`;
  }

  /*
   * -------------------------------------------------------
   * Mixed arrays
   * -------------------------------------------------------
   */

  return getArrayElementType(
    value,
    key,
    types,
    usedNames,
    options,
  );
}

/*
 * ---------------------------------------------------------
 * Array element type
 * ---------------------------------------------------------
 */

function getArrayElementType(
  values: unknown[],
  key: string,
  types: GeneratedType[],
  usedNames: Set<string>,
  options: ConversionOptions,
): string {
  if (values.length === 0) {
    return "unknown";
  }

  const objectValues = values.filter(
    isObject,
  );

  /*
   * Object + primitive mixed array.
   */
  if (objectValues.length > 0) {
    const typeName = getUniqueTypeName(
      key,
      usedNames,
    );

    const mergedObject =
      mergeObjects(objectValues);

    processObject(
      mergedObject,
      typeName,
      types,
      usedNames,
      options,
    );

    const otherTypes = values
      .filter((value) => !isObject(value))
      .map((value) =>
        getValueType(value),
      );

    const uniqueTypes = Array.from(
      new Set([
        typeName,
        ...otherTypes,
      ]),
    );

    return uniqueTypes.length === 1
      ? uniqueTypes[0]
      : `(${uniqueTypes.join(" | ")})`;
  }

  /*
   * Nested arrays.
   */
  if (
    values.some(Array.isArray)
  ) {
    const nestedTypes = values
      .filter(Array.isArray)
      .map((array) =>
        getArrayType(
          array,
          key,
          types,
          usedNames,
          options,
        ),
      );

    const uniqueNestedTypes =
      Array.from(
        new Set(nestedTypes),
      );

    return uniqueNestedTypes.length === 1
      ? uniqueNestedTypes[0]
      : `(${uniqueNestedTypes.join(" | ")})`;
  }

  /*
   * Primitive / null union.
   */
  const primitiveTypes =
    getUniqueTypeStrings(values);

  if (primitiveTypes.length === 1) {
    return `${primitiveTypes[0]}[]`;
  }

  return `(${primitiveTypes.join(
    " | ",
  )})[]`;
}

/*
 * ---------------------------------------------------------
 * Object processing
 * ---------------------------------------------------------
 */

interface ProcessObjectOptions {
  optionalKeys?: Set<string>;
}

function processObject(
  object: JsonObject,
  typeName: string,
  types: GeneratedType[],
  usedNames: Set<string>,
  options: ConversionOptions,
  processOptions: ProcessObjectOptions = {},
): void {
  const properties: string[] = [];

  for (const [key, value] of Object.entries(
    object,
  )) {
    const safeKey =
      formatPropertyName(key);

    const optional =
      options.optionalProperties ||
      processOptions.optionalKeys?.has(
        key,
      )
        ? "?"
        : "";

    let propertyType: string;

    /*
     * -------------------------------------------------------
     * Nested object
     * -------------------------------------------------------
     */

    if (isObject(value)) {
      const nestedTypeName =
        getUniqueTypeName(
          key,
          usedNames,
        );

      processObject(
        value,
        nestedTypeName,
        types,
        usedNames,
        options,
      );

      propertyType =
        nestedTypeName;
    }

    /*
     * -------------------------------------------------------
     * Array
     * -------------------------------------------------------
     */

    else if (Array.isArray(value)) {
      propertyType =
        getArrayType(
          value,
          key,
          types,
          usedNames,
          options,
        );
    }

    /*
     * -------------------------------------------------------
     * Primitive / null
     * -------------------------------------------------------
     */

    else {
      propertyType =
        getPrimitiveType(value);
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

/*
 * ---------------------------------------------------------
 * Root array handling
 * ---------------------------------------------------------
 */

function processRootArray(
  array: unknown[],
  rootName: string,
  types: GeneratedType[],
  usedNames: Set<string>,
  options: ConversionOptions,
): string {
  if (array.length === 0) {
    return "unknown[]";
  }

  const objectValues =
    array.filter(isObject);

  /*
   * Root array of objects.
   */
  if (objectValues.length > 0) {
    const mergedObject =
      mergeObjects(objectValues);

    processObject(
      mergedObject,
      rootName,
      types,
      usedNames,
      options,
      {
        optionalKeys:
          new Set(
            Object.keys(mergedObject).filter(
              (key) =>
                !objectValues.every(
                  (object) =>
                    Object.prototype.hasOwnProperty.call(
                      object,
                      key,
                    ),
                ),
            ),
          ),
      },
    );

    return `${rootName}[]`;
  }

  /*
   * Root array of primitives.
   */
  const elementTypes =
    getUniqueTypeStrings(array);

  if (elementTypes.length === 1) {
    return `${elementTypes[0]}[]`;
  }

  return `(${elementTypes.join(
    " | ",
  )})[]`;
}

/*
 * ---------------------------------------------------------
 * Main converter
 * ---------------------------------------------------------
 */

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

  /*
   * Root must be an object or array.
   */
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

  let rootArrayType: string | null =
    null;

  /*
   * -------------------------------------------------------
   * Root object
   * -------------------------------------------------------
   */

  if (isObject(parsed)) {
    processObject(
      parsed,
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
   * -------------------------------------------------------
   * Root array
   * -------------------------------------------------------
   */

  else if (Array.isArray(parsed)) {
    rootArrayType =
      processRootArray(
        parsed,
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
   * -------------------------------------------------------
   * Remove duplicate generated types
   * -------------------------------------------------------
   */

  const uniqueTypes =
    types.filter(
      (type, index, array) =>
        array.findIndex(
          (item) =>
            item.name === type.name,
        ) === index,
    );

  /*
   * Nested types are discovered before
   * their parent, so reverse them.
   */
  const orderedTypes = [
    ...uniqueTypes,
  ].reverse();

  /*
   * -------------------------------------------------------
   * Root array
   * -------------------------------------------------------
   *
   * For:
   *
   * [
   *   { id: 1 }
   * ]
   *
   * we generate:
   *
   * interface Root {
   *   id: number;
   * }
   *
   * type RootArray = Root[];
   *
   * This preserves the fact that the JSON root
   * itself is an array.
   */

  if (rootArrayType) {
    const outputTypes =
      orderedTypes.map(
        (type) => {
          if (useInterfaces) {
            return `interface ${type.name} {\n${type.properties.join(
              "\n",
            )}\n}`;
          }

          return `type ${type.name} = {\n${type.properties.join(
            "\n",
          )}\n};`;
        },
      );

    const arrayAlias =
      `type ${safeRootName}Array = ${rootArrayType};`;

    return [
      ...outputTypes,
      arrayAlias,
    ].join("\n\n");
  }

  /*
   * -------------------------------------------------------
   * Interface output
   * -------------------------------------------------------
   */

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

  /*
   * -------------------------------------------------------
   * Type output
   * -------------------------------------------------------
   */

  return orderedTypes
    .map(
      (type) =>
        `type ${type.name} = {\n${type.properties.join(
          "\n",
        )}\n};`,
    )
    .join("\n\n");
}