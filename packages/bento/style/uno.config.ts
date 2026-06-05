import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

function colorTheme(theme: string) {
  return {};
}

export default defineConfig({
  cli: {
    entry: {
      patterns: [
        "../runtime/src/**/*.{ts,tsx}",
        "../core/src/**/*.{ts,tsx}",
        "../arlo/src/**/*.{ts,tsx}",
        "../arlo-core/src/**/*.{ts,tsx}",
        "../../workspace/app/src/**/*.{ts,tsx}",
        "../../workspace/primitives/src/**/*.{ts,tsx}",
        "../../../apps/theme-builder/src/**/*.{ts,tsx}",
        "../../../apps/bento.playground/src/**/*.{ts,tsx}",
        "../../../apps/ubento/app/**/*.{ts,tsx}",
        "../../../apps/ubento/components/**/*.{ts,tsx}",
        "../../../apps/ubento/views/**/*.{ts,tsx}",
      ],
      outFile: "./dist/uno.css",
    },
  },
  rules: [
    ["animate-in", { animation: "enter 150ms ease-out forwards" }],
    ["animate-out", { animation: "exit 150ms ease-in forwards" }],
    ["fade-in-0", { "--tw-enter-opacity": "0" }],
    ["fade-out-0", { "--tw-exit-opacity": "0" }],
    ["zoom-in-95", { "--tw-enter-scale": "0.95" }],
    ["zoom-out-95", { "--tw-exit-scale": "0.95" }],
    ["slide-in-from-top-2", { "--tw-enter-translate-y": "-0.5rem" }],
    ["slide-in-from-right-2", { "--tw-enter-translate-x": "0.5rem" }],
    ["slide-in-from-left-2", { "--tw-enter-translate-x": "-0.5rem" }],
    ["slide-in-from-bottom-2", { "--tw-enter-translate-y": "0.5rem" }],
  ],
  theme: {
    colors: {
      transparent: "transparent",

      // Base
      background: "var(--color-background)",
      foreground: "var(--color-foreground)",

      // Main
      main: `var(--color-main)`,
      "main-highlight": `var(--color-main-highlight)`,
      "main-contrast": `var(--color-main-contrast)`,
      "main-hover": `var(--color-main-hover)`,
      "main-active": `var(--color-main-active)`,

      // Interaction

      // surface (highlight, card, input, etc)
      surface: `var(--color-surface)`,
      "surface-hover": `var(--color-surface-hover)`,
      "surface-active": `var(--color-surface-active)`,

      // border (divider, input border, card border, etc.)
      border: `var(--color-border)`,
      "border-hover": `var(--color-border-hover)`,
      "border-active": `var(--color-border-active)`,

      // content (text, icon, etc.)
      content: `var(--color-content)`,
      "content-subtle": `var(--color-content-subtle)`,
      "content-muted": `var(--color-content-muted)`,
    },
    font: {
      heading: "var(--font-heading)",
      body: "var(--font-body)",
      code: "var(--font-code)",
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
