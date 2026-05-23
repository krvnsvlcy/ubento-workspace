# Ubento Design System & Styling

Ubento uses a modern semantic color system based on **UnoCSS** and CSS variables. This system is designed to be theme-agnostic, supporting dynamic runtime switching between light and dark modes while maintaining visual hierarchy and accessible contrast.

## Core Principles

### 1. Semantic Color Tokens

Instead of absolute color values or arbitrary numeric scales, Ubento uses semantic tokens that describe the _tone_ of the color.

- **`accent`**: The primary brand and action color.
- **`neutral`**: Used for the majority of the UI (surfaces, text, borders).
- **`success`**: Indicates positive actions or completed states.
- **`warning`**: Indicates caution or pending states.
- **`info`**: Indicates helpful information or neutral updates.
- **`destructive`**: Indicates error, danger, or destructive actions (e.g., delete).

### 2. Token Suffixes

Each semantic token has a set of standard suffixes to define its application:

- **`-surface`**: Backgrounds for cards, panels, and sections.
- **`-content`**: Primary text and icon colors.
- **`-border`**: Border colors for elements.
- **`-contrast`**: A color designed to contrast highly with the base token (e.g., text on an accent button).

### 3. State Modifiers

States are handled through standardized suffixes:

- **`-hover`**: State when hovering.
- **`-active`**: State when clicking or active.

## Usage in Utilities

Always use the semantic tokens when using UnoCSS utility classes.

### ✅ Examples (Preferred)

- **Buttons**: `bg-accent text-accent-contrast hover:bg-accent-hover`
- **Cards**: `bg-neutral-surface border border-neutral-border text-neutral-content`
- **Labels**: `text-neutral-content-subtle` (Muted/Subtle text)
- **Status Badges**: `bg-success-surface text-success-content border border-success-border`
- **Destructive Actions**: `text-destructive hover:bg-destructive-surface`

### ❌ Avoid (Legacy/Hardcoded)

- `text-primary-300`, `bg-background-100`, `border-red-400` (Legacy numeric scale)
- `bg-blue-500`, `text-gray-800`, `border-zinc-200` (Hardcoded palette colors)

## Implementation Details

### CSS Theme

The central theme definitions reside in `packages/bento/style/css/themes/default.css`. This file defines the CSS variables (e.g., `--color-accent`, `--color-neutral-surface`) for both light and dark modes.

### UnoCSS Configuration

The mapping from UnoCSS classes to these variables is handled in `packages/bento/style/uno.config.ts`. The `colorTheme` utility helper ensures that tokens like `accent` automatically resolve to the correct CSS variable.

## Guidelines for Agents

When generating new UI components:

1. **Never use hardcoded hex or RGB colors**.
2. **Prefer Neutral Surface/Content**: Use `bg-neutral-surface` and `text-neutral-content` for the base UI.
3. **Use Contrast Tokens**: When placing text on a colored background (like a primary button), always use the `-contrast` token (e.g., `text-accent-contrast`).
4. **Think Semantically**: If a button is meant to delete something, use `destructive`. if it's the main "Save" button, use `accent`.
5. **Define Component Props Inline**: Always define component props inline and prefer function declarations.
   - Example: `export function MyComponent({ propA, propB }: { propA: string; propB: number }) { ... }`
