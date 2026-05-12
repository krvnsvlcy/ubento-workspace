import chroma from "chroma-js";

export type ValidationResult = {
  isValid: boolean;
  originalHex: string;
  adjustedHex: string;
  reason?: string;
};

/**
 * Validates that a light theme background is actually light.
 * If it's too dark, it forces the luminance up to a safe minimum canvas level.
 */
export function validateLightBackground(
  backgroundHex: string,
): ValidationResult {
  const bg = chroma(backgroundHex);

  // Luminance ranges from 0 (black) to 1 (pure white).
  // 0.85 is a safe minimum for a "light" theme canvas (e.g., a light gray).
  const MIN_CANVAS_LUMINANCE = 0.85;
  const currentLuminance = bg.luminance();

  if (currentLuminance >= MIN_CANVAS_LUMINANCE) {
    return {
      isValid: true,
      originalHex: backgroundHex,
      adjustedHex: backgroundHex,
    };
  }

  // Auto-correct: Force the luminance to the minimum required threshold.
  // This preserves the exact tint (e.g., if they wanted a very pale blue canvas),
  // but ensures it functions properly as a light background.
  const adjustedBg = bg.luminance(MIN_CANVAS_LUMINANCE).hex();

  return {
    isValid: false,
    originalHex: backgroundHex,
    adjustedHex: adjustedBg,
    reason:
      "Background color was too dark for a Light Theme. Luminance mathematically increased.",
  };
}

/**
 * Validates that a base color (accent/neutral) is dark enough to be visible
 * against the provided light background.
 */
export function validateBaseColorForLightMode(
  baseHex: string,
  backgroundHex: string,
): ValidationResult {
  const base = chroma(baseHex);
  const bg = chroma(backgroundHex);

  // WCAG AA Standard for normal text is 4.5:1.
  // 3.0:1 is the minimum for large UI components (buttons, heavy borders).
  // We use 4.0:1 as a robust middle-ground for a structural WorkOS.
  const MIN_CONTRAST_RATIO = 4.0;

  const currentContrast = chroma.contrast(base, bg);

  if (currentContrast >= MIN_CONTRAST_RATIO) {
    return {
      isValid: true,
      originalHex: baseHex,
      adjustedHex: baseHex,
    };
  }

  // Auto-correct: The base color is too light. We must darken it.
  // We use OKLCH (Lightness, Chroma, Hue) to drop the Lightness strictly,
  // preventing the color from shifting its hue or becoming muddy.
  let correctedBase = base;
  let [l, c, h] = correctedBase.oklch();

  // Iteratively step down the lightness until the contrast ratio is met.
  while (chroma.contrast(correctedBase, bg) < MIN_CONTRAST_RATIO && l > 0) {
    l -= 0.02; // Drop lightness by 2% per step
    correctedBase = chroma.oklch(l, c, h);
  }

  return {
    isValid: false,
    originalHex: baseHex,
    adjustedHex: correctedBase.hex(),
    reason: `Color contrast ratio (${currentContrast.toFixed(2)}) was too low. Color mathematically darkened to ensure UI legibility.`,
  };
}
