# Ubento Engine Architecture

Ubento is built on a high-performance **Server-Driven UI (SDUI)** engine with a "Live Editable" philosophy.

## Core Concepts

### 1. Live Editable Paradigm

- **Edit-as-you-use**: Workspaces are not "deployed"; they are live entities that are shaped during use.
- **Mode Toggle**: Users switch between **Live** (interact) and **Edit** (shape) modes using a **Double Shift** keyboard shortcut.

### 2. Core Engine Architecture (@ubento/bento.engine)

The engine uses a "Flat Map" element architecture for efficient real-time manipulation.

#### Primitives

UI is represented as a flat registry of two primitives:

- **Stack**: A structural element responsible for layout (Flexbox). It owns a `content` array (list of child IDs).
- **Block**: A content element that wraps a specific widget (e.g., a remote module). It applies a standardized "box model" (style) to its widget.

#### State Modeling (`models.ts`)

- **WorkspaceData**: Defines workspace metadata and associated services.
- **BoardData**: Contains a `rootId` and an `elements` map of all Stacks and Blocks.
- **EngineStore**: Global state managed by **Zustand**, including `mode` (`edit` | `live`), `selection`, and workspace/board data.

### 3. Reactive Objects Pattern (StateController)

The standard way to build stateful, reactive objects in Ubento is the **Zustand with State Controller** pattern, defined in `@ubento/workspace.primitives`.

- **Standard Interface**: Every stateful object (Engine, RuntimeServices, etc.) should expose a `StateController<T>` interface.
- **Capabilities**:
  - `getState()`: Immediate access to current state.
  - `setState(updater)`: Functional or partial state updates.
  - `subscribe(listener)`: Pure JS subscription to state changes.
  - `useState(selector)`: React hook for reactive consumption with fine-grained selectors.
- **Creation**: Use `createZustandStateController(store)` to wrap a standard Zustand vanilla store. This ensures a consistent API across the platform regardless of whether the state is platform-level or service-specific.

#### Rendering Logic

- **Recursive Rendering**: The engine starts at the board's content and recursively renders elements from the flat registry.
- **Editor-Aware**: When in `edit` mode, components are wrapped in interactive handles and enable **dnd-kit** for rearrangement.

## Communication Strategy (The Bridge)

Host and Guest communicate via a Duplex RPC wrapper using `postMessage`.

1. **Handshake**: Guest sends `connect` then `ready` to the Host.
2. **Injection**: Host responds with `init`, sending the `WorkspaceData` and configuration.
3. **Commanding**: Host and Guest exchange events (e.g., `modeChanged`, `selectionChanged`) and mutation requests (e.g., `addElement`, `setElementStyle`).

### Shared React Instance

To prevent "Multiple React Instances" errors when loading remote ESM components, the Guest app uses an **Import Map** to map `import "react"` inside remote modules to its own React instance.

### Remote Components (ESM)

Components in the registry are served as pure ES modules.

- They must be the **default export**.
- They import `React` directly from the standard `react` specifier.
