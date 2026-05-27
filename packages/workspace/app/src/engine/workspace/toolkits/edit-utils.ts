import { LanguageModel } from "@ubento/workspace.agent";

export interface EditParams {
  old_string: string;
  new_string: string;
  allow_multiple?: boolean;
  instruction?: string;
}

export interface ReplacementResult {
  newContent: string;
  occurrences: number;
  finalOldString: string;
  finalNewString: string;
  strategy?: "exact" | "flexible" | "regex" | "fuzzy";
  matchRanges?: Array<{ start: number; end: number }>;
}

export interface SearchReplaceEdit {
  search: string;
  replace: string;
  noChangesRequired: boolean;
  explanation: string;
}

export function levenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

export function stripWhitespace(str: string): string {
  return str.replace(/\s/g, "");
}

export function safeLiteralReplace(
  str: string,
  oldString: string,
  newString: string,
): string {
  if (oldString === "" || !str.includes(oldString)) {
    return str;
  }

  if (!newString.includes("$")) {
    return str.split(oldString).join(newString);
  }

  const escapedNewString = newString.split("$").join("$$$$");
  return str.split(oldString).join(escapedNewString);
}

function restoreTrailingNewline(
  originalContent: string,
  modifiedContent: string,
): string {
  const hadTrailingNewline = originalContent.endsWith("\n");
  if (hadTrailingNewline && !modifiedContent.endsWith("\n")) {
    return modifiedContent + "\n";
  } else if (!hadTrailingNewline && modifiedContent.endsWith("\n")) {
    return modifiedContent.replace(/\n$/, "");
  }
  return modifiedContent;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyIndentation(
  lines: string[],
  targetIndentation: string,
): string[] {
  if (lines.length === 0) return [];

  const referenceLine = lines[0];
  const refIndentMatch = referenceLine.match(/^([ \t]*)/);
  const refIndent = refIndentMatch ? refIndentMatch[1] : "";

  return lines.map((line) => {
    if (line.trim() === "") {
      return "";
    }
    if (line.startsWith(refIndent)) {
      return targetIndentation + line.slice(refIndent.length);
    }
    return targetIndentation + line.trimStart();
  });
}

function calculateExactReplacement(
  currentContent: string,
  params: EditParams,
): ReplacementResult | null {
  const { old_string, new_string } = params;

  const normalizedCode = currentContent;
  const normalizedSearch = old_string.replace(/\r\n/g, "\n");
  const normalizedReplace = new_string.replace(/\r\n/g, "\n");

  const exactOccurrences = normalizedCode.split(normalizedSearch).length - 1;

  if (!params.allow_multiple && exactOccurrences > 1) {
    return {
      newContent: currentContent,
      occurrences: exactOccurrences,
      finalOldString: normalizedSearch,
      finalNewString: normalizedReplace,
    };
  }

  if (exactOccurrences > 0) {
    let modifiedCode = safeLiteralReplace(
      normalizedCode,
      normalizedSearch,
      normalizedReplace,
    );
    modifiedCode = restoreTrailingNewline(currentContent, modifiedCode);
    return {
      newContent: modifiedCode,
      occurrences: exactOccurrences,
      finalOldString: normalizedSearch,
      finalNewString: normalizedReplace,
      strategy: "exact",
    };
  }

  return null;
}

function calculateFlexibleReplacement(
  currentContent: string,
  params: EditParams,
): ReplacementResult | null {
  const { old_string, new_string } = params;

  const normalizedCode = currentContent;
  const normalizedSearch = old_string.replace(/\r\n/g, "\n");
  const normalizedReplace = new_string.replace(/\r\n/g, "\n");

  const sourceLines = normalizedCode.match(/.*(?:\n|$)/g)?.slice(0, -1) ?? [];
  const searchLinesStripped = normalizedSearch
    .split("\n")
    .map((line: string) => line.trim());
  const replaceLines = normalizedReplace.split("\n");

  let flexibleOccurrences = 0;
  let i = 0;
  while (i <= sourceLines.length - searchLinesStripped.length) {
    const window = sourceLines.slice(i, i + searchLinesStripped.length);
    const windowStripped = window.map((line: string) => line.trim());
    const isMatch = windowStripped.every(
      (line: string, index: number) => line === searchLinesStripped[index],
    );

    if (isMatch) {
      flexibleOccurrences++;
      const firstLineInMatch = window[0];
      const indentationMatch = firstLineInMatch.match(/^([ \t]*)/);
      const indentation = indentationMatch ? indentationMatch[1] : "";
      const newBlockWithIndent = applyIndentation(replaceLines, indentation);

      let replacementText = newBlockWithIndent.join("\n");
      if (
        new_string !== "" &&
        window[window.length - 1].endsWith("\n") &&
        !replacementText.endsWith("\n")
      ) {
        replacementText += "\n";
      }

      sourceLines.splice(i, searchLinesStripped.length, replacementText);
    }
    i++;
  }

  if (flexibleOccurrences > 0) {
    let modifiedCode = sourceLines.join("");
    modifiedCode = restoreTrailingNewline(currentContent, modifiedCode);
    return {
      newContent: modifiedCode,
      occurrences: flexibleOccurrences,
      finalOldString: normalizedSearch,
      finalNewString: normalizedReplace,
      strategy: "flexible",
    };
  }

  return null;
}

function calculateRegexReplacement(
  currentContent: string,
  params: EditParams,
): ReplacementResult | null {
  const { old_string, new_string } = params;

  const normalizedSearch = old_string.replace(/\r\n/g, "\n");
  const normalizedReplace = new_string.replace(/\r\n/g, "\n");

  const delimiters = ["(", ")", ":", "[", "]", "{", "}", ">", "<", "="];

  let processedString = normalizedSearch;
  for (const delim of delimiters) {
    processedString = processedString.split(delim).join(` ${delim} `);
  }

  const tokens = processedString.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return null;
  }

  const escapedTokens = tokens.map(escapeRegex);
  const pattern = escapedTokens.join("\\s*");
  const finalPattern = `^([ \\t]*)${pattern}`;

  const globalRegex = new RegExp(finalPattern, "gm");
  const matches = currentContent.match(globalRegex);

  if (!matches) {
    return null;
  }

  const occurrences = matches.length;
  const newLines = normalizedReplace.split("\n");

  const replaceRegex = new RegExp(
    finalPattern,
    params.allow_multiple ? "gm" : "m",
  );

  const modifiedCode = currentContent.replace(
    replaceRegex,
    (_match, indentation) =>
      applyIndentation(newLines, indentation || "").join("\n"),
  );

  return {
    newContent: restoreTrailingNewline(currentContent, modifiedCode),
    occurrences,
    finalOldString: normalizedSearch,
    finalNewString: normalizedReplace,
    strategy: "regex",
  };
}

