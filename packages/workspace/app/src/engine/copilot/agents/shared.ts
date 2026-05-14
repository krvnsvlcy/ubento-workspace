export const servicesVsToolkitsInstruction = `
## Critical: Services vs Toolkits

- **Services ARE NOT Toolkits**: Services are ONLY accessible within the Ubento workspace. They are supposed to be used in the board spec only.
- **DO NOT** try to call services as tools (e.g., calling \`service:action\`). This is NOT supported and will fail.
- Services must be defined in the board's \`store\` (for queries and actions). They cannot be invoked directly by agents as tools.
`;
