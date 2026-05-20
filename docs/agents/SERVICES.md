# Ubento Service Architecture

Ubento uses a layered service architecture to separate platform management from workspace functionality.

## Service Layers

### 1. Platform Services
Managed via the bundled `ubento` service object. These services power the Work OS Host itself and are responsible for core platform data.
- **IAM**: Identity, Users, Teams, and Invites.
- **Workspaces**: Workspace management, Boards, and Memberships.
- **Modules**: Registry of UI widgets and service modules.

#### Bundled Service Pattern (React Query)
- **Service Objects**: All React Query hooks are encapsulated within service objects (e.g., `ubento.iam`, `ubento.workspace`).
- **Creator Functions**: Services are created via factory functions (e.g., `createUbentoIamService`) that accept a pre-configured SDK instance.
- **Consumption**: The `useUbento` hook returns the bundled service tree.

### 2. Workspace Services (Integrations)
Third-party integrations (Stripe, GitHub, etc.) that are "installed" into a specific workspace.
- **Dynamic Access**: Accessed via the runtime `useServices()` hook, which consumes the `ServicesContext`.
- **Initialization**: The `bento.runtime` engine identifies required services and creates stateful objects using the **StateController pattern** (via `createRuntimeService`).
- **Orchestration**: The `ServicesProvider` component wraps the workspace content. It subscribes to all runtime services and ensures they are all in a `ready` state before rendering children.
 It displays a `PendingView` during initialization and an `ErrorView` if any service fails to load.
- **Pattern**: Workspace service modules MUST provide their service factory as the **default export**. This factory receives an object `{ ubento: UbentoRuntimeApi, ...args }` where `args` are the workspace-configured parameters.
- **Topology**: For complex integrations, the service object should be namespaced (e.g., `stripe.core.useCustomers()`, `stripe.billing.useInvoices()`) to mirror the underlying SDK's organization and improve discoverability.
- **Functionality**: Services provide domain-specific React Query hooks and methods to individual components.

## Backend Microservices
Ubento is powered by a set of specialized microservices:
- `services/iam`: Core identity and access control.
- `services/workspace`: Board and workspace data persistence.
- `services/billing`: Financial integrations (Stripe).
- `services/registry`: Serves ES modules for widgets and services.
- `services/intelligence`: AI-driven workspace suggestions and automation.
- `services/module`: Management of module versions and artifacts.
- `services/integration`: Central manager for third-party service connections.