function calculateFuzzyReplacement(
  currentContent: string,
  params: EditParams,
): ReplacementResult | null {
  const { old_string, new_string } = params;

  if (old_string.length < 10) {
    return null;
  }

  const FUZZY_MATCH_THRESHOLD = 0.1;
  const WHITESPACE_PENALTY_FACTOR = 0.1;

  const normalizedCode = currentContent.replace(/\r\n/g, "\n");
  const normalizedSearch = old_string.replace(/\r\n/g, "\n");
  const normalizedReplace = new_string.replace(/\r\n/g, "\n");

  const sourceLines = normalizedCode.match(/.*(?:\n|$)/g)?.slice(0, -1) ?? [];
  const searchLines = normalizedSearch
    .match(/.*(?:\n|$)/g)
    ?.slice(0, -1)
    .map((l) => l.trimEnd());

  if (sourceLines.length * Math.pow(old_string.length, 2) > 400_000_000) {
    return null;
  }

  if (!searchLines || searchLines.length === 0) {
    return null;
  }

  const N = searchLines.length;
  const candidates: Array<{ index: number; score: number }> = [];
  const searchBlock = searchLines.join("\n");

  for (let i = 0; i <= sourceLines.length - N; i++) {
    const windowLines = sourceLines.slice(i, i + N);
    const windowText = windowLines.map((l) => l.trimEnd()).join("\n");

    const lengthDiff = Math.abs(windowText.length - searchBlock.length);
    if (
      lengthDiff / searchBlock.length >
      FUZZY_MATCH_THRESHOLD / WHITESPACE_PENALTY_FACTOR
    ) {
      continue;
    }

    const d_raw = levenshteinDistance(windowText, searchBlock);
    const d_norm = levenshteinDistance(
      stripWhitespace(windowText),
      stripWhitespace(searchBlock),
    );

    const weightedDist = d_norm + (d_raw - d_norm) * WHITESPACE_PENALTY_FACTOR;
    const score = weightedDist / searchBlock.length;

    if (score <= FUZZY_MATCH_THRESHOLD) {
      candidates.push({ index: i, score });
    }
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => a.score - b.score || a.index - b.index);

  const selectedMatches: Array<{ index: number; score: number }> = [];
  for (const candidate of candidates) {
    const overlaps = selectedMatches.some(
      (m) => Math.abs(m.index - candidate.index) < N,
    );
    if (!overlaps) {
      selectedMatches.push(candidate);
    }
  }

  if (selectedMatches.length > 0) {
    const matchRanges = selectedMatches
      .map((m) => ({ start: m.index + 1, end: m.index + N }))
      .sort((a, b) => a.start - b.start);

    selectedMatches.sort((a, b) => b.index - a.index);

    const newLines = normalizedReplace.split("\n");

    for (const match of selectedMatches) {
      const firstLineMatch = sourceLines[match.index];
      const indentationMatch = firstLineMatch.match(/^([ \t]*)/);
      const indentation = indentationMatch ? indentationMatch[1] : "";

      const indentedReplaceLines = applyIndentation(newLines, indentation);

      let replacementText = indentedReplaceLines.join("\n");
      if (sourceLines[match.index + N - 1].endsWith("\n")) {
        replacementText += "\n";
      }

      sourceLines.splice(match.index, N, replacementText);
    }

    let modifiedCode = sourceLines.join("");
    modifiedCode = restoreTrailingNewline(currentContent, modifiedCode);

    return {
      newContent: modifiedCode,
      occurrences: selectedMatches.length,
      finalOldString: normalizedSearch,
      finalNewString: normalizedReplace,
      strategy: "fuzzy",
      matchRanges,
    };
  }

  return null;
}

