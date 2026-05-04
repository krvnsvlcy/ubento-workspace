import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

function colorTheme(theme: string) {
  return {
    // for active element (draws attention)
    DEFAULT: `var(--color-${theme})`,
    hover: `var(--color-${theme}-hover)`,
    active: `var(--color-${theme}-active)`,
    contrast: `var(--color-${theme}-contrast)`,

    // for passive element (less prominent)

    // surface (highlight, card, input, etc)
    surface: `var(--color-${theme}-surface)`,
    "surface-hover": `var(--color-${theme}-surface-hover)`,
    "surface-active": `var(--color-${theme}-surface-active)`,

    // border (divider, input border, card border, etc.)
    border: `var(--color-${theme}-border)`,
    "border-hover": `var(--color-${theme}-border-hover)`,
    "border-active": `var(--color-${theme}-border-active)`,

    // content (text, icon, etc.)
    content: `var(--color-${theme}-content)`,
    "content-subtle": `var(--color-${theme}-content-subtle)`,
    "content-muted": `var(--color-${theme}-content-muted)`,
  };
}

export default defineConfig({
  cli: {
    entry: {
      patterns: [
        "../engine/src/**/*.{ts,tsx}",
        "../app/src/**/*.{ts,tsx}",
        "../../../apps/theme-builder/src/**/*.{ts,tsx}",
        "../../../apps/bento.playground/src/**/*.{ts,tsx}",
        "../primitives/src/**/*.{ts,tsx}",
      ],
      outFile: "./dist/uno.css",
    },
  },
  theme: {
    colors: {
      background: "var(--color-background)",
      transparent: "transparent",

      // themes
      accent: colorTheme("accent"),
      neutral: colorTheme("neutral"),
      inverse: colorTheme("inverse"),
      success: colorTheme("success"),
      warning: colorTheme("warning"),
      info: colorTheme("info"),
      destructive: colorTheme("destructive"),
    },
  },
  presets: [
    presetWind4({
      preflights: {
        reset: true,
        property: true,
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
