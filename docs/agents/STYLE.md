# Ubento Design System & Styling

Ubento uses a custom design system based on **UnoCSS** and CSS variables, allowing for dynamic theme switching at runtime.

## Core Principles

### 1. Simplified Color Palette (100-500 Scale)
Unlike standard 50-950 scales, Ubento uses a strictly controlled 5-level scale for all colors.
- **100**: Darkest / Most Saturated.
- **300**: Base level.
- **500**: Lightest / Most Desaturated (in Light mode) or Brightest (in Dark mode).

### 2. Core Colors
- `primary`: Main brand color.
- `secondary`: Secondary brand color.
- `background`: Range from `background-000` to `background-500`.
- `foreground`: Range from `foreground-100` to `foreground-500`.

### 3. Usage in Utilities
Always use the 100-500 scale when using UnoCSS utility classes.
- ✅ `text-primary-300`, `bg-background-100`, `border-red-400`
- ❌ `text-blue-600`, `bg-gray-50`, `border-indigo-500`

## Implementation

### CSS Variables
Styling is driven by CSS variables defined in `@ubento/bento-style`. This enables the "Live Editable" paradigm where themes can be swapped instantly without a rebuild.

### Configuration
The central configuration resides in `packages/bento/style/uno.config.ts`. It includes:
- Custom theme definitions for the 100-500 scale.
- Functional color mappings (red, green, blue, etc.).
- Preflights for CSS reset.
- Transformers for directives and variant groups.
