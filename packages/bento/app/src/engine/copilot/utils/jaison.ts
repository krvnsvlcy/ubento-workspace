/**
 * ROBUST AI JSON PARSER (TypeScript ESM)
 * --------------------------------------
 * A fault-tolerant parser designed to handle the messy, incomplete,
 * or "Pythonic" JSON often output by LLMs.
 */

// --- 1. Types & Constants ---

export const TOKEN_TYPES = {
  BRACKET: "BRACKET",
  PUNCTUATION: "PUNCTUATION",
  STRING: "STRING",
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER",
  COMMENT: "COMMENT",
} as const;

export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES];

export const CONTAINER_TYPES = {
  OBJECT: "OBJECT",
  ARRAY: "ARRAY",
} as const;

export type ContainerType =
  (typeof CONTAINER_TYPES)[keyof typeof CONTAINER_TYPES];

export const RADIX = {
  HEXADECIMAL: 16,
  OCTAL: 8,
  BINARY: 2,
  DECIMAL: 10,
} as const;

export interface Token {
  type: TokenType;
  value: string;
  radix?: number;
  isNegative?: boolean;
}

export interface Container {
  type: ContainerType;
  value: any; // Using any because we are building a dynamic object/array
  _key?: string; // Internal tracking for object keys
}

// Expanded aliases to handle Python/human-like outputs
const TRUE_ALIAS = new Set(["true", "True", "TRUE", "yes", "on"]);
const FALSE_ALIAS = new Set(["false", "False", "FALSE", "no", "off"]);
const NULL_ALIAS = new Set(["null", "None", "NONE", "nil", "undefined"]);
const UNDEFINED_ALIAS = new Set(["undefined", "missing"]);

// --- 2. The Tokenizer (Lexer) ---