export function calculateReplacement(
  currentContent: string,
  params: EditParams,
): ReplacementResult {
  const { old_string, new_string } = params;
  const normalizedSearch = old_string.replace(/\r\n/g, "\n");
  const normalizedReplace = new_string.replace(/\r\n/g, "\n");

  if (normalizedSearch === "") {
    return {
      newContent: currentContent,
      occurrences: 0,
      finalOldString: normalizedSearch,
      finalNewString: normalizedReplace,
    };
  }

  const exactResult = calculateExactReplacement(currentContent, params);
  if (exactResult) return exactResult;

  const flexibleResult = calculateFlexibleReplacement(currentContent, params);
  if (flexibleResult) return flexibleResult;

  const regexResult = calculateRegexReplacement(currentContent, params);
  if (regexResult) return regexResult;

  const fuzzyResult = calculateFuzzyReplacement(currentContent, params);
  if (fuzzyResult) return fuzzyResult;

  return {
    newContent: currentContent,
    occurrences: 0,
    finalOldString: normalizedSearch,
    finalNewString: normalizedReplace,
  };
}

export async function attemptSelfCorrection(
  instruction: string,
  oldString: string,
  newString: string,
  errorMsg: string,
  currentContent: string,
  model: LanguageModel,
  abortSignal?: AbortSignal,
): Promise<SearchReplaceEdit | null> {
  const systemInstruction = `You are an expert code-editing assistant specializing in debugging and correcting failed search-and-replace operations.

# Primary Goal
Your task is to analyze a failed edit attempt and provide a corrected \`search\` string that will match the text in the file precisely. The correction should be as minimal as possible, staying very close to the original, failed \`search\` string. Do NOT invent a completely new edit based on the instruction; your job is to fix the provided parameters.

It is important that you do no try to figure out if the instruction is correct. DO NOT GIVE ADVICE. Your only goal here is to do your best to perform the search and replace task!

# Input Context
You will be given:
1. The high-level instruction for the original edit.
2. The exact \`search\` and \`replace\` strings that failed.
3. The error message that was produced.
4. The full content of the latest version of the source file.

# Rules for Correction
1. **Minimal Correction:** Your new \`search\` string must be a close variation of the original. Focus on fixing issues like whitespace, indentation, line endings, or small contextual differences.
2. **Explain the Fix:** Your \`explanation\` MUST state exactly why the original \`search\` failed and how your new \`search\` string resolves that specific failure. (e.g., "The original search failed due to incorrect indentation; the new search corrects the indentation to match the source file.").
3. **Preserve the \`replace\` String:** Do NOT modify the \`replace\` string unless the instruction explicitly requires it and it was the source of the error. Do not escape any characters in \`replace\`. Your primary focus is fixing the \`search\` string.
4. **No Changes Case:** CRUCIAL: if the change is already present in the file, set \`noChangesRequired\` to True and explain why in the \`explanation\`. It is crucial that you only do this if the changes outline in \`replace\` are already in the file and suits the instruction.
5. **Exactness:** The final \`search\` field must be the EXACT literal text from the file. Do not escape characters.

Output your response ONLY in JSON format:
{
  "explanation": "Brief explanation...",
  "search": "exact search string to match",
  "replace": "exact replacement string",
  "noChangesRequired": false
}`;

  const userPrompt = `# Goal of the Original Edit
<instruction>
${instruction || "Apply the requested edit."}
</instruction>

# Failed Attempt Details
- **Original \`search\` parameter (failed):**
<search>
${oldString}
</search>
- **Original \`replace\` parameter:**
<replace>
${newString}
</replace>
- **Error Encountered:**
<error>
${errorMsg}
</error>

# Full File Content
<file_content>
${currentContent}
</file_content>

# Your Task
Based on the error and the file content, provide a corrected \`search\` string that will succeed. Remember to keep your correction minimal and explain the precise reason for the failure in your \`explanation\`.`;

  try {
    const result = await model.generateText({
      system: systemInstruction,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      abortSignal,
    });

    const text = result.text.trim();
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : text;

    const parsed = JSON.parse(jsonString.trim()) as SearchReplaceEdit;
    if (typeof parsed.search === "string" && typeof parsed.replace === "string") {
      return parsed;
    }
  } catch (err) {
    console.error("Error during LLM self-correction:", err);
  }
  return null;
}

