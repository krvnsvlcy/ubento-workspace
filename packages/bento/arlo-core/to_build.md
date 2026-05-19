# Components to Build

## 🔴 Components We Don't Have (Need to Build)

- **Statistic / Metric Card**: Displays primary numbers (e.g., "Uptime", "Revenue") with optional secondary trend indicators (e.g., "+5%").
- **Number Input**: Restricted to numerical data with increment/decrement steppers.
- **Cascader**: A dropdown that allows users to select from a multi-level, nested hierarchical tree.
- **Checkbox Tree**: For boolean toggles, including nested groupings.
- **Button Group**: A segmented control of buttons to toggle views or trigger related actions.
- **Split Button**: A primary action button coupled with a dropdown for secondary actions.
- **Breadcrumbs**: To indicate hierarchical position within nested data or directory structures.
- **Stepper**: To guide users through a linear, multi-phase workflow.
- **Spacer**: Empty blocks to enforce exact pixel spacing between elements.
- **Image / Video Grid**: Standard media containers.
- **PDF Viewer**: An embedded iframe for reading documents natively within the tool.
- **Scatter Chart**: Missing from the charts collection.

## 🟡 Components We Have but Need Enhancement

## 🟢 Components We Already Have

These components exist in the project, either in `src/core` or `src/components`.

- **Key-Value / Object Viewer**: For inspecting nested JSON payloads or database records. (Exists as `object-viewer.tsx`).
- **Text Input**: Standard single-line input with support for masking (passwords, emails). (Exists as `input.tsx`).
- **Text Area**: Multi-line, auto-expanding text entry. (Exists as `textarea.tsx`).
- **Select / Dropdown**: Single and multi-select menus. (Exists as `select.tsx` and `dropdown-menu.tsx`).
- **Checkbox**: For boolean toggles. (Exists as `checkbox.tsx`).
- **Data Table**: Feature-rich table with TanStack Table.
- **List View**: Virtualized list with React Virtuoso.
- **File Dropzone**: Drag-and-drop file upload.
- **Radio Button Group**: Mutually exclusive options. (Exists as `radio-group.tsx`).
- **Switch / Toggle**: For instant, boolean state changes. (Exists as `switch.tsx` and `toggle.tsx`).
- **Date / Time Picker**: Ranging from single date selection to complex range bounding. (Exists as `date-picker.tsx` and `date-range-picker.tsx`).
- **Button**: Primary, secondary, outline, and destructive variants. (Exists as `button.tsx`).
- **Tabs**: For navigating between distinct views within the same dashboard context. (Exists as `tabs.tsx` and `tab-navigation.tsx`).
- **Container / Panel**: The foundational bounding box for grouping related components. (Exists as `card.tsx`).
- **Divider**: Minimalist horizontal or vertical rules to separate content. (Exists as `divider.tsx` and `separator.tsx`).
- **Typography (Heading, Text)**: Standardized text blocks supporting Markdown or sanitized HTML. (Exists as `heading.tsx` and `text.tsx`).
- **Badge / Tag**: Compact indicators for status, categories, or filtering parameters. (Exists as `badge.tsx`).
- **Alert / Callout**: Inline banners indicating errors, warnings, or success states. (Exists as `callout.tsx` and `alert.tsx`).
- **Modal / Slide-out Panel**: For complex inputs or sub-workflows. (Exists as `dialog.tsx` and `drawer.tsx`).
- **Progress Bar / Spinner**: To indicate async operations or data fetching. (Exists as `progress-bar.tsx` and `progress.tsx`).
- **Tooltip**: Hover states providing additional context for dense metric displays. (Exists as `tooltip.tsx`).
- **Avatar / Avatar Group**: For user profiling and collaboration presence. (Exists as `avatar.tsx`).
- **Charts**: Bar, Line, Area, and Donut charts are available in `src/core/visualization`.
