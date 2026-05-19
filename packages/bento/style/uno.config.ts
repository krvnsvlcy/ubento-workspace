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