export async function applyModuleEdit(
  currentContent: string,
  params: EditParams,
  model?: LanguageModel,
  abortSignal?: AbortSignal,
): Promise<{
  newContent: string;
  success: boolean;
  error?: string;
  strategy?: string;
}> {
  const result = calculateReplacement(currentContent, params);

  // Validate the replacement occurrences
  let errorMsg: string | null = null;
  if (result.occurrences === 0) {
    errorMsg = `Failed to edit: 0 occurrences found for search string in file.`;
  } else if (!params.allow_multiple && result.occurrences !== 1) {
    errorMsg = `Failed to edit: expected 1 occurrence but found ${result.occurrences}.`;
  } else if (result.finalOldString === result.finalNewString) {
    errorMsg = `No changes to apply. The search and replacement strings are identical.`;
  }

  if (!errorMsg) {
    return {
      newContent: result.newContent,
      success: true,
      strategy: result.strategy,
    };
  }

  // If there's an error and we have an LLM, try self-correction
  if (model) {
    const correctionResult = await attemptSelfCorrection(
      params.instruction || "",
      params.old_string,
      params.new_string,
      errorMsg,
      currentContent,
      model,
      abortSignal,
    );

    if (correctionResult && !correctionResult.noChangesRequired) {
      const correctedParams: EditParams = {
        ...params,
        old_string: correctionResult.search,
        new_string: correctionResult.replace,
      };

      const secondResult = calculateReplacement(currentContent, correctedParams);
      let secondError: string | null = null;
      if (secondResult.occurrences === 0) {
        secondError = `Failed to edit on retry: 0 occurrences found for corrected search string.`;
      } else if (!params.allow_multiple && secondResult.occurrences !== 1) {
        secondError = `Failed to edit on retry: expected 1 occurrence but found ${secondResult.occurrences} for corrected search string.`;
      }

      if (!secondError) {
        return {
          newContent: secondResult.newContent,
          success: true,
          strategy: `self-corrected:${secondResult.strategy}`,
        };
      }
    } else if (correctionResult && correctionResult.noChangesRequired) {
      return {
        newContent: currentContent,
        success: true,
        strategy: "self-corrected:no-change-needed",
      };
    }
  }

  return {
    newContent: currentContent,
    success: false,
    error: errorMsg,
  };
}
