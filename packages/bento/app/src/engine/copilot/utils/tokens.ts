/**
 * Extracts size-aware content parts from a file for inclusion in an LLM prompt.
 *
 * Design goals
 * - Minimize prompt budget impact (tokens ≈ chars/4), keep current user turn and instructions safe.
 * - Prefer the user's selection (expanded to sensible line boundaries) over the entire file.
 * - Fall back to deterministic, non-LLM trimming/summarization for large files.
 * - Support chunking with optional cache breakpoints between chunks to improve prompt caching.
 * - Provide notebook (.ipynb) projection that’s readable as text.
 *
 * Returned parts are generic and can be adapted to your chat SDK:
 * - { type: 'text', text } → a text content part
 * - { type: 'cache_breakpoint' } → a cache-breakpoint hint between large chunks
 *
 * NOTE: Token counts are approximated as chars/4. Adjust multipliers if your tokenizer differs.
 */

export type ContentPart =
  | { type: "text"; text: string }
  | { type: "cache_breakpoint" };

export interface ExtractContentOptions {
  filePath: string;
  /**
   * Full file contents as a UTF-8 string.
   * If you have a binary file, do not pass it here; instead convert to a textual description.
   */
  content: string;

  /**
   * Optional 1-indexed selection lines (inclusive).
   * If provided, selection is preferred over full file and expanded by contextLines.
   */
  selection?: { startLine: number; endLine: number };

  /**
   * Language identifier (e.g., 'typescript', 'python'). If omitted, inferred from file extension.
   * Used only for fences/formatting hints in the text.
   */
  languageId?: string;

  /**
   * Model's maximum prompt window in tokens (B).
   * Example: 32000 for 32k-context models, 128000 for 128k models.
   */
  modelMaxPromptTokens: number;

  /**
   * Target token budget reserved for this file’s content.
   * Default: min(0.15 * B, 8192) to avoid crowding the turn on smaller windows.
   */
  targetContentTokens?: number;

  /**
   * Whether to insert "cache breakpoints" between large chunks (if your backend supports it).
   * Default: true.
   */
  useCacheBreakpoints?: boolean;

  /**
   * Surround extracted content with a code fence for clarity.
   * Default: true for source-like languages; false for markdown (since it may already contain fences).
   */
  preferCodeFence?: boolean;

  /**
   * Extra lines around a selection to include as context.
   * Default: 3.
   */
  contextLines?: number;

  /**
   * If true, include a compact header with file path and line info.
   * Default: true.
   */
  includeHeader?: boolean;
}

export function extractContentParts(
  opts: ExtractContentOptions,
): ContentPart[] {
  const {
    filePath,
    languageId = "",
    modelMaxPromptTokens,
    useCacheBreakpoints = true,
    preferCodeFence = undefined,
    contextLines = 3,
    includeHeader = true,
  } = opts;

  const targetTokens =
    clamp(
      Math.floor(
        opts.targetContentTokens ?? Math.min(modelMaxPromptTokens * 0.15, 8192), // default reserve for file content
      ),
      256, // ensure a minimal, useful budget
      Math.max(256, Math.floor(modelMaxPromptTokens * 0.5)), // never exceed 50% of total window
    ) || 256;

  const charBudget = tokensToChars(targetTokens);
  const normalized = normalizeNewlines(opts.content);

  let projected = normalized;

  // Selection-aware extraction (for non-notebook text)
  if (opts.selection) {
    const { startLine, endLine } = sanitizeSelection(opts.selection, projected);
    const lines = splitLines(projected);
    const startIdx = Math.max(1, startLine);
    const endIdx = Math.min(lines.length, Math.max(startIdx, endLine));

    const expandedStart = Math.max(1, startIdx - contextLines);
    const expandedEnd = Math.min(lines.length, endIdx + contextLines);
    projected = lines.slice(expandedStart - 1, expandedEnd).join("\n");
  }

  // If still over budget, trim deterministically.
  if (projected.length > charBudget) {
    projected = smartTrim(projected, charBudget);
  }

  // Wrap in a helpful header and code fence where sensible.
  const header = includeHeader
    ? buildHeader(filePath, opts.selection, normalized)
    : "";
  const fence = shouldFence(preferCodeFence, languageId, filePath)
    ? wrapInFence(projected, languageId)
    : projected;

  const combined = header ? `${header}\n${fence}` : fence;

  // Chunk into parts with optional cache breakpoints for caching friendliness.
  const maxChunkChars = computeChunkSize(charBudget);
  return chunkWithBreakpoints(combined, maxChunkChars, useCacheBreakpoints);
}

