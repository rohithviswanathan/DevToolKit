export function encodeBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

export function decodeBase64(value: string): string {
  const normalized = value.replace(/\s/g, "");

  if (!normalized) {
    return "";
  }

  try {
    const binary = atob(normalized);

    const bytes = Uint8Array.from(
      binary,
      (character) => character.charCodeAt(0),
    );

    return new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);
  } catch {
    throw new Error(
      "Invalid Base64 input. Make sure the string contains valid Base64 data.",
    );
  }
}