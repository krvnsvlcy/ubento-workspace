export const servicesVsToolkitsInstruction = `
## Critical: Services, Actions, and Queries

- **Services ARE NOT Toolkits**: Services are ONLY accessible within the Ubento workspace runtime (the React boards). They are supposed to be used in the board ESM module code only.
- **DO NOT** try to call services as tools (e.g., calling \\\`service:action\\\` in the agent environment). This is NOT supported and will fail.
- Services must be invoked inside the React board component's code using the \\\`useQuery\\\` and \\\`useAction\\\` hooks imported from \\\`"ubento"\\\`.

### 1. Fetching Data with \\\`useQuery\\\`
Use \\\`useQuery\\\` for read-only queries. It automatically executes the query and handles loading/error states (backed by TanStack Query).

The \\\`options\\\` object is typed as a subset of TanStack Query options (specifically, all standard options omitting \\\`queryKey\\\` and \\\`queryFn\\\`) plus a custom \\\`keepPreviousData?: boolean\\\` option to retain the last successful data while new data is fetching on argument changes.

\\\`\\\`\\\`tsx
import { useQuery } from "ubento";

// Inside the component:
const { data, isLoading, error } = useQuery({
  service: "todo-service",
  query: "getTodos",
  args: { status: "pending" }, // optional arguments
  options: { 
    enabled: true, 
    keepPreviousData: true, // optional: keep previous data while fetching new data
  },
});
\\\`\\\`\\\`

### 2. Fetching Paginated/Infinite Data with \\\`useInfiniteQuery\\\`
Use \\\`useInfiniteQuery\\\` for paginated queries (backed by TanStack's \\\`useInfiniteQuery\\\`). It automatically forwards the \\\`pageParam\\\` to the service operation. If \\\`pageParam\\\` is an object, it is merged into \\\`args\\\`; otherwise, it is passed as \\\`cursor: pageParam\\\` in the arguments.
\\\`\\\`\\\`tsx
import { useInfiniteQuery } from "ubento";

// Inside the component:
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  service: "todo-service",
  query: "getTodos",
  args: { limit: 10 }, // optional base arguments
  initialPageParam: undefined, // required initial cursor or page param
  getNextPageParam: (lastPage) => lastPage.nextPage?.cursor, // required function to get next page param
  options: { enabled: true }, // optional extra TanStack Query options
});
\\\`\\\`\\\`

### 3. Mutating Data with \\\`useAction\\\`
Use \\\`useAction\\\` for actions that mutate state or perform operations (like creating, updating, or deleting). It returns a TanStack Mutation.
\\\`\\\`\\\`tsx
import { useAction } from "ubento";

// Inside the component:
const { mutate, isPending } = useAction({
  service: "todo-service",
  action: "createTodo",
  args: { listId: "123" }, // optional initial arguments
  options: { onSuccess: () => console.log("Success!") }, // optional TanStack Mutation options
});

// To invoke the action, call mutate with optional dynamic arguments:
const handleSubmit = (text: string) => {
  mutate({ text });
};
\\\`\\\`\\\`
`;

export const componentModuleInstruction = `
## ESM Board Module Structure and Guidelines

Every board in Ubento is defined by an ESM module containing a React component as its default export. 

### 1. File Structure (index.tsx)
- **Default Export**: The file must export a default React component.
- **Props**: The component receives parameters passed to the board as props (e.g., \`props.productId\`).
`;

export const boardInteractionAndVerificationInstruction = `
## Active Runtime Interaction and Verification

Ubento provides a suite of runtime tools (\`focus_board\`, \`read_node\`, \`click_node\`, \`set_value\`, \`get_value\`, \`read_logs\`, \`read_context\`, \`wait\`) to inspect and interact with the live board state during execution.
All DOM interaction tools (\`read_node\`, \`click_node\`, \`set_value\`, \`get_value\`) accept a standard CSS \`selector\` (string).
- **Selecting Known Bento Elements**: Target bento elements in the DOM using classes or attributes.
- **Verification workflow**:
  1. **Focus**: Focus the board with \`focus_board\`.
  2. **Interact & Wait**: Use \`click_node\` or \`set_value\` and then call \`wait\` (e.g. 500ms or 1000ms) to allow the board to update.
  3. **Verify State & UI**: Use \`read_node\` or \`get_value\` to check that the layout and updates are rendering correctly.
  4. **Always Verify Before Declaring Done**: Do NOT declare a task done until you have verified that it functions as expected in the live UI.
`;

