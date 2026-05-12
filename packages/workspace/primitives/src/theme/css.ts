import { Theme } from "./generation";

export function themeToCss(theme: Theme): string {
  const palettes = [
    { name: "accent", palette: theme.colors.accent },
    { name: "neutral", palette: theme.colors.neutral },
    { name: "inverse", palette: theme.colors.inverse },
    { name: "success", palette: theme.colors.success },
    { name: "warning", palette: theme.colors.warning },
    { name: "info", palette: theme.colors.info },
    { name: "destructive", palette: theme.colors.error },
  ];

  const lines = [
    ":root {",
    `  --color-background: ${theme.colors.background};`,
  ];

  for (const { name, palette } of palettes) {
    lines.push(`  --color-${name}: ${palette.default};`);
    lines.push(`  --color-${name}-hover: ${palette.hover};`);
    lines.push(`  --color-${name}-active: ${palette.active};`);
    lines.push(`  --color-${name}-contrast: ${palette.contrast};`);
    lines.push(`  --color-${name}-surface: ${palette.surface};`);
    lines.push(`  --color-${name}-surface-hover: ${palette.surfaceHover};`);
    lines.push(`  --color-${name}-surface-active: ${palette.surfaceActive};`);
    lines.push(`  --color-${name}-border: ${palette.border};`);
    lines.push(`  --color-${name}-border-hover: ${palette.borderHover};`);
    lines.push(`  --color-${name}-border-active: ${palette.borderActive};`);
    lines.push(`  --color-${name}-content: ${palette.content};`);
    lines.push(`  --color-${name}-content-subtle: ${palette.contentSubtle};`);
    lines.push(`  --color-${name}-content-muted: ${palette.contentMuted};`);
  }

  lines.push(`  --font-heading: ${theme.fonts.heading};`);
  lines.push(`  --font-body: ${theme.fonts.body};`);
  lines.push(`  --font-code: ${theme.fonts.code};`);
  lines.push("}");

  return lines.join("\n");
}
