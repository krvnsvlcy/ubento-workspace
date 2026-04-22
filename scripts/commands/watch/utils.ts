export type TextRangeEdit = {
  start: number; // index where replacement starts
  length: number; // how many characters to remove
  replacement: string; // what to insert
};

/**
 * Apply a set of range replacements to a string.
 * Ranges should refer to positions in the original string.
 *
 * ⚠️ If you don’t guarantee sorted order, this function will sort
 * ranges in descending start index so replacements don’t shift
 * subsequent positions.
 */
export function replaceRanges(input: string, ranges: TextRangeEdit[]): string {
  if (ranges.length === 0) return input;

  // Sort by start descending so later edits don’t affect earlier positions
  const sorted = [...ranges].sort((a, b) => b.start - a.start);

  let result = input;
  for (const { start, length, replacement } of sorted) {
    result =
      result.slice(0, start) + replacement + result.slice(start + length);
  }

  return result;
}
