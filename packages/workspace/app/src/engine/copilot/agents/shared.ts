export const servicesVsToolkitsInstruction = `
## Critical: Services vs Toolkits

- **Services ARE NOT Toolkits**: Services are ONLY accessible within the Ubento workspace. They are supposed to be used in the board spec only.
- **DO NOT** try to call services as tools (e.g., calling \`service:action\`). This is NOT supported and will fail.
- Services must be defined in the board's \`store\` (for queries and actions). They cannot be invoked directly by agents as tools.
`;

export const defaultBoardLayoutInstruction = `
## Default Board Layout

- **Root Layout Structure**: The board usually has a default root layout composed of three primary elements in its children list: \`["header", "divider", "body"]\`.
- **Do Not Modify Root/Header**: When editing or rendering the board spec, unless explicitly asked by the user, **DO NOT** modify the root layout elements or the \`header\` element.
- **Scope of Modification**: By default, assume that the user is referring to modifications inside the \`body\` area (i.e. adding, deleting, or reordering elements inside the \`body\` element's children).
`;

export const directivesInstruction = `
## Shared Directives ($use, $eval, $apply, $call, $run)

Ubento uses directives to inject dynamic behavior into board specifications. These directives are represented as objects with a single key beginning with a dollar sign (\`$\`). They are categorized into **Eager Directives** (evaluated during render) and **Lazy Directives** (executed by event handlers).

### Eager Directives (Evaluated during Render)

These directives are resolved synchronously during the board's rendering phase and are used to compute, derive, or fetch values for component props, query parameters, etc.

#### 1. The \`$use\` Directive (Path Resolver)
Reads a value from the current rendering context.
- **Syntax**: \`{ "$use": "path.to.value" }\`
- **Resolution**: Evaluates the path relative to the board context (which contains \`session\`, \`workspace\`, \`params\`, \`state\`, and \`store\`).
- **Features**:
  - Supports standard dot notation (e.g., \`state.user.name\`).
  - Supports optional chaining syntax, which is safely handled (e.g., \`state.selectedItem?.id\` resolves without errors).
  - Supports bracket notation (e.g., \`state.items[0].id\` or \`state.items.0.id\`).
  - The root context object can be referenced directly using \`$\` or prefix paths with \`$.\`.
- **Usage**:
  - Pass dynamic properties to components:
    \`\`\`json
    "props": {
      "text": { "$use": "state.username" }
    }
    \`\`\`
  - Bind arguments for store queries/actions:
    \`\`\`json
    "params": {
      "userId": { "$use": "session.user.id" }
    }
    \`\`\`

#### 2. The \`$eval\` Directive (Computed Expression)
Eagerly evaluates a JavaScript expression against the rendering context.
- **Syntax**: \`{ "$eval": "javascript_expression" }\`
- **Resolution**: Under the hood, it constructs and executes a function: \`new Function(...keys, "return " + expression)\`. All top-level keys in the rendering context (\`state\`, \`session\`, \`store\`, \`params\`, etc.) are exposed as local variables.
- **Features**:
  - Useful for formatting, calculated states, conditionals, and logical operations.
  - Automatically recovers from runtime errors (e.g., accessing properties of undefined) by returning \`undefined\`, preventing crashes.
- **Usage**:
  - Computed boolean checks:
    \`\`\`json
    "props": {
      "disabled": { "$eval": "state.loading || !state.agreed" }
    }
    \`\`\`

#### 3. The \`$apply\` Directive (Context Function Transformation)
Eagerly executes a context function to transform or derive data.
- **Syntax**:
  \`\`\`json
  {
    "$apply": {
      "fn": "path.to.function",
      "args": {
        "argName": { "$use": "state.createdAt" }
      }
    }
  }
  \`\`\`
- **Resolution**: Resolves the target function from the context using the path in \`fn\`, resolves any nested directives inside \`args\`, and calls the function with the resolved arguments, returning the result eagerly.
- **Usage**:
  - Dynamically format or transform data using a utility function in context:
    \`\`\`json
    "props": {
      "formattedDate": {
        "$apply": {
          "fn": "utils.formatDate",
          "args": {
            "timestamp": { "$use": "state.createdAt" }
          }
        }
      }
    }
    \`\`\`

---

### Lazy Directives (Executed by Event Handlers)

Lazy directives return an asynchronous function waiting for an event to trigger them.
**CRITICAL**: All event handlers defined under component \`listeners\` (e.g., \`click\`, \`change\`, \`hover\`) must map to either a \`$call\` or \`$run\` directive. The old \`{ handler, args }\` structure is deprecated and will fail.

#### 1. The \`$call\` Directive (RPC / Dispatcher)
Returns an async function that calls a specific context function (such as workspace navigation or a store action) when the event triggers.
- **Syntax**:
  \`\`\`json
  {
    "$call": {
      "fn": "path.to.function",
      "args": {
        "argName": { "$use": "state.someVal" }
      }
    }
  }
  \`\`\`
- **Resolution**: Returns a closure. When triggered, it resolves arguments using the context at the time of the event (merged with runtime event payload args under the \`event\` key) and invokes the target function.
- **Usage**:
  - Triggering workspace navigation on click:
    \`\`\`json
    "listeners": {
      "click": {
        "$call": {
          "fn": "workspace.goTo",
          "args": {
            "boardId": "brd_details",
            "params": {
              "id": { "$use": "state.selectedId" }
            }
          }
        }
      }
    }
    \`\`\`

#### 2. The \`$run\` Directive (Side-Effect Handler / Function Execution)
Returns an async function that runs an arbitrary block of side-effect code.
- **Syntax**: \`{ "$run": "javascript_code_statements" }\`
- **Resolution**: Compiles the code block inside an \`AsyncFunction\`. The context is available, along with runtime event arguments (accessible under the \`event\` variable).
- **Features**:
  - Supports multi-line logic, conditional statements (if/else), loops, and \`await\` for async operations.
  - Use \`$.setState({ ... })\` to update board state variables.
- **Usage**:
  - Perform multiple operations and state updates:
    \`\`\`json
    "listeners": {
      "click": {
        "$run": "$.setState({ loading: true }); await store.saveProject({ id: state.projectId }); $.setState({ loading: false });"
      }
    }
    \`\`\`
`;
