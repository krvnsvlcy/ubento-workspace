import chroma from "chroma-js";

export type ColorPalette = {
  default: string;
  hover: string;
  active: string;
  contrast: string;
  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  border: string;
  borderHover: string;
  borderActive: string;
  content: string;
  contentSubtle: string;
  contentMuted: string;
};

export type Theme = {
  colors: {
    background: string;
    accent: ColorPalette;
    neutral: ColorPalette;
    inverse: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    info: ColorPalette;
    error: ColorPalette;
  };
  fonts: {
    heading: string;
    body: string;
    code: string;
  };
};

export type HslInput = {
  h: number; // Hue: 0 - 360
  s: number; // Saturation: 0 - 1
  l: number; // Lightness: 0 - 1
};

export type ThemeRoot = {
  colors: {
    accent: HslInput;
    neutral: HslInput;
    background: {
      l: number; // Only Lightness is needed!
    };
  };
  fonts: {
    heading: string;
    body: string;
    code: string;
  };
};

/**
 * Utility to reliably format a chroma color into a standard CSS OKLCH string.
 * We still output OKLCH for native DOM rendering.
 */
function toOklchString(color: chroma.Color): string {
  const [l, c, h] = color.oklch();
  const safeH = Number.isNaN(h) ? 0 : h;
  return `oklch(${l.toFixed(4)} ${c.toFixed(4)} ${safeH.toFixed(2)})`;
}

/**
 * Generates a full 13-token color palette.
 * (Inputs are OKLCH strings passed down from generateColorBases)
 */
export function generateColorPalette(
  baseOklchString: string,
  backgroundOklchString: string,
): ColorPalette {
  const base = chroma(baseOklchString);
  const bg = chroma(backgroundOklchString);

  const isDarkBg = bg.luminance() < 0.5;

  // Active Elements
  const defaultColor = toOklchString(base);
  const hoverColor = toOklchString(
    isDarkBg ? base.brighten(0.3) : base.darken(0.2),
  );
  const activeColor = toOklchString(
    isDarkBg ? base.brighten(0.6) : base.darken(0.4),
  );

  const contrastColor = toOklchString(
    chroma(base.luminance() > 0.45 ? "#000000" : "#FFFFFF"),
  );

  // Passive Elements (Mixed in OKLAB for perfect visual blending)
  const surfaceColor = toOklchString(chroma.mix(bg, base, 0.05, "oklab"));
  const surfaceHoverColor = toOklchString(chroma.mix(bg, base, 0.08, "oklab"));
  const surfaceActiveColor = toOklchString(chroma.mix(bg, base, 0.12, "oklab"));

  // Borders
  const borderColor = toOklchString(chroma.mix(bg, base, 0.15, "oklab"));
  const borderHoverColor = toOklchString(chroma.mix(bg, base, 0.25, "oklab"));
  const borderActiveColor = toOklchString(chroma.mix(bg, base, 0.35, "oklab"));

  // Content
  const highContrastAnchor = isDarkBg ? chroma("#FFFFFF") : chroma("#000000");

  const contentColor = toOklchString(
    chroma.mix(highContrastAnchor, base, 0.8, "oklab"),
  );
  const contentSubtleColor = toOklchString(
    chroma.mix(highContrastAnchor, base, 0.3, "oklab"),
  );
  const contentMutedColor = toOklchString(
    chroma.mix(highContrastAnchor, base, 0.5, "oklab"),
  );

  return {
    default: defaultColor,
    hover: hoverColor,
    active: activeColor,
    contrast: contrastColor,
    surface: surfaceColor,
    surfaceHover: surfaceHoverColor,
    surfaceActive: surfaceActiveColor,
    border: borderColor,
    borderHover: borderHoverColor,
    borderActive: borderActiveColor,
    content: contentColor,
    contentSubtle: contentSubtleColor,
    contentMuted: contentMutedColor,
  };
}

/**
 * Compiles the human-readable HSL inputs into the foundational UI tokens.
 */
export function generateColorBases({
  accent,
  neutral,
  background,
}: {
  accent: HslInput;
  neutral: HslInput;
  background: { l: number };
}): {
  background: string;
  accent: string;
  neutral: string;
  inverse: string;
  success: string;
  warning: string;
  info: string;
  error: string;
} {
  // 1. Initialize core colors from HSL.
  const acc = chroma.hsl(accent.h, accent.s, accent.l);
  const neut = chroma.hsl(neutral.h, neutral.s, neutral.l);

  // 2. The Absolute Anchor: Background inherits Neutral's Hue AND Saturation.
  // Because HSL is mathematically symmetrical, an 'l' of 1 is safely pure white.
  const bg = chroma.hsl(neutral.h, neutral.s, background.l);

  const isDarkBg = bg.luminance() < 0.5;

  // 3. Calculate Inverse (Mixed in OKLAB for softness)
  const absoluteInverse = isDarkBg ? chroma("#FFFFFF") : chroma("#000000");
  const inverse = chroma.mix(absoluteInverse, neut, 0.05, "oklab");

  // 4. Raw Semantics
  const rawSuccess = "#10B981";
  const rawWarning = "#F59E0B";
  const rawInfo = "#0EA5E9";
  const rawError = "#EF4444";

  const groundRatio = 0.12;

  // 5. Output pure OKLCH strings for the DOM
  return {
    background: toOklchString(bg),
    accent: toOklchString(acc),
    neutral: toOklchString(neut),
    inverse: toOklchString(inverse),
    success: toOklchString(chroma.mix(rawSuccess, neut, groundRatio, "oklab")),
    warning: toOklchString(chroma.mix(rawWarning, neut, groundRatio, "oklab")),
    info: toOklchString(chroma.mix(rawInfo, neut, groundRatio, "oklab")),
    error: toOklchString(chroma.mix(rawError, neut, groundRatio, "oklab")),
  };
}
/**
 * The primary entry point. Transforms an HSL ThemeRoot into a fully populated,
 * CSS-ready UI Theme object.
 */
export function generateTheme(root: ThemeRoot): Theme {
  const bases = generateColorBases({
    accent: root.colors.accent,
    neutral: root.colors.neutral,
    background: root.colors.background,
  });

  return {
    colors: {
      background: bases.background,
      accent: generateColorPalette(bases.accent, bases.background),
      neutral: generateColorPalette(bases.neutral, bases.background),
      inverse: generateColorPalette(bases.inverse, bases.background),
      success: generateColorPalette(bases.success, bases.background),
      warning: generateColorPalette(bases.warning, bases.background),
      info: generateColorPalette(bases.info, bases.background),
      error: generateColorPalette(bases.error, bases.background),
    },
    fonts: root.fonts,
  };
}
