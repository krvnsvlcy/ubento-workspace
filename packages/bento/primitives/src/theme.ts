export type ThemeVariables = Record<string, string>;

export type ColorScale = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  contrast: string;
};

export type ColorTheme = {
  // primary
  red: ColorScale;
  orange: ColorScale;
  yellow: ColorScale;
  green: ColorScale;
  cyan: ColorScale;
  blue: ColorScale;
  violet: ColorScale;
  pink: ColorScale;
  rose: ColorScale;
  gray: ColorScale;
  // ui
  dark: ColorScale;
  light: ColorScale;
  // semantic
  primary: ColorScale;
  secondary: ColorScale;
  info: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
};

export interface BentoTheme {
  name: string;
  colors: {
    dark: Partial<ColorTheme>;
    light: Partial<ColorTheme>;
  };
}

function deepMerge<T extends Record<string, any>>(target: T, source: T): T {
  const result = { ...target } as any;
  if (!source) return result;
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function generateCssVariables(colorTheme: Partial<ColorTheme>): string {
  let cssText = "";
  for (const [colorName, scale] of Object.entries(colorTheme)) {
    if (!scale) continue;
    for (const [step, value] of Object.entries(scale)) {
      if (step === "contrast") {
        cssText += `  --${colorName}-contrast: ${value};\n`;
      } else {
        cssText += `  --${colorName}-${step}: ${value};\n`;
      }
    }
  }
  return cssText;
}

export function applyTheme(theme: BentoTheme) {
  let styleEl = document.getElementById("bento-theme-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "bento-theme-styles";
    document.head.appendChild(styleEl);
  }

  // Deep merge with baseTheme
  const finalColors = {
    light: deepMerge(baseTheme.colors.light, theme.colors.light),
    dark: deepMerge(baseTheme.colors.dark, theme.colors.dark),
  };

  let cssText = `:root {\n`;
  cssText += generateCssVariables(finalColors.light);
  cssText += `}\n`;

  if (Object.keys(finalColors.dark).length > 0) {
    cssText += `@media (prefers-color-scheme: dark) {\n  :root {\n`;
    cssText += generateCssVariables(finalColors.dark).replace(/^/gm, "  ");
    cssText += `  }\n}\n`;

    cssText += `:root.dark {\n`;
    cssText += generateCssVariables(finalColors.dark);
    cssText += `}\n`;
  }

  styleEl.textContent = cssText;
  document.documentElement.setAttribute("data-theme", theme.name);
}

export const baseTheme: BentoTheme = {
  name: "base",
  colors: {
    light: {
    red: {
      100: "rgb(255 117 132)",
      200: "rgb(255 72 95)",
      300: "rgb(225 0 60)",
      400: "rgb(181 0 24)",
      500: "rgb(137 0 0)",
      contrast: "#ffffff",
    },
    orange: {
      100: "rgb(255 175 107)",
      200: "rgb(255 135 65)",
      300: "rgb(237 96 0)",
      400: "rgb(194 55 0)",
      500: "rgb(153 0 0)",
      contrast: "#ffffff",
    },
    yellow: {
      100: "rgb(255 187 102)",
      200: "rgb(221 149 61)",
      300: "rgb(181 112 0)",
      400: "rgb(143 76 0)",
      500: "rgb(105 42 0)",
      contrast: "#ffffff",
    },
    green: {
      100: "rgb(114 242 117)",
      200: "rgb(70 202 77)",
      300: "rgb(0 163 32)",
      400: "rgb(0 125 0)",
      500: "rgb(0 89 0)",
      contrast: "#ffffff",
    },
    cyan: {
      100: "rgb(114 233 200)",
      200: "rgb(70 193 162)",
      300: "rgb(0 155 126)",
      400: "rgb(0 118 91)",
      500: "rgb(0 83 59)",
      contrast: "#ffffff",
    },
    blue: {
      100: "rgb(109 216 255)",
      200: "rgb(66 176 255)",
      300: "rgb(0 137 242)",
      400: "rgb(0 99 201)",
      500: "rgb(0 61 161)",
      contrast: "#ffffff",
    },
    violet: {
      100: "rgb(223 138 255)",
      200: "rgb(185 98 255)",
      300: "rgb(148 53 233)",
      400: "rgb(113 0 191)",
      500: "rgb(81 0 151)",
      contrast: "#ffffff",
    },
    pink: {
      100: "rgb(255 117 255)",
      200: "rgb(242 73 242)",
      300: "rgb(200 0 201)",
      400: "rgb(159 0 161)",
      500: "rgb(118 0 123)",
      contrast: "#ffffff",
    },
    rose: {
      100: "rgb(255 118 219)",
      200: "rgb(255 75 180)",
      300: "rgb(223 9 143)",
      400: "rgb(179 0 107)",
      500: "rgb(136 0 74)",
      contrast: "#ffffff",
    },
    gray: {
      100: "rgb(191 191 191)",
      200: "rgb(154 154 154)",
      300: "rgb(118 118 118)",
      400: "rgb(84 84 84)",
      500: "rgb(52 52 52)",
      contrast: "#ffffff",
    },
    dark: {
      100: "rgb(47 47 47)",
      200: "rgb(40 40 40)",
      300: "rgb(33 33 33)",
      400: "rgb(26 26 26)",
      500: "rgb(19 19 19)",
      contrast: "#ffffff",
    },
    light: {
      100: "rgb(255 255 255)",
      200: "rgb(248 248 248)",
      300: "rgb(240 240 240)",
      400: "rgb(232 232 232)",
      500: "rgb(224 224 224)",
      contrast: "#ffffff",
    },
    primary: {
      100: "var(--blue-500)",
      200: "var(--blue-400)",
      300: "var(--blue-300)",
      400: "var(--blue-200)",
      500: "var(--blue-100)",
      contrast: "#ffffff",
    },
    secondary: {
      100: "var(--cyan-500)",
      200: "var(--cyan-400)",
      300: "var(--cyan-300)",
      400: "var(--cyan-200)",
      500: "var(--cyan-100)",
      contrast: "#ffffff",
    },
    },
    dark: {
    },
  },
};

export const carbonTheme: BentoTheme = {
  name: "carbon",
  colors: {
    light: {
    red: {
      100: "rgb(255 117 132)",
      200: "rgb(255 72 95)",
      300: "rgb(225 0 60)",
      400: "rgb(181 0 24)",
      500: "rgb(137 0 0)",
      contrast: "#ffffff",
    },
    orange: {
      100: "rgb(255 175 107)",
      200: "rgb(255 135 65)",
      300: "rgb(237 96 0)",
      400: "rgb(194 55 0)",
      500: "rgb(153 0 0)",
      contrast: "#ffffff",
    },
    yellow: {
      100: "rgb(255 187 102)",
      200: "rgb(221 149 61)",
      300: "rgb(181 112 0)",
      400: "rgb(143 76 0)",
      500: "rgb(105 42 0)",
      contrast: "#ffffff",
    },
    green: {
      100: "rgb(114 242 117)",
      200: "rgb(70 202 77)",
      300: "rgb(0 163 32)",
      400: "rgb(0 125 0)",
      500: "rgb(0 89 0)",
      contrast: "#ffffff",
    },
    cyan: {
      100: "rgb(114 233 200)",
      200: "rgb(70 193 162)",
      300: "rgb(0 155 126)",
      400: "rgb(0 118 91)",
      500: "rgb(0 83 59)",
      contrast: "#ffffff",
    },
    blue: {
      100: "rgb(109 216 255)",
      200: "rgb(66 176 255)",
      300: "rgb(0 137 242)",
      400: "rgb(0 99 201)",
      500: "rgb(0 61 161)",
      contrast: "#ffffff",
    },
    violet: {
      100: "rgb(223 138 255)",
      200: "rgb(185 98 255)",
      300: "rgb(148 53 233)",
      400: "rgb(113 0 191)",
      500: "rgb(81 0 151)",
      contrast: "#ffffff",
    },
    pink: {
      100: "rgb(255 117 255)",
      200: "rgb(242 73 242)",
      300: "rgb(200 0 201)",
      400: "rgb(159 0 161)",
      500: "rgb(118 0 123)",
      contrast: "#ffffff",
    },
    rose: {
      100: "rgb(255 118 219)",
      200: "rgb(255 75 180)",
      300: "rgb(223 9 143)",
      400: "rgb(179 0 107)",
      500: "rgb(136 0 74)",
      contrast: "#ffffff",
    },
    gray: {
      100: "rgb(191 191 191)",
      200: "rgb(154 154 154)",
      300: "rgb(118 118 118)",
      400: "rgb(84 84 84)",
      500: "rgb(52 52 52)",
      contrast: "#ffffff",
    },
    dark: {
      100: "rgb(10, 10, 10)",
      200: "rgb(25, 25, 25)",
      300: "rgb(45, 45, 45)",
      400: "rgb(65, 65, 65)",
      500: "rgb(90, 90, 90)",
      contrast: "#ffffff",
    },
    light: {
      100: "rgb(255 255 255)",
      200: "rgb(248 248 248)",
      300: "rgb(240 240 240)",
      400: "rgb(232 232 232)",
      500: "rgb(224 224 224)",
      contrast: "#ffffff",
    },
    primary: {
      100: "var(--dark-500)",
      200: "var(--dark-400)",
      300: "var(--dark-300)",
      400: "var(--dark-200)",
      500: "var(--dark-100)",
      contrast: "#ffffff",
    },
    secondary: {
      100: "var(--gray-500)",
      200: "var(--gray-400)",
      300: "var(--gray-300)",
      400: "var(--gray-200)",
      500: "var(--gray-100)",
      contrast: "#ffffff",
    },
    },
    dark: {
    dark: {
      100: "rgb(47 47 47)",
      200: "rgb(40 40 40)",
      300: "rgb(33 33 33)",
      400: "rgb(26 26 26)",
      500: "rgb(19 19 19)",
      contrast: "#ffffff",
    },
    primary: {
      100: "var(--light-500)",
      200: "var(--light-400)",
      300: "var(--light-300)",
      400: "var(--light-200)",
      500: "var(--light-100)",
      contrast: "#ffffff",
    },
    },
  },
};

export const forestTheme: BentoTheme = {
  name: "forest",
  colors: {
    light: {
    red: {
      100: "rgb(250 120 120)",
      200: "rgb(230 80 80)",
      300: "rgb(200 50 50)",
      400: "rgb(160 30 30)",
      500: "rgb(120 20 20)",
      contrast: "#ffffff",
    },
    orange: {
      100: "rgb(255 165 90)",
      200: "rgb(240 130 50)",
      300: "rgb(210 100 25)",
      400: "rgb(170 70 15)",
      500: "rgb(130 50 10)",
      contrast: "#ffffff",
    },
    yellow: {
      100: "rgb(255 230 100)",
      200: "rgb(245 205 50)",
      300: "rgb(220 180 25)",
      400: "rgb(180 145 15)",
      500: "rgb(140 110 10)",
      contrast: "#ffffff",
    },
    green: {
      100: "rgb(110 215 135)",
      200: "rgb(65 180 100)",
      300: "rgb(40 140 75)",
      400: "rgb(25 100 55)",
      500: "rgb(15 65 35)",
      contrast: "#ffffff",
    },
    cyan: {
      100: "rgb(120 215 235)",
      200: "rgb(75 185 205)",
      300: "rgb(45 145 165)",
      400: "rgb(25 105 120)",
      500: "rgb(15 70 80)",
      contrast: "#ffffff",
    },
    blue: {
      100: "rgb(140 190 245)",
      200: "rgb(90 155 225)",
      300: "rgb(55 120 195)",
      400: "rgb(35 85 145)",
      500: "rgb(20 55 100)",
      contrast: "#ffffff",
    },
    violet: {
      100: "rgb(195 155 235)",
      200: "rgb(165 115 210)",
      300: "rgb(135 85 180)",
      400: "rgb(100 60 135)",
      500: "rgb(70 40 95)",
      contrast: "#ffffff",
    },
    pink: {
      100: "rgb(245 155 200)",
      200: "rgb(225 115 175)",
      300: "rgb(190 80 140)",
      400: "rgb(145 55 105)",
      500: "rgb(105 35 75)",
      contrast: "#ffffff",
    },
    rose: {
      100: "rgb(250 140 175)",
      200: "rgb(230 100 145)",
      300: "rgb(200 65 110)",
      400: "rgb(155 40 80)",
      500: "rgb(110 25 55)",
      contrast: "#ffffff",
    },
    gray: {
      100: "rgb(190 195 200)",
      200: "rgb(150 155 160)",
      300: "rgb(115 120 125)",
      400: "rgb(85 90 95)",
      500: "rgb(55 60 65)",
      contrast: "#ffffff",
    },
    dark: {
      100: "rgb(70 73 78)",
      200: "rgb(55 58 62)",
      300: "rgb(42 44 48)",
      400: "rgb(30 32 36)",
      500: "rgb(20 22 25)",
      contrast: "#ffffff",
    },
    light: {
      100: "rgb(252 254 255)",
      200: "rgb(248 250 252)",
      300: "rgb(242 245 248)",
      400: "rgb(235 238 240)",
      500: "rgb(225 228 230)",
      contrast: "#ffffff",
    },
    primary: {
      100: "var(--green-500)",
      200: "var(--green-400)",
      300: "var(--green-300)",
      400: "var(--green-200)",
      500: "var(--green-100)",
      contrast: "#ffffff",
    },
    secondary: {
      100: "var(--cyan-500)",
      200: "var(--cyan-400)",
      300: "var(--cyan-300)",
      400: "var(--cyan-200)",
      500: "var(--cyan-100)",
      contrast: "#ffffff",
    },
    },
    dark: {},
  },
};

export const skyTheme: BentoTheme = {
  name: "sky",
  colors: {
    light: {
    red: {
      100: "rgb(255 117 132)",
      200: "rgb(255 72 95)",
      300: "rgb(225 0 60)",
      400: "rgb(181 0 24)",
      500: "rgb(137 0 0)",
      contrast: "#ffffff",
    },
    orange: {
      100: "rgb(255 175 107)",
      200: "rgb(255 135 65)",
      300: "rgb(237 96 0)",
      400: "rgb(194 55 0)",
      500: "rgb(153 0 0)",
      contrast: "#ffffff",
    },
    yellow: {
      100: "rgb(255 187 102)",
      200: "rgb(221 149 61)",
      300: "rgb(181 112 0)",
      400: "rgb(143 76 0)",
      500: "rgb(105 42 0)",
      contrast: "#ffffff",
    },
    green: {
      100: "rgb(114 242 117)",
      200: "rgb(70 202 77)",
      300: "rgb(0 163 32)",
      400: "rgb(0 125 0)",
      500: "rgb(0 89 0)",
      contrast: "#ffffff",
    },
    cyan: {
      100: "rgb(114 233 200)",
      200: "rgb(70 193 162)",
      300: "rgb(0 155 126)",
      400: "rgb(0 118 91)",
      500: "rgb(0 83 59)",
      contrast: "#ffffff",
    },
    blue: {
      100: "rgb(109 216 255)",
      200: "rgb(66 176 255)",
      300: "rgb(0 137 242)",
      400: "rgb(0 99 201)",
      500: "rgb(0 61 161)",
      contrast: "#ffffff",
    },
    violet: {
      100: "rgb(223 138 255)",
      200: "rgb(185 98 255)",
      300: "rgb(148 53 233)",
      400: "rgb(113 0 191)",
      500: "rgb(81 0 151)",
      contrast: "#ffffff",
    },
    pink: {
      100: "rgb(255 117 255)",
      200: "rgb(242 73 242)",
      300: "rgb(200 0 201)",
      400: "rgb(159 0 161)",
      500: "rgb(118 0 123)",
      contrast: "#ffffff",
    },
    rose: {
      100: "rgb(255 118 219)",
      200: "rgb(255 75 180)",
      300: "rgb(223 9 143)",
      400: "rgb(179 0 107)",
      500: "rgb(136 0 74)",
      contrast: "#ffffff",
    },
    gray: {
      100: "rgb(185 200 215)",
      200: "rgb(155 170 190)",
      300: "rgb(125 142 165)",
      400: "rgb(100 116 139)",
      500: "rgb(70 85 105)",
      contrast: "#ffffff",
    },
    dark: {
      100: "rgb(40 57 80)",
      200: "rgb(33 48 70)",
      300: "rgb(26 40 60)",
      400: "rgb(20 32 50)",
      500: "rgb(15 25 40)",
      contrast: "#ffffff",
    },
    light: {
      100: "rgb(250 253 255)",
      200: "rgb(245 249 253)",
      300: "rgb(236 242 249)",
      400: "rgb(220 230 242)",
      500: "rgb(199 214 232)",
      contrast: "#ffffff",
    },
    primary: {
      100: "var(--blue-500)",
      200: "var(--blue-400)",
      300: "var(--blue-300)",
      400: "var(--blue-200)",
      500: "var(--blue-100)",
      contrast: "#ffffff",
    },
    secondary: {
      100: "var(--cyan-500)",
      200: "var(--cyan-400)",
      300: "var(--cyan-300)",
      400: "var(--cyan-200)",
      500: "var(--cyan-100)",
      contrast: "#ffffff",
    },
    },
    dark: {
    gray: {
      100: "rgb(214 228 240)",
      200: "rgb(185 200 215)",
      300: "rgb(148 163 184)",
      400: "rgb(100 116 139)",
      500: "rgb(70 85 105)",
      contrast: "#ffffff",
    },
    },
  },
};

export const sunsetTheme: BentoTheme = {
  name: "sunset",
  colors: {
    light: {
    red: {
      100: "rgb(255 117 132)",
      200: "rgb(255 72 95)",
      300: "rgb(225 0 60)",
      400: "rgb(181 0 24)",
      500: "rgb(137 0 0)",
      contrast: "#ffffff",
    },
    orange: {
      100: "rgb(255 175 107)",
      200: "rgb(255 135 65)",
      300: "rgb(237 96 0)",
      400: "rgb(194 55 0)",
      500: "rgb(153 0 0)",
      contrast: "#ffffff",
    },
    yellow: {
      100: "rgb(255 187 102)",
      200: "rgb(221 149 61)",
      300: "rgb(181 112 0)",
      400: "rgb(143 76 0)",
      500: "rgb(105 42 0)",
      contrast: "#ffffff",
    },
    green: {
      100: "rgb(114 242 117)",
      200: "rgb(70 202 77)",
      300: "rgb(0 163 32)",
      400: "rgb(0 125 0)",
      500: "rgb(0 89 0)",
      contrast: "#ffffff",
    },
    cyan: {
      100: "rgb(114 233 200)",
      200: "rgb(70 193 162)",
      300: "rgb(0 155 126)",
      400: "rgb(0 118 91)",
      500: "rgb(0 83 59)",
      contrast: "#ffffff",
    },
    blue: {
      100: "rgb(109 216 255)",
      200: "rgb(66 176 255)",
      300: "rgb(0 137 242)",
      400: "rgb(0 99 201)",
      500: "rgb(0 61 161)",
      contrast: "#ffffff",
    },
    violet: {
      100: "rgb(223 138 255)",
      200: "rgb(185 98 255)",
      300: "rgb(148 53 233)",
      400: "rgb(113 0 191)",
      500: "rgb(81 0 151)",
      contrast: "#ffffff",
    },
    pink: {
      100: "rgb(255 117 255)",
      200: "rgb(242 73 242)",
      300: "rgb(200 0 201)",
      400: "rgb(159 0 161)",
      500: "rgb(118 0 123)",
      contrast: "#ffffff",
    },
    rose: {
      100: "rgb(255 118 219)",
      200: "rgb(255 75 180)",
      300: "rgb(223 9 143)",
      400: "rgb(179 0 107)",
      500: "rgb(136 0 74)",
      contrast: "#ffffff",
    },
    gray: {
      100: "rgb(191 191 191)",
      200: "rgb(154 154 154)",
      300: "rgb(118 118 118)",
      400: "rgb(84 84 84)",
      500: "rgb(52 52 52)",
      contrast: "#ffffff",
    },
    dark: {
      100: "rgb(56 53 50)",
      200: "rgb(48 45 42)",
      300: "rgb(40 37 34)",
      400: "rgb(32 29 27)",
      500: "rgb(24 22 20)",
      contrast: "#ffffff",
    },
    light: {
      100: "rgb(255 253 250)",
      200: "rgb(250 248 242)",
      300: "rgb(244 240 234)",
      400: "rgb(236 232 226)",
      500: "rgb(228 224 218)",
      contrast: "#ffffff",
    },
    primary: {
      100: "var(--orange-500)",
      200: "var(--orange-400)",
      300: "var(--orange-300)",
      400: "var(--orange-200)",
      500: "var(--orange-100)",
      contrast: "#ffffff",
    },
    secondary: {
      100: "var(--yellow-500)",
      200: "var(--yellow-400)",
      300: "var(--yellow-300)",
      400: "var(--yellow-200)",
      500: "var(--yellow-100)",
      contrast: "#ffffff",
    },
    },
    dark: {
    red: {
      100: "rgb(255 136 147)",
      200: "rgb(255 93 110)",
      300: "rgb(255 40 74)",
      400: "rgb(210 0 38)",
      500: "rgb(166 0 0)",
      contrast: "#ffffff",
    },
    orange: {
      100: "rgb(255 199 112)",
      200: "rgb(255 159 69)",
      300: "rgb(247 120 0)",
      400: "rgb(205 81 0)",
      500: "rgb(164 40 0)",
      contrast: "#ffffff",
    },
    yellow: {
      100: "rgb(255 240 109)",
      200: "rgb(255 212 77)",
      300: "rgb(248 173 0)",
      400: "rgb(208 135 0)",
      500: "rgb(168 98 0)",
      contrast: "#ffffff",
    },
    green: {
      100: "rgb(0 194 87)",
      200: "rgb(0 181 81)",
      300: "rgb(0 167 74)",
      400: "rgb(1 160 73)",
      500: "rgb(0 152 68)",
      contrast: "#ffffff",
    },
    cyan: {
      100: "rgb(109 255 233)",
      200: "rgb(92 255 220)",
      300: "rgb(1 237 181)",
      400: "rgb(0 197 144)",
      500: "rgb(0 158 108)",
      contrast: "#ffffff",
    },
    blue: {
      100: "rgb(114 192 250)",
      200: "rgb(90 181 246)",
      300: "rgb(0 156 235)",
      400: "rgb(16 137 205)",
      500: "rgb(0 116 176)",
      contrast: "#ffffff",
    },
    violet: {
      100: "rgb(255 188 255)",
      200: "rgb(227 148 255)",
      300: "rgb(188 109 255)",
      400: "rgb(151 69 214)",
      500: "rgb(115 22 173)",
      contrast: "#ffffff",
    },
    pink: {
      100: "rgb(255 154 255)",
      200: "rgb(255 110 255)",
      300: "rgb(254 61 254)",
      400: "rgb(211 0 213)",
      500: "rgb(169 0 173)",
      contrast: "#ffffff",
    },
    rose: {
      100: "rgb(255 153 255)",
      200: "rgb(255 111 216)",
      300: "rgb(255 67 177)",
      400: "rgb(211 0 140)",
      500: "rgb(168 0 104)",
      contrast: "#ffffff",
    },
    gray: {
      100: "rgb(225 225 225)",
      200: "rgb(186 186 186)",
      300: "rgb(149 149 149)",
      400: "rgb(113 113 113)",
      500: "rgb(80 80 80)",
      contrast: "#ffffff",
    },
    },
  },
};

