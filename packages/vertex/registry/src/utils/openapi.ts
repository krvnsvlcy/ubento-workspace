import { parse as parseYaml } from "yaml";

export async function getOpenApiSpec({
  url,
  format,
}: {
  url: string;
  format?: "yaml" | "json";
}): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: {
      Accept:
        format === "yaml"
          ? "application/x-yaml, text/yaml"
          : "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Ubento Engine: Failed to fetch OpenAPI spec from ${url} (Status: ${response.status})`,
    );
  }

  const rawText = await response.text();

  // 1. If format is explicitly requested, parse accordingly
  if (format === "yaml") {
    return parseYaml(rawText);
  }
  if (format === "json") {
    return JSON.parse(rawText);
  }

  // 2. If no format is provided, attempt smart inference
  const contentType = response.headers.get("content-type") || "";

  if (
    contentType.includes("yaml") ||
    url.endsWith(".yaml") ||
    url.endsWith(".yml")
  ) {
    return parseYaml(rawText);
  }

  // 3. Fallback: Try JSON first, catch and attempt YAML if the server sent the wrong headers
  try {
    return JSON.parse(rawText);
  } catch (jsonError) {
    try {
      return parseYaml(rawText);
    } catch (yamlError) {
      throw new Error(
        `Ubento Engine: Unrecognized OpenAPI spec format at ${url}. Could not parse as JSON or YAML.`,
      );
    }
  }
}
