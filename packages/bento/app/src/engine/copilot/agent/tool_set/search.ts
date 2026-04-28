import { generateText } from "ai";
import { renderYaml } from "~/lib/format.js";
import { LanguageModel } from "~/lib/models.js";
import { safeYamlParse } from "~/lib/yaml.js";
import { ToolSummary } from "./tool_set.js";

export async function searchTools({
  query,
  tools,
  model,
  limit = 5,
}: {
  query: string;
  tools: ToolSummary[];
  model: LanguageModel;
  limit?: number;
}): Promise<ToolSummary[]> {
  // 1. Clear system instructions enforcing the YAML output format
  const system = `
You are an intelligent tool routing assistant. Your task is to help other agents find the most relevant tools to fulfill their query. 
You will be provided with a list of tools and a query describing what the agent wants to do. 
Respond ONLY with a YAML array of up to ${limit} tool names. Only the tool names. Do not include markdown code blocks, explanations, or any other text.
Example of output:
${renderYaml(["tool_xyz", "tool_abc", "tool_123"])}
`;

  // 2. Focused user prompt containing only the dynamic data
  const prompt = `Available Tools:
${renderYaml(tools)}

User Query: "${query}"`;

  const result = await generateText({
    model,
    system,
    prompt,
  });

  const parsedData = safeYamlParse(result.text);
  const selectedToolNames = Array.isArray(parsedData)
    ? parsedData.slice(0, limit)
    : [];

  return tools.filter((tool) => selectedToolNames.includes(tool.name));
}
