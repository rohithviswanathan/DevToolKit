export interface RegexMatch {
  index: number;
  match: string;
  length: number;
  groups: string[];
}

export interface RegexResult {
  matches: RegexMatch[];
  error: string | null;
  valid: boolean;
}

export function testRegex(
  pattern: string,
  flags: string,
  text: string,
): RegexResult {
  let regex: RegExp;

  try {
    regex = new RegExp(pattern, flags);
  } catch (error) {
    return {
      matches: [],
      valid: false,
      error:
        error instanceof Error
          ? error.message
          : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];

  /*
   * Non-global regex:
   * JavaScript's RegExp.exec() returns only the
   * first match, which is the expected behavior.
   */
  if (!flags.includes("g")) {
    const result = regex.exec(text);

    if (!result) {
      return {
        matches: [],
        valid: true,
        error: null,
      };
    }

    matches.push({
      index: result.index,
      match: result[0],
      length: result[0].length,
      groups: result
        .slice(1)
        .map((group) => group ?? ""),
    });

    return {
      matches,
      valid: true,
      error: null,
    };
  }

  /*
   * Global regex.
   *
   * Use exec() repeatedly so that indexes and
   * capture groups are exactly the values returned
   * by JavaScript's RegExp engine.
   */
  while (true) {
    const result = regex.exec(text);

    if (!result) {
      break;
    }

    matches.push({
      index: result.index,
      match: result[0],
      length: result[0].length,
      groups: result
        .slice(1)
        .map((group) => group ?? ""),
    });

    /*
     * A regex such as /(?:)/g can produce an empty
     * match without advancing lastIndex.
     *
     * Advance it manually to avoid an infinite loop.
     */
    if (result[0].length === 0) {
      regex.lastIndex += 1;
    }
  }

  return {
    matches,
    valid: true,
    error: null,
  };
}