/* ------------------------------ Helpers ------------------------------ */

export function tokensToChars(tokens: number): number {
  // Rough heuristic for code/English: 1 token ≈ 4 chars
  return Math.max(64, Math.floor(tokens * 4));
}
export function charsToTokens(chars: number): number {
  return Math.ceil(chars / 4);
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function normalizeNewlines(s: string): string {
  // Normalize CRLF → LF
  return s.replace(/\r\n/g, "\n");
}

function splitLines(s: string): string[] {
  // Preserve trailing empty line
  return s.split("\n");
}

function sanitizeSelection(
  sel: { startLine: number; endLine: number },
  content: string,
) {
  const total = splitLines(content).length;
  const startLine = clamp(Math.floor(sel.startLine || 1), 1, total);
  const endLine = clamp(Math.floor(sel.endLine || startLine), startLine, total);
  return { startLine, endLine };
}

function smartTrim(text: string, limit: number): string {
  if (text.length <= limit) return text;

  // Preserve head and tail; favor head for declarations/imports/context.
  const headPct = 0.7;
  const headLen = Math.max(1, Math.floor(limit * headPct));
  const tailLen = Math.max(0, limit - headLen - ELLIPSIS.length);

  const head = text.slice(0, headLen).replace(/\s+$/, "");
  const tail = tailLen > 0 ? text.slice(-tailLen).replace(/^\s+/, "") : "";

  // If any fence is open in the head and not closed, append closing fence to keep markdown well-formed
  const balancedTail = tail;
  return `${head}\n${ELLIPSIS}\n${balancedTail}`;
}

const ELLIPSIS = "... [snipped for brevity] ...";

function shouldFence(
  preferCodeFence: boolean | undefined,
  languageId: string,
  filePath: string,
): boolean {
  if (typeof preferCodeFence === "boolean") return preferCodeFence;
  // Default: fence source-like languages; avoid fencing markdown to prevent nested fences confusion.
  const isMarkdown =
    languageId === "markdown" || filePath.toLowerCase().endsWith(".md");
  return !isMarkdown && !!languageId;
}

function wrapInFence(text: string, languageId: string): string {
  return `\`\`\`${languageId}\n${text}\n\`\`\``;
}

function buildHeader(
  filePath: string,
  selection: ExtractContentOptions["selection"],
  fullText: string,
): string {
  const totalLines = splitLines(fullText).length;
  const where = selection
    ? `lines ${selection.startLine}-${selection.endLine} of ${totalLines}`
    : `entire file (${totalLines} lines)`;
  return `File: ${filePath} (${where})`;
}

function computeChunkSize(charBudget: number): number {
  // Aim for 2–4 chunks typically; limit chunk size to manageable pieces for caching.
  // Also keep individual chunks under ~0.5 × budget to avoid dominating one side of the prompt.
  const maxChunk = clamp(Math.floor(charBudget / 2), 2000, 16000);
  return maxChunk;
}

function chunkWithBreakpoints(
  text: string,
  maxChunkChars: number,
  useBreakpoints: boolean,
): ContentPart[] {
  if (text.length <= maxChunkChars) {
    return [{ type: "text", text }];
  }

  const parts: ContentPart[] = [];
  let i = 0;
  while (i < text.length) {
    const next = i + maxChunkChars;
    const slice = text.slice(i, next);
    parts.push({ type: "text", text: slice });

    i = next;
    if (useBreakpoints && i < text.length) {
      parts.push({ type: "cache_breakpoint" });
    }
  }
  return parts;
}

/* ----------------------------- Utilities ----------------------------- */

export function estimateTokensForParts(parts: ContentPart[]): number {
  const text = parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
  return charsToTokens(text.length);
}
