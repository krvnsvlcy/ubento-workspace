import YAML from "yaml";

export function renderJson(json: any) {
  return ["```json", JSON.stringify(json, null, 2), "```"].join("\n");
}

export function indent(text: string, spaces: number) {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => pad + line)
    .join("\n");
}

export function renderYaml(json: any) {
  return ["```yaml", YAML.stringify(json).trim(), "```"].join("\n");
}
export function renderCodeBlock(code: string, language: string = "") {
  return ["```" + language, code, "```"].join("\n");
}