export const dataStateHandlingInstruction = `
## Handling Data States (Loading, Error, Empty)

When displaying dynamic data fetched from a service query, always make sure the UI handles three critical states:
1. **Loading State**: Show a \`Spinner\` or \`Skeleton\` component while the data is loading.
2. **Error State**: Show an \`Alert\` or a descriptive error fallback if the request fails.
3. **Empty State**: Show an \`Empty\` card or a friendly message with a call-to-action if the list or data returned is empty.
`;

export const uxExpertInstruction = `
## Principal UI/UX Design & Expert Guidelines

Design great layouts:
- Use stacks (\`Stack\`), grids (\`Grid\`), or split panels to organize information.
- Provide generous whitespace: ensure padding and gaps make elements breathe.
- Provide rich visual feedback for all interactive states.
- Ensure clear typographic hierarchy using size/weight combinations.
`;

export const navigationRoutingInstruction = `
## Routing and Navigation Hooks

Ubento boards support dynamic parameters and navigation through React hooks imported from \\\`"ubento"\\\`.

### 1. Navigating with \\\`useNavigation\\\`
Use the \\\`useNavigation\\\` hook to programmatically navigate to other boards or back home.
\\\`\\\`\\\`tsx
import { useNavigation } from "ubento";

// Inside the component:
const { goToBoard, goHome } = useNavigation();

// Navigate to a board with parameters:
const handleSelectProduct = (productId: string) => {
  goToBoard("<!-- id of the board to navigate to -->", { productId });
};

// Navigate back to the workspace home:
const handleBack = () => {
  goHome();
};
\\\`\\\`\\\`

### 2. Accessing Location State with \\\`useLocation\\\`
Use the \\\`useLocation\\\` hook to access the raw active board path/location state.
\\\`\\\`\\\`tsx
import { useLocation } from "ubento";

// Inside the component:
const location = useLocation();
// location: { boardId: string; params: Record<string, string> } | undefined
\\\`\\\`\\\`

### 3. Reading Parameters with \\\`useParams\\\`
Use the \\\`useParams\\\` hook to retrieve parameters passed to the active board.
\\\`\\\`\\\`tsx
import { useParams } from "ubento";

// Inside the component:
const { productId } = useParams(); // returns Record<string, string>
\\\`\\\`\\\`
`;

export const planModeInstruction = `
## Plan Mode Protocol
- **Strict Read-Only Guard**: When Plan Mode is active, code-modifying tools (e.g., \`write_board_module\`, \`edit_board_module\`, \`create_board\`, \`update_board_metadata\`, \`delete_boards\`) are locked.
- **Entering Plan Mode**: At the start of a task, if the goal is complex, you MUST call \`enter_plan_mode(reason)\` to establish plan mode.
- **Exit Plan Mode**: Once the plan is drafted and recorded, call \`approve_plan(approvedPlanSummary)\` to exit Plan Mode and unlock mutating tools. Do NOT attempt to modify files/modules until the plan has been approved.
`;

export const taskTrackerInstruction = `
## Task-Tracking Protocol
- **Record State in Task Tracker**: Never rely on memory. You must record state and subtask status using the task tracker toolkit.
- **Decompose Complexity**: Break down tasks into structured dependencies (e.g. create a master task, then child subtasks).
- **Update Status Proactively**: Update task status from \`open\` -> \`in_progress\` -> \`blocked\` or \`closed\` as you complete steps.
- **Use Visualizer**: Regularly run \`visualize_tasks\` to print the task dependency graph in your turns.
`;

