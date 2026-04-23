import op from "@1password/sdk";

const vaultId = "abjzivssjf5wrji4d2o42csc74";
const productionVariablesItemId = "zb67zftzf5qrgff4rnl3wdcogq";

/**
 * Loads environment variables from 1Password.
 */
export async function load1PasswordEnvs(): Promise<Record<string, string>> {
  const client = await op.createClient({
    auth: new op.DesktopAuth("Abstrea Tech"),
    integrationName: "ubento-local-dev",
    integrationVersion: "v1.0.0",
  });

  const v = await client.items.get(vaultId, productionVariablesItemId);

  console.log(`DEBUG: notes content length: ${v.notes.length}`);
  const vars = Object.fromEntries(
    v.notes
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        const matches =
          trimmed.length > 0 &&
          trimmed.includes("=") &&
          !trimmed.startsWith("#");
        if (trimmed.length > 0 && !matches) {
          console.log(`DEBUG: skipping line: "${trimmed}"`);
        }
        return trimmed;
      })
      .filter(
        (line) =>
          line.length > 0 && line.includes("=") && !line.startsWith("#"),
      )
      .map((line) => {
        const indexOfEqual = line.indexOf("=");
        return [
          line.slice(0, indexOfEqual).trim(),
          line.slice(indexOfEqual + 1).trim(),
        ];
      }),
  );

  return vars;
}
