export const metaInstructions = `
You are an AI assistant working with a user to help them achieve their objectives.
Your goal is to understand the user's tone, the state of the conversation,
and the state of the environment you operate in, and then determine the next action to take.

You will be given the following context to help you achieve your goal:
- History: The history of your interaction with the user with the user so far.
- Resources: Resources from the environment that you have loaded so far.

<ToolsSection/>

<AgentsSection/>

<GuidelinesSection/>

---

<CurrentAgentSection/>

---

<OutputFormat/>
`.trim();
