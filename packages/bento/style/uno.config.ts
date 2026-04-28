import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  cli: {
    entry: {
      patterns: [
        "../engine/src/**/*.{ts,tsx}",
        "../app/src/**/*.{ts,tsx}",
        "../../../apps/theme-builder/src/**/*.{ts,tsx}",
        "../primitives/src/**/*.{ts,tsx}",
      ],
      outFile: "./dist/uno.css",
    },
  },
  theme: {
    colors: {
      // Ubento Core Palette (100-500 scale)
      background: {
        DEFAULT: "var(--background)",
        "000": "var(--background-000)",
        100: "var(--background-100)",
        200: "var(--background-200)",
        300: "var(--background-300)",
        400: "var(--background-400)",
        500: "var(--background-500)",
      },
      foreground: {
        DEFAULT: "var(--foreground)",
        100: "var(--foreground-100)",
        200: "var(--foreground-200)",
        300: "var(--foreground-300)",
        400: "var(--foreground-400)",
        500: "var(--foreground-500)",
      },
      primary: {
        100: "var(--primary-100)",
        200: "var(--primary-200)",
        300: "var(--primary-300)",
        400: "var(--primary-400)",
        500: "var(--primary-500)",
      },
      secondary: {
        100: "var(--secondary-100)",
        200: "var(--secondary-200)",
        300: "var(--secondary-300)",
        400: "var(--secondary-400)",
        500: "var(--secondary-500)",
      },
      // Ubento Functional Colors
      red: {
        100: "var(--red-100)",
        200: "var(--red-200)",
        300: "var(--red-300)",
        400: "var(--red-400)",
        500: "var(--red-500)",
      },
      orange: {
        100: "var(--orange-100)",
        200: "var(--orange-200)",
        300: "var(--orange-300)",
        400: "var(--orange-400)",
        500: "var(--orange-500)",
      },
      yellow: {
        100: "var(--yellow-100)",
        200: "var(--yellow-200)",
        300: "var(--yellow-300)",
        400: "var(--yellow-400)",
        500: "var(--yellow-500)",
      },
      green: {
        100: "var(--green-100)",
        200: "var(--green-200)",
        300: "var(--green-300)",
        400: "var(--green-400)",
        500: "var(--green-500)",
      },
      cyan: {
        100: "var(--cyan-100)",
        200: "var(--cyan-200)",
        300: "var(--cyan-300)",
        400: "var(--cyan-400)",
        500: "var(--cyan-500)",
      },
      blue: {
        100: "var(--blue-100)",
        200: "var(--blue-200)",
        300: "var(--blue-300)",
        400: "var(--blue-400)",
        500: "var(--blue-500)",
      },
      violet: {
        100: "var(--violet-100)",
        200: "var(--violet-200)",
        300: "var(--violet-300)",
        400: "var(--violet-400)",
        500: "var(--violet-500)",
      },
      pink: {
        100: "var(--pink-100)",
        200: "var(--pink-200)",
        300: "var(--pink-300)",
        400: "var(--pink-400)",
        500: "var(--pink-500)",
      },
      rose: {
        100: "var(--rose-100)",
        200: "var(--rose-200)",
        300: "var(--rose-300)",
        400: "var(--rose-400)",
        500: "var(--rose-500)",
      },
      gray: {
        100: "var(--gray-100)",
        200: "var(--gray-200)",
        300: "var(--gray-300)",
        400: "var(--gray-400)",
        500: "var(--gray-500)",
      },
      dark: {
        100: "var(--dark-100)",
        200: "var(--dark-200)",
        300: "var(--dark-300)",
        400: "var(--dark-400)",
        500: "var(--dark-500)",
      },
      light: {
        100: "var(--light-100)",
        200: "var(--light-200)",
        300: "var(--light-300)",
        400: "var(--light-400)",
        500: "var(--light-500)",
      },
      paper: "var(--paper)",
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
