import { createGenerator, type UnoGenerator } from "@unocss/core";
import { presetWind4 } from "@unocss/preset-wind4";

export class UbentoUnoWrapper<Theme extends object = object> {
  private unoPromise: Promise<UnoGenerator<Theme>> | UnoGenerator<Theme>;
  private uno: UnoGenerator<Theme> | null = null;
  private knownTokens: Set<string>;
  private cachedCss: string;

  constructor(unoInstance: Promise<UnoGenerator<Theme>> | UnoGenerator<Theme>) {
    this.unoPromise = unoInstance;
    if (!(unoInstance instanceof Promise)) {
      this.uno = unoInstance;
    }
    this.knownTokens = new Set<string>();
    this.cachedCss = "";
  }

  private async getUno(): Promise<UnoGenerator<Theme>> {
    if (this.uno) return this.uno;
    this.uno = await this.unoPromise;
    return this.uno;
  }

  /**
   * Extracts tokens from new code, adds them to the cumulative registry,
   * and returns the complete, finalized CSS string for all tokens seen so far.
   * @param code - The raw source code to parse.
   * @returns A promise resolving to the full CSS string.
   */
  async addSource(code: string): Promise<string> {
    const uno = await this.getUno();

    // 1. Extract tokens from the incoming source code
    const extracted = await uno.applyExtractors(code);

    // 2. Check for any net-new tokens
    let hasNewTokens = false;
    for (const token of extracted) {
      if (!this.knownTokens.has(token)) {
        this.knownTokens.add(token);
        hasNewTokens = true;
      }
    }

    // 3. Early return: If the WorkOS parsed a component with classes we already know,
    // skip the generation cycle and return the existing complete CSS.
    if (!hasNewTokens) {
      return this.cachedCss;
    }

    // 4. Generate the complete CSS for the entire set of known tokens
    const result = await uno.generate(this.knownTokens, {
      // Note: If this output represents the ONE and ONLY stylesheet for Ubento,
      // you may want to set `preflights: true` to include your base resets.
      // If you inject resets separately, keep this false.
      preflights: false,
      safelist: false,
    });

    // 5. Update the cache and return
    this.cachedCss = result.css;
    return this.cachedCss;
  }

  /**
   * Clears the CSS and token cache
   */
  resetEngine(): void {
    this.knownTokens.clear();
    this.cachedCss = "";
  }
}

const uno = createGenerator({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
        property: true,
      },
    }),
  ],
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
      background: "var(--color-background)",
      foreground: "var(--color-foreground)",
      main: "var(--color-main)",
      "main-highlight": "var(--color-main-highlight)",
      "main-contrast": "var(--color-main-contrast)",
      "main-hover": "var(--color-main-hover)",
      "main-active": "var(--color-main-active)",
      surface: "var(--color-surface)",
      "surface-hover": "var(--color-surface-hover)",
      "surface-active": "var(--color-surface-active)",
      border: "var(--color-border)",
      "border-hover": "var(--color-border-hover)",
      "border-active": "var(--color-border-active)",
      content: "var(--color-content)",
      "content-subtle": "var(--color-content-subtle)",
      "content-muted": "var(--color-content-muted)",
    },
    font: {
      heading: "var(--font-heading)",
      body: "var(--font-body)",
      code: "var(--font-code)",
    },
  },
});

export const ubentoUno = new UbentoUnoWrapper(uno);

/**
 * Updates the global UnoCSS stylesheet with classes extracted from the code
 */
export async function updateUnoStyle(code: string) {
  try {
    const css = await ubentoUno.addSource(code);
    if (typeof document !== "undefined") {
      let styleTag = document.getElementById("ubento-unocss-runtime");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "ubento-unocss-runtime";
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = css;
    }
  } catch (err) {
    console.error("Failed to update UnoCSS runtime styles:", err);
  }
}
