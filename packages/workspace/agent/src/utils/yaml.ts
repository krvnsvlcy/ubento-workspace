/**
 * ROBUST AI YAML PARSER (TypeScript ESM)
 * --------------------------------------
 * A fault-tolerant parser designed to handle the messy, incomplete,
 * or "Pythonic" YAML often output by LLMs.
 */

// --- 1. Types & Constants ---

export const TOKEN_TYPES = {
  KEY: "KEY",
  VALUE: "VALUE",
  ARRAY_DASH: "ARRAY_DASH",
} as const;

export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES];

export interface Token {
  type: TokenType;
  value: string;
  indent: number;
}

export const CONTAINER_TYPES = {
  OBJECT: "OBJECT",
  ARRAY: "ARRAY",
} as const;

export type ContainerType =
  (typeof CONTAINER_TYPES)[keyof typeof CONTAINER_TYPES];

export interface ContainerContext {
  ref: any;
  indent: number;
  type: ContainerType;
}

// Expanded aliases to handle Python/human-like outputs and YAML spec
const TRUE_ALIAS = new Set(["true", "True", "TRUE", "yes", "on", "y", "Y"]);
const FALSE_ALIAS = new Set(["false", "False", "FALSE", "no", "off", "n", "N"]);
const NULL_ALIAS = new Set(["null", "None", "NONE", "nil", "undefined", "~"]);

// --- Helper Functions for Lexer ---

// Safely find a colon that acts as a key separator (ignores colons inside quotes)
function findKeyColon(line: string): number {
  let inDoubleQuote = false;
  let inSingleQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && !inSingleQuote && (i === 0 || line[i - 1] !== "\\")) {
      inDoubleQuote = !inDoubleQuote;
    } else if (
      c === "'" &&
      !inDoubleQuote &&
      (i === 0 || line[i - 1] !== "\\")
    ) {
      inSingleQuote = !inSingleQuote;
    } else if (c === ":" && !inDoubleQuote && !inSingleQuote) {
      if (i === line.length - 1 || line[i + 1] === " ") {
        return i;
      }
    }
  }
  return -1;
}

