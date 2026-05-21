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

