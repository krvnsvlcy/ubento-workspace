import Stripe from "stripe";
import { createResourceProxy } from "./proxy.js";

export function createStripeCoreService(stripe: Stripe) {
  return {
    accounts: createResourceProxy<Stripe.AccountsResource>(stripe, "accounts"),
    balance: createResourceProxy<Stripe.BalanceResource>(stripe, "balance"),
    balanceTransactions: createResourceProxy<Stripe.BalanceTransactionsResource>(stripe, "balanceTransactions"),
    customers: createResourceProxy<Stripe.CustomersResource>(stripe, "customers"),
    events: createResourceProxy<Stripe.EventsResource>(stripe, "events"),
    files: createResourceProxy<Stripe.FilesResource>(stripe, "files"),
    fileLinks: createResourceProxy<Stripe.FileLinksResource>(stripe, "fileLinks"),
    products: createResourceProxy<Stripe.ProductsResource>(stripe, "products"),
    prices: createResourceProxy<Stripe.PricesResource>(stripe, "prices"),
    promotionCodes: createResourceProxy<Stripe.PromotionCodesResource>(stripe, "promotionCodes"),
    taxCodes: createResourceProxy<Stripe.TaxCodesResource>(stripe, "taxCodes"),
    taxRates: createResourceProxy<Stripe.TaxRatesResource>(stripe, "taxRates"),
    tokens: createResourceProxy<Stripe.TokensResource>(stripe, "tokens"),
    mandates: createResourceProxy<Stripe.MandatesResource>(stripe, "mandates"),
  };
}