function stripInlineComment(value: string): string {
  // Use [\s\S] to support multiline matching just in case
  if (/^["'][\s\S]*["']$/.test(value)) return value;

  const commentIdx = value.indexOf(" #");
  if (commentIdx > -1) return value.substring(0, commentIdx).trim();
  return value;
}

// --- 2. The Tokenizer (Lexer) ---

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const lines = input.split(/\r?\n/);
  let inMarkdownBlock = false;

  for (let i = 0; i < lines.length; i++) {
    let rawLine = lines[i];

    // 1. Strip Markdown code blocks
    if (rawLine.trim().startsWith("```")) {
      inMarkdownBlock = !inMarkdownBlock;
      continue;
    }

    // 2. Skip full-line comments and empty lines
    if (/^\s*(#.*)?$/.test(rawLine) || rawLine.trim() === "") {
      continue;
    }

    let indent = rawLine.match(/^\s*/)?.[0].replace(/\t/g, "  ").length || 0;
    let line = rawLine.trim();

    // 3. Handle array dash
    if (line.startsWith("- ") || line === "-") {
      tokens.push({ type: TOKEN_TYPES.ARRAY_DASH, value: "-", indent });
      line = line.substring(1).trim();

      indent += 2;
      if (line === "") continue;
    }

    // 4. Handle key: value pairs safely
    const colonIdx = findKeyColon(line);

    if (colonIdx >= 0) {
      const key = line.substring(0, colonIdx).trim();
      const value = line.substring(colonIdx + 1).trim();

      const cleanKey = key.replace(/^["'](.*)["']$/, "$1");
      tokens.push({ type: TOKEN_TYPES.KEY, value: cleanKey, indent });

      if (value) {
        const q = value[0];
        // Check for explicitly quoted multiline strings
        if (
          (q === '"' || q === "'") &&
          !(
            value.length > 1 &&
            value.endsWith(q) &&
            value[value.length - 2] !== "\\"
          )
        ) {
          let blockLines: string[] = [value];
          let j = i + 1;
          let closed = false;

          while (j < lines.length) {
            const nextRawLine = lines[j];
            if (nextRawLine.trim().startsWith("```")) break;
            blockLines.push(nextRawLine);
            const trimmedNext = nextRawLine.trim();

            if (
              trimmedNext.endsWith(q) &&
              trimmedNext[trimmedNext.length - 2] !== "\\"
            ) {
              closed = true;
              break;
            }
            j++;
          }

          if (closed) {
            i = j; // Advance outer loop
            tokens.push({
              type: TOKEN_TYPES.VALUE,
              value: blockLines.join("\n"),
              indent,
            });
            continue;
          }
        }

        const cleanValue = stripInlineComment(value);
        const blockMatch = cleanValue.match(/^([>|])([+-]?)$/);

        if (blockMatch) {
          const type = blockMatch[1];
          let blockLines: string[] = [];
          let blockIndent = -1;

          let j = i + 1;
          while (j < lines.length) {
            const nextRawLine = lines[j];
            if (nextRawLine.trim().startsWith("```")) break;
            const nextIndent =
              nextRawLine.match(/^\s*/)?.[0].replace(/\t/g, "  ").length || 0;

            if (nextRawLine.trim() !== "") {
              if (nextIndent <= indent) break;
              if (blockIndent === -1) blockIndent = nextIndent;
              blockLines.push(nextRawLine.substring(blockIndent));
            } else {
              blockLines.push("");
            }
            j++;
          }

          i = j - 1;

          let parsedString = "";
          if (type === ">") {
            let foldedLines: string[] = [];
            let currentParagraph: string[] = [];

            for (const bl of blockLines) {
              if (bl.trim() === "") {
                if (currentParagraph.length > 0) {
                  foldedLines.push(currentParagraph.join(" "));
                  currentParagraph = [];
                }
                foldedLines.push("");
              } else {
                currentParagraph.push(bl);
              }
            }

            if (currentParagraph.length > 0) {
              foldedLines.push(currentParagraph.join(" "));
            }
            parsedString = foldedLines
              .join("\n")
              .replace(/\n{3,}/g, "\n\n")
              .trim();
          } else {
            parsedString = blockLines.join("\n").trim();
          }

          tokens.push({
            type: TOKEN_TYPES.VALUE,
            value: parsedString,
            indent: blockIndent > -1 ? blockIndent : indent + 2,
          });
        } else {
          tokens.push({
            type: TOKEN_TYPES.VALUE,
            value: cleanValue,
            indent,
          });
        }
      }
    } else {
      // 5. Just a value (scalar or array item)
      const q = line[0];
      if (
        (q === '"' || q === "'") &&
        !(line.length > 1 && line.endsWith(q) && line[line.length - 2] !== "\\")
      ) {
        let blockLines: string[] = [line];
        let j = i + 1;
        let closed = false;

        while (j < lines.length) {
          const nextRawLine = lines[j];
          if (nextRawLine.trim().startsWith("```")) break;
          blockLines.push(nextRawLine);
          const trimmedNext = nextRawLine.trim();

          if (
            trimmedNext.endsWith(q) &&
            trimmedNext[trimmedNext.length - 2] !== "\\"
          ) {
            closed = true;
            break;
          }
          j++;
        }

        if (closed) {
          i = j;
          tokens.push({
            type: TOKEN_TYPES.VALUE,
            value: blockLines.join("\n"),
            indent,
          });
          continue;
        }
      }

      tokens.push({
        type: TOKEN_TYPES.VALUE,
        value: stripInlineComment(line),
        indent,
      });
    }
  }

  return tokens;
}

// --- 3. The Parser ---

export function parse(tokens: Token[]): any {
  const root: any = {};
  const stack: ContainerContext[] = [
    { ref: root, indent: -1, type: CONTAINER_TYPES.OBJECT },
  ];

  let pendingKey: { name: string; indent: number } | null = null;
  let pendingDashIndent: number | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    while (stack.length > 1) {
      const top = stack[stack.length - 1];
      if (token.indent < top.indent) {
        stack.pop();
      } else if (token.indent === top.indent) {
        if (
          token.type === TOKEN_TYPES.ARRAY_DASH &&
          top.type === CONTAINER_TYPES.OBJECT
        ) {
          stack.pop();
        } else {
          break;
        }
      } else {
        break;
      }
    }

    let top = stack[stack.length - 1];

    if (
      pendingKey &&
      token.indent <= pendingKey.indent &&
      token.type !== TOKEN_TYPES.VALUE
    ) {
      top.ref[pendingKey.name] = null;
      pendingKey = null;
    }

    if (token.type === TOKEN_TYPES.ARRAY_DASH) {
      if (pendingKey && top.type === CONTAINER_TYPES.OBJECT) {
        const newArr: any[] = [];
        top.ref[pendingKey.name] = newArr;
        stack.push({
          ref: newArr,
          indent: token.indent,
          type: CONTAINER_TYPES.ARRAY,
        });
        top = stack[stack.length - 1];
        pendingKey = null;
      }
      pendingDashIndent = token.indent;
    } else if (token.type === TOKEN_TYPES.KEY) {
      if (pendingDashIndent !== null || top.type === CONTAINER_TYPES.ARRAY) {
        const newObj = {};
        if (top.type === CONTAINER_TYPES.ARRAY) {
          top.ref.push(newObj);
          stack.push({
            ref: newObj,
            indent: token.indent,
            type: CONTAINER_TYPES.OBJECT,
          });
          top = stack[stack.length - 1];
        }
        pendingDashIndent = null;
      } else if (pendingKey && top.type === CONTAINER_TYPES.OBJECT) {
        const newObj = {};
        top.ref[pendingKey.name] = newObj;
        stack.push({
          ref: newObj,
          indent: token.indent,
          type: CONTAINER_TYPES.OBJECT,
        });
        top = stack[stack.length - 1];
      }

      pendingKey = { name: token.value, indent: token.indent };
    } else if (token.type === TOKEN_TYPES.VALUE) {
      const val = parseScalarValue(token.value);

      if (pendingKey && top.type === CONTAINER_TYPES.OBJECT) {
        top.ref[pendingKey.name] = val;
        pendingKey = null;
      } else if (
        pendingDashIndent !== null ||
        top.type === CONTAINER_TYPES.ARRAY
      ) {
        if (top.type === CONTAINER_TYPES.ARRAY) {
          top.ref.push(val);
        }
        pendingDashIndent = null;
      }
    }
  }

  if (pendingKey && stack.length > 0) {
    const top = stack[stack.length - 1];
    if (top.type === CONTAINER_TYPES.OBJECT) {
      top.ref[pendingKey.name] = null;
    }
  }

  if (Object.keys(root).length === 1 && root[""] !== undefined) {
    return root[""];
  }

  return root;
}

// --- 4. Scalar Parser ---

function parseScalarValue(value: string): any {
  if (!value) return null;

  const lower = value.toLowerCase();
  if (TRUE_ALIAS.has(lower)) return true;
  if (FALSE_ALIAS.has(lower)) return false;
  if (NULL_ALIAS.has(lower)) return null;

  if (
    (value.startsWith("[") && value.endsWith("]")) ||
    (value.startsWith("{") && value.endsWith("}"))
  ) {
    try {
      return JSON.parse(value);
    } catch {
      // Fallback
    }
  }

  if (/^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(value)) {
    return parseFloat(value);
  }
  if (/^0x[0-9a-fA-F]+$/.test(value)) {
    return parseInt(value, 16);
  }

  // FIXED: [\s\S]* properly matches across newlines where .* fails.
  if (/^["'][\s\S]*["']$/.test(value)) {
    return value
      .substring(1, value.length - 1)
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t");
  }

  return value;
}

// --- 5. Main Export ---

export function safeYamlParse<T = any>(input: unknown): T | null {
  if (typeof input !== "string" || !input.trim()) return null;

  try {
    const tokens = tokenize(input);
    if (tokens.length === 0) return null;

    const result = parse(tokens);
    return Object.keys(result).length === 0 ? null : (result as T);
  } catch (e) {
    console.error("YAML Parse Failed completely:", e);
    return null;
  }
}
