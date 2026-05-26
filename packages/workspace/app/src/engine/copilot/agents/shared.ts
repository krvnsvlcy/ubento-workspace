export const servicesVsToolkitsInstruction = `
## Critical: Services vs Toolkits

- **Services ARE NOT Toolkits**: Services are ONLY accessible within the Ubento workspace runtime (the React boards). They are supposed to be used in the board ESM module code only.
- **DO NOT** try to call services as tools (e.g., calling \`service:action\` in the agent environment). This is NOT supported and will fail.
- Services must be invoked inside the React board component's code via the \`serviceApi\` from the workspace environment context.
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
