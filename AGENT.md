# Ubento Workspace Architecture

This repository contains the Ubento Data-Driven UI (SDUI) engine and its ecosystem. It is structured as a pnpm monorepo designed for high-performance, remotely-controlled applications.

## Monorepo Structure

- `apps/web`: **Work OS Host**. The owner of application data. It manages the lifecycle of the environment and injects configurations into guest applications.
- `apps/tabula`: **Interactive Board Guest**. A thin renderer application that runs inside an iframe. It receives its UI definitions dynamically from the Host.
- `apps/registry`: **Component Registry**. A static server (`port 4030`) that serves self-contained ES modules (widgets) to be used by the engine.
- `packages/engine`: **Core Engine (@ubento/engine)**. The shared logic for state modeling, component rendering, and drag-and-drop interactions.

---

## Core Engine Architecture (@ubento/engine)

The engine is built on a "Flat Map" element architecture, using **Valtio** for high-performance reactive state.

### 1. Primitives

Instead of a deep nested tree, the engine represents UI as a flat registry of two primitives:

- **Container**: A structural element responsible for layout (Flexbox, Grid). It owns a `content` array (list of child IDs).
- **Block**: A content element that wraps a specific widget (e.g., `text` or a remote module). It automatically applies a standardized "box model" (style) to its widget.

### 2. State Modeling (`models.ts`)

- **AppData**: Defines application metadata and routes (mapping paths to Page IDs).
- **PageData**: Contains a `rootId` and an `elements` map of all Containers and Blocks.
- **EditorContext**: Global state for `mode` (`edit` | `view`) and the current `selection`.

### 3. Rendering Logic

- **Recursive Rendering**: The `Page` component starts at the `rootId` and recursively renders elements from the flat registry.
- **Editor-Aware**: When in `edit` mode, the `Element` component wraps content in interactive handles and enables **dnd-kit** for rearrangement.

---

## Communication Strategy

### The Bridge

Host and Guest communicate via a `PostMessage` wrapper called `Bridge`.

1.  **Handshake**: Guest (Tabula) sends `APP_READY` to the Host.
2.  **Injection**: Host responds with `INITIALIZE_GUEST`, sending the entire JSON `AppData` and `PageData`.
3.  **Commanding**: Host can send `NAVIGATE` or update commands to the Guest.

### Shared React Instance

To prevent "Multiple React Instances" errors when loading remote ESM components:

- The Guest app uses an **Import Map** (defined in `apps/tabula/src/modules.ts`).
- This maps `import "react"` inside remote modules to a synthetic blob URL that re-exports the Guest's own React instance.

---

## Remote Components (ESM)

Components in the `apps/registry` are served as pure ES modules.

- They must be the **default export**.
- They import `React` directly from the standard `react` specifier.
- The engine uses dynamic `import()` with a cache to load these widgets on demand.

---

## Development Workflow

1.  **Start Services**: Run `npm run dev` from the root.
2.  **Ports**:
    - Host: `4000`
    - Tabula (Guest): `4020`
    - Registry: `4030`
3.  **Editing**: Toggle to "Edit" mode in Tabula to select elements or drag them to rearrange.
