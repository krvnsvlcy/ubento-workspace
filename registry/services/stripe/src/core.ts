import Stripe from "stripe";
import { createResourceProxy } from "@ubento/registry-proxy";

export function createStripeCoreService(stripe: Stripe) {
  return {
    accounts: createResourceProxy("stripe", stripe, "accounts"),
    balance: createResourceProxy("stripe", stripe, "balance"),
    balanceTransactions: createResourceProxy("stripe", stripe, "balanceTransactions"),
    customers: createResourceProxy("stripe", stripe, "customers"),
    events: createResourceProxy("stripe", stripe, "events"),
    files: createResourceProxy("stripe", stripe, "files"),
    fileLinks: createResourceProxy("stripe", stripe, "fileLinks"),
    products: createResourceProxy("stripe", stripe, "products"),
    prices: createResourceProxy("stripe", stripe, "prices"),
    promotionCodes: createResourceProxy("stripe", stripe, "promotionCodes"),
    taxCodes: createResourceProxy("stripe", stripe, "taxCodes"),
    taxRates: createResourceProxy("stripe", stripe, "taxRates"),
    tokens: createResourceProxy("stripe", stripe, "tokens"),
    mandates: createResourceProxy("stripe", stripe, "mandates"),
  };
}
