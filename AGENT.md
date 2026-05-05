# Ubento Agent Index

Ubento is a **WorkOS for internal and personal software**, designed with a "Live Editable" philosophy. This document serves as the central entry point for agents to understand and navigate the project.

## 📖 Documentation Index

For detailed information on specific areas of the platform, refer to the following sub-documents:

### 1. [Engine & Architecture](./docs/agents/ARCHITECTURE.md)

- **Live Editable Paradigm**: Understanding the "Edit-as-you-use" philosophy and mode toggling.
- **Core Engine (@ubento/bento.engine)**: Flat Map element model, primitives (Stacks/Blocks), and reactive state (Zustand).
- **The Bridge**: Host-Guest communication via Duplex RPC.

### 2. [Service Layers](./docs/agents/SERVICES.md)

- **Platform Services**: IAM, Workspaces, and Modules via the bundled service pattern.
- **Workspace Services (Integrations)**: Third-party service consumption via `useServices()`.
- **Backend Infrastructure**: Overview of the microservices ecosystem.

### 3. [Design System & Style](./docs/agents/STYLE.md)

- **UnoCSS Configuration**: The 100-500 color scale and utility principles.
- **Dynamic Theming**: How CSS variables drive the live-editable styling.

### 4. [Monorepo & Workflow](./docs/agents/WORKFLOW.md)

- **Monorepo Structure**: Applications (`apps/`) and Packages (`packages/`).
- **Development Procedures**: Starting services, ports, and using the `scripts/` directory.

---

## 🤖 Agent Mandate

### Living Documentation

**The agent is responsible for the autonomous upkeep of this documentation set.**

- **Continuous Update**: As you explore the codebase, understand new patterns, or identify architectural shifts, you MUST proactively update the relevant sub-document.
- **Truth Alignment**: If you discover a discrepancy between the documentation and the actual implementation, update the documents immediately.
- **Context Preservation**: Ensure all new insights, refined workflows, and critical architectural decisions are captured to maintain a high-signal context for future agents.
