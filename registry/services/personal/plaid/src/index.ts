import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ clientId, secret, env }: { clientId: string, secret: string, env: string }) {
  const configuration = new Configuration({
    basePath: PlaidEnvironments[env as keyof typeof PlaidEnvironments],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  });

  const plaid = new PlaidApi(configuration);
  return {
    accounts: createResourceProxy("plaid", plaid, "accountsGet"),
    transactions: createResourceProxy("plaid", plaid, "transactionsGet"),
    liabilities: createResourceProxy("plaid", plaid, "liabilitiesGet")
  };
}
