export interface JwtHeader {
  [key: string]: unknown;
}

export interface JwtPayload {
  [key: string]: unknown;
}

export interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  rawHeader: string;
  rawPayload: string;
}

function decodeBase64Url(value: string): string {
  try {
    const normalized = value
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padding =
      normalized.length % 4;

    const padded =
      padding === 0
        ? normalized
        : normalized +
          "=".repeat(4 - padding);

    const binary = atob(padded);

    const bytes = Uint8Array.from(
      binary,
      (character) =>
        character.charCodeAt(0),
    );

    return new TextDecoder("utf-8", {
      fatal: true,
    }).decode(bytes);
  } catch {
    throw new Error(
      "Invalid Base64URL data in JWT.",
    );
  }
}

function decodeJson<T>(
  value: string,
  label: string,
): T {
  const decoded =
    decodeBase64Url(value);

  try {
    return JSON.parse(decoded) as T;
  } catch {
    throw new Error(
      `Invalid JSON in JWT ${label}.`,
    );
  }
}

export function decodeJwt(
  token: string,
): DecodedJwt {
  const normalized = token.trim();

  if (!normalized) {
    throw new Error(
      "Enter a JWT to decode.",
    );
  }

  const parts =
    normalized.split(".");

  if (parts.length !== 3) {
    throw new Error(
      "Invalid JWT format. A JWT must contain three parts separated by dots: header.payload.signature.",
    );
  }

  const [
    encodedHeader,
    encodedPayload,
    signature,
  ] = parts;

  if (
    !encodedHeader ||
    !encodedPayload ||
    !signature
  ) {
    throw new Error(
      "Invalid JWT format. The header, payload, and signature must all be present.",
    );
  }

  const header =
    decodeJson<JwtHeader>(
      encodedHeader,
      "header",
    );

  const payload =
    decodeJson<JwtPayload>(
      encodedPayload,
      "payload",
    );

  if (
    typeof header !== "object" ||
    header === null ||
    Array.isArray(header)
  ) {
    throw new Error(
      "Invalid JWT header. The header must be a JSON object.",
    );
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error(
      "Invalid JWT payload. The payload must be a JSON object.",
    );
  }

  return {
    header,
    payload,
    signature,
    rawHeader: decodeBase64Url(
      encodedHeader,
    ),
    rawPayload: decodeBase64Url(
      encodedPayload,
    ),
  };
}

export function formatJwtJson(
  value: unknown,
): string {
  return JSON.stringify(
    value,
    null,
    2,
  );
}

export function getJwtExpiration(
  payload: JwtPayload,
): Date | null {
  if (
    typeof payload.exp !== "number"
  ) {
    return null;
  }

  return new Date(
    payload.exp * 1000,
  );
}

export function getJwtIssuedAt(
  payload: JwtPayload,
): Date | null {
  if (
    typeof payload.iat !== "number"
  ) {
    return null;
  }

  return new Date(
    payload.iat * 1000,
  );
}

export function isJwtExpired(
  payload: JwtPayload,
): boolean | null {
  const expiration =
    getJwtExpiration(payload);

  if (!expiration) {
    return null;
  }

  return expiration.getTime() <
    Date.now();
}