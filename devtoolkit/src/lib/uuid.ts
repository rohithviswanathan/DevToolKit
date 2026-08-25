export function generateUuid(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  /*
   * Fallback for older browsers.
   *
   * This still uses crypto.getRandomValues()
   * rather than Math.random().
   */
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    const bytes = new Uint8Array(16);

    crypto.getRandomValues(bytes);

    // UUID v4
    bytes[6] =
      (bytes[6] & 0x0f) | 0x40;

    bytes[8] =
      (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes).map(
      (byte) =>
        byte.toString(16).padStart(2, "0"),
    );

    return [
      hex.slice(0, 4).join(""),
      hex.slice(4, 6).join(""),
      hex.slice(6, 8).join(""),
      hex.slice(8, 10).join(""),
      hex.slice(10, 16).join(""),
    ].join("-");
  }

  throw new Error(
    "Secure UUID generation is not supported by this browser.",
  );
}

export function generateUuids(
  count: number,
): string[] {
  return Array.from(
    { length: count },
    () => generateUuid(),
  );
}