export function tokenize(input: string): Token[] {
  // 1. Strip Markdown code blocks and preambles
  // We look for the first occurrence of '{' or '[' and start there.
  const jsonStartIndex = input.search(/(\{|\[)/);

  let processingInput = input;
  if (jsonStartIndex !== -1) {
    processingInput = input.substring(jsonStartIndex);
  }

  const tokens: Token[] = [];
  let i = 0;
  const length = processingInput.length;

  while (i < length) {
    const char = processingInput[i];

    // Whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Comments (C-style // and /* */)
    if (char === "/") {
      if (processingInput[i + 1] === "/") {
        i += 2;
        while (i < length && processingInput[i] !== "\n") i++;
        continue;
      } else if (processingInput[i + 1] === "*") {
        i += 2;
        while (
          i < length &&
          !(processingInput[i] === "*" && processingInput[i + 1] === "/")
        )
          i++;
        i += 2;
        continue;
      }
    }

    // Brackets
    if ("{}[]".includes(char)) {
      tokens.push({ type: TOKEN_TYPES.BRACKET, value: char });
      i++;
      continue;
    }

    // Punctuation
    if (":,".includes(char)) {
      tokens.push({ type: TOKEN_TYPES.PUNCTUATION, value: char });
      i++;
      continue;
    }

    // Strings (Double OR Single quotes)
    if (char === '"' || char === "'") {
      const quoteType = char;
      let value = "";
      i++; // Skip opening quote

      while (i < length) {
        if (processingInput[i] === "\\") {
          // Handle escapes
          i++;
          if (i >= length) break;
          const esc = processingInput[i];
          if (esc === "u") {
            // Unicode \uXXXX
            const hex = processingInput.substr(i + 1, 4);
            if (/^[0-9a-fA-F]{4}$/.test(hex)) {
              value += String.fromCharCode(parseInt(hex, 16));
              i += 4;
            } else {
              value += "u"; // Fail gracefully
            }
          } else {
            const escapes: Record<string, string> = {
              n: "\n",
              r: "\r",
              t: "\t",
              b: "\b",
              f: "\f",
              '"': '"',
              "'": "'",
              "\\": "\\",
            };
            value += escapes[esc] || esc;
          }
        } else if (processingInput[i] === quoteType) {
          i++; // Skip closing quote
          break;
        } else {
          value += processingInput[i];
        }
        i++;
      }
      tokens.push({ type: TOKEN_TYPES.STRING, value });
      continue;
    }

    // Numbers
    if (/[0-9+\-.]/.test(char)) {
      let start = i;
      let radix: number = RADIX.DECIMAL;

      // Check for Hex/Binary/Octal prefix
      if (char === "0" && i + 1 < length) {
        const next = processingInput[i + 1].toLowerCase();
        if (next === "x") {
          radix = RADIX.HEXADECIMAL;
          i += 2;
        } else if (next === "b") {
          radix = RADIX.BINARY;
          i += 2;
        } else if (next === "o") {
          radix = RADIX.OCTAL;
          i += 2;
        }
      }

      // Consume rest of number
      while (i < length && /[0-9a-fA-F._+\-eE]/.test(processingInput[i])) {
        i++;
      }

      const numStr = processingInput.slice(start, i);
      const isNegative = numStr.startsWith("-");
      tokens.push({
        type: TOKEN_TYPES.NUMBER,
        value: numStr,
        radix,
        isNegative,
      });
      continue;
    }

    // Identifiers (boolean, null, unquoted keys)
    if (/[a-zA-Z_$]/.test(char)) {
      let start = i;
      while (i < length && /[a-zA-Z0-9_$]/.test(processingInput[i])) {
        i++;
      }
      tokens.push({
        type: TOKEN_TYPES.IDENTIFIER,
        value: processingInput.slice(start, i),
      });
      continue;
    }

    // Unknown char (skip it)
    i++;
  }

  return tokens;
}

// --- 3. The Parser ---

export function parse(tokens: Token[]): any {
  const stacks: Container[] = [];
  let currentContainer: Container | null = null;
  const tokenLength = tokens.length;

  for (let i = 0; i < tokenLength; i++) {
    const token = tokens[i];

    // Handle bracket tokens
    if (token.type === TOKEN_TYPES.BRACKET) {
      const result = handleBracketToken(
        token,
        currentContainer,
        stacks,
        tokens,
        i,
        tokenLength,
      );

      if (result.shouldReturn) return result.value;
      if (result.newContainer !== undefined)
        currentContainer = result.newContainer;
      if (result.skipNext) i++;
      continue;
    }

    // Handle Object Keys
    if (
      currentContainer &&
      currentContainer.type === CONTAINER_TYPES.OBJECT &&
      currentContainer._key === undefined
    ) {
      // ROBUSTNESS: Skip misplaced commas
      if (token.type === TOKEN_TYPES.PUNCTUATION && token.value === ",")
        continue;

      const keyResult = handleObjectKey(token);
      if (keyResult.isKey && keyResult.key !== undefined) {
        currentContainer._key = keyResult.key;
        continue;
      } else if (keyResult.shouldContinue) {
        continue;
      }
    }

    // Handle Punctuation
    if (token.type === TOKEN_TYPES.PUNCTUATION) {
      const puncResult = handlePunctuationToken(token, tokens, i, tokenLength);
      if (puncResult.shouldContinue) continue;
    }

    // Parse Values
    const value = parseValueToken(token);

    // Fallback: If value is null but token is Identifier, treat as string (unquoted string value)
    const finalValue =
      value === null && token.type === TOKEN_TYPES.IDENTIFIER
        ? token.value
        : value;

    const assignResult = assignValue(
      finalValue,
      currentContainer,
      tokens,
      i,
      tokenLength,
    );
    if (assignResult.shouldReturn) return assignResult.value;
    if (assignResult.skipNext) i++;
  }

  return handleUnclosedContainers(stacks, currentContainer);
}

// --- Helper Functions ---

interface HandlerResult {
  shouldReturn?: boolean;
  shouldContinue?: boolean;
  shouldThrow?: boolean;
  value?: any;
  newContainer?: Container;
  skipNext?: boolean;
  isKey?: boolean;
  key?: string;
}

function handleBracketToken(
  token: Token,
  currentContainer: Container | null,
  stacks: Container[],
  tokens: Token[],
  index: number,
  tokenLength: number,
): HandlerResult {
  if (token.value === "{")
    return createContainer(CONTAINER_TYPES.OBJECT, currentContainer, stacks);
  if (token.value === "[")
    return createContainer(CONTAINER_TYPES.ARRAY, currentContainer, stacks);

  if (token.value === "}" || token.value === "]") {
    if (stacks.length === 0) return { shouldReturn: true, value: null };

    const completed = stacks.pop()!; // Non-null assertion safe due to length check

    if (stacks.length > 0) {
      const skipNext =
        index + 1 < tokenLength && tokens[index + 1].value === ",";
      return {
        shouldReturn: false,
        newContainer: stacks[stacks.length - 1],
        skipNext,
      };
    }

    return { shouldReturn: true, value: completed.value };
  }
  return { shouldReturn: false };
}

function createContainer(
  type: ContainerType,
  currentContainer: Container | null,
  stacks: Container[],
): HandlerResult {
  const newContainer: Container = {
    type,
    value: type === CONTAINER_TYPES.OBJECT ? {} : [],
  };

  if (currentContainer) {
    if (
      currentContainer.type === CONTAINER_TYPES.OBJECT &&
      currentContainer._key !== undefined
    ) {
      currentContainer.value[currentContainer._key] = newContainer.value;
      delete currentContainer._key;
    } else if (currentContainer.type === CONTAINER_TYPES.ARRAY) {
      currentContainer.value.push(newContainer.value);
    }
  }
  stacks.push(newContainer);
  return { shouldReturn: false, newContainer };
}

function handleObjectKey(token: Token): HandlerResult {
  if (
    token.type === TOKEN_TYPES.STRING ||
    token.type === TOKEN_TYPES.IDENTIFIER
  ) {
    return { isKey: true, key: token.value };
  }
  if (token.type === TOKEN_TYPES.NUMBER) {
    return { isKey: true, key: token.value.toString() };
  }
  return { shouldThrow: true };
}

function handlePunctuationToken(
  token: Token,
  tokens: Token[],
  index: number,
  tokenLength: number,
): HandlerResult {
  if (token.value === ",") {
    // Ignore trailing commas before closing brackets
    if (index + 1 < tokenLength) {
      const nextVal = tokens[index + 1].value;
      if (nextVal === "}" || nextVal === "]") return { shouldContinue: true };
    }
    return { shouldContinue: true };
  }

  if (token.value === ":") {
    return { shouldContinue: true };
  }
  return { shouldContinue: true };
}

function parseValueToken(token: Token): any {
  if (token.type === TOKEN_TYPES.STRING) return token.value;
  if (token.type === TOKEN_TYPES.NUMBER) return parseNumberValue(token);

  if (token.type === TOKEN_TYPES.IDENTIFIER) {
    const lower = token.value.toLowerCase();
    if (TRUE_ALIAS.has(lower)) return true;
    if (FALSE_ALIAS.has(lower)) return false;
    if (NULL_ALIAS.has(lower)) return null;
    if (UNDEFINED_ALIAS.has(lower)) return undefined;
    return null;
  }
  return null;
}

function parseNumberValue(token: Token): number {
  if (token.radix === RADIX.HEXADECIMAL) return parseInt(token.value, 16);
  if (token.radix === RADIX.OCTAL) return parseInt(token.value.slice(2), 8);
  if (token.radix === RADIX.BINARY) return parseInt(token.value.slice(2), 2);
  return parseFloat(token.value);
}

function assignValue(
  value: any,
  currentContainer: Container | null,
  tokens: Token[],
  index: number,
  tokenLength: number,
): HandlerResult {
  if (!currentContainer) return { shouldReturn: true, value };

  if (currentContainer.type === CONTAINER_TYPES.OBJECT) {
    if (currentContainer._key !== undefined) {
      currentContainer.value[currentContainer._key] = value;
      delete currentContainer._key;
    }
  } else {
    currentContainer.value.push(value);
  }

  const skipNext = index + 1 < tokenLength && tokens[index + 1].value === ",";
  return { shouldReturn: false, skipNext };
}

function handleUnclosedContainers(
  stacks: Container[],
  currentContainer: Container | null,
): any {
  if (stacks.length === 0) return undefined;

  // Auto-close any pending key with null
  if (
    currentContainer &&
    currentContainer.type === CONTAINER_TYPES.OBJECT &&
    currentContainer._key !== undefined
  ) {
    currentContainer.value[currentContainer._key] = null;
  }

  // Return the root container
  return stacks[0].value;
}

// --- 4. Main Export ---

export function safeJsonParse<T = any>(input: unknown): T | null {
  if (typeof input !== "string") return null;
  try {
    const tokens = tokenize(input);
    if (tokens.length === 0) return null;
    return parse(tokens) as T;
  } catch (e) {
    console.error("JSON Parse Failed completely:", e);
    return null;
  }
}
