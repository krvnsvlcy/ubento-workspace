import { Command } from "commander";
import {
  activateOffer,
  createOffer,
  createProduct,
  createProviderLink,
  deactivateOffer,
  getOffer,
  getOfferByCode,
  getProduct,
  getProductByCode,
  getProviderLink,
  listOffers,
  listProducts,
  listProviderLinks,
  updateOffer,
  updateProduct,
  updateProviderLink,
  upsertProviderLink,
} from "../../routines/catalog.js";

export function registerCatalogCommands(program: Command) {
  const catalog = program
    .command("catalog")
    .description("Catalog management commands");

  // ==================== Products ====================

  const products = catalog.command("product").description("Product management");

  products
    .command("create")
    .description("Create a new product")
    .argument("<code>", "Product code")
    .argument("<name>", "Product name")
    .option("-d, --description <description>", "Product description")
    .option(
      "-c, --default_offer_code <default_offer_code>",
      "Default offer code",
    )
    .action(async (code, name, options) => {
      const product = await createProduct({
        code,
        name,
        description: options.description,
        default_offer_code: options.default_offer_code,
      });
      console.log(JSON.stringify(product, null, 2));
    });

  products
    .command("update")
    .description("Update a product")
    .argument("<id>", "Product ID")
    .option("-n, --name <name>", "New name")
    .option("-d, --description <description>", "New description")
    .option(
      "-c, --default_offer_code <default_offer_code>",
      "New default offer code",
    )
    .action(async (id, options) => {
      const product = await updateProduct(id, options);
      console.log(JSON.stringify(product, null, 2));
    });

  products
    .command("get")
    .description("Get a product by ID")
    .argument("<id>", "Product ID")
    .action(async (id) => {
      const product = await getProduct(id);
      console.log(JSON.stringify(product, null, 2));
    });

  products
    .command("get-by-code")
    .description("Get a product by code")
    .argument("<code>", "Product code")
    .action(async (code) => {
      const product = await getProductByCode(code);
      console.log(JSON.stringify(product, null, 2));
    });

  products
    .command("list")
    .description("List products")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listProducts(options);
      console.log(JSON.stringify(result, null, 2));
    });

  // ==================== Offers ====================

  const offers = catalog.command("offer").description("Offer management");

  offers
    .command("create")
    .description("Create a new offer")
    .argument("<code>", "Offer code")
    .argument("<product_code>", "Product code")
    .argument("<name>", "Offer name")
    .option("-d, --description <description>", "Description")
    .option("-a, --active", "Set active", true)
    .action(async (code, product_code, name, options) => {
      const offer = await createOffer({
        code,
        product_code,
        name,
        description: options.description,
        active: options.active,
      });
      console.log(JSON.stringify(offer, null, 2));
    });

  offers
    .command("update")
    .description("Update an offer")
    .argument("<id>", "Offer ID")
    .option("-n, --name <name>", "New name")
    .option("-d, --description <description>", "New description")
    .option("-p, --product_code <product_code>", "New product code")
    .action(async (id, options) => {
      const offer = await updateOffer(id, options);
      console.log(JSON.stringify(offer, null, 2));
    });

  offers
    .command("activate")
    .description("Activate an offer")
    .argument("<id>", "Offer ID")
    .action(async (id) => {
      const offer = await activateOffer(id);
      console.log(JSON.stringify(offer, null, 2));
    });

  offers
    .command("deactivate")
    .description("Deactivate an offer")
    .argument("<id>", "Offer ID")
    .action(async (id) => {
      const offer = await deactivateOffer(id);
      console.log(JSON.stringify(offer, null, 2));
    });

  offers
    .command("get")
    .description("Get an offer by ID")
    .argument("<id>", "Offer ID")
    .action(async (id) => {
      const offer = await getOffer(id);
      console.log(JSON.stringify(offer, null, 2));
    });

  offers
    .command("get-by-code")
    .description("Get an offer by code")
    .argument("<code>", "Offer code")
    .action(async (code) => {
      const offer = await getOfferByCode(code);
      console.log(JSON.stringify(offer, null, 2));
    });

  offers
    .command("list")
    .description("List offers")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .option("--active <active>", "Filter by active status (true/false)")
    .option("--code <code>", "Filter by code")
    .action(async (options) => {
      const result = await listOffers({
        ...options,
        active:
          options.active === "true"
            ? true
            : options.active === "false"
              ? false
              : undefined,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  // ==================== Provider Links ====================

  const providerLinks = catalog
    .command("provider-link")
    .description("Provider link management");

  providerLinks
    .command("create")
    .description("Create a provider link")
    .argument("<provider>", "Provider (e.g. LEMON_SQUEEZY)")
    .argument(
      "<provider_entity>",
      "Provider Entity (e.g. PRODUCT, SUBSCRIPTION)",
    )
    .argument("<provider_id>", "Provider ID")
    .argument("<resource_type>", "Resource Type (e.g. PRODUCT, OFFER)")
    .argument("<resource_code>", "Resource Code")
    .option("--status <status>", "Status (ACTIVE/INACTIVE)")
    .option("--priority <priority>", "Priority", parseInt)
    .action(
      async (
        provider,
        provider_entity,
        provider_id,
        resource_type,
        resource_code,
        options,
      ) => {
        const link = await createProviderLink({
          provider,
          provider_entity,
          provider_id,
          resource_type,
          resource_code,
          status: options.status,
          priority: options.priority,
        });
        console.log(JSON.stringify(link, null, 2));
      },
    );

  providerLinks
    .command("upsert")
    .description("Upsert a provider link")
    .argument("<provider>", "Provider")
    .argument("<provider_entity>", "Provider Entity")
    .argument("<provider_id>", "Provider ID")
    .argument("<resource_type>", "Resource Type")
    .argument("<resource_code>", "Resource Code")
    .option("--status <status>", "Status")
    .option("--priority <priority>", "Priority", parseInt)
    .action(
      async (
        provider,
        provider_entity,
        provider_id,
        resource_type,
        resource_code,
        options,
      ) => {
        const link = await upsertProviderLink({
          provider,
          provider_entity,
          provider_id,
          resource_type,
          resource_code,
          status: options.status,
          priority: options.priority,
        });
        console.log(JSON.stringify(link, null, 2));
      },
    );

  providerLinks
    .command("update")
    .description("Update a provider link")
    .argument("<id>", "Link ID")
    .option("--status <status>", "New status")
    .option("--priority <priority>", "New priority", parseInt)
    .action(async (id, options) => {
      const link = await updateProviderLink(id, options);
      console.log(JSON.stringify(link, null, 2));
    });

  providerLinks
    .command("get")
    .description("Get a provider link by ID")
    .argument("<id>", "Link ID")
    .action(async (id) => {
      const link = await getProviderLink(id);
      console.log(JSON.stringify(link, null, 2));
    });

  providerLinks
    .command("list")
    .description("List provider links")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .option("--resource_type <resource_type>", "Filter by resource type")
    .option("--resource_code <resource_code>", "Filter by resource code")
    .option("--provider <provider>", "Filter by provider")
    .action(async (options) => {
      const result = await listProviderLinks(options);
      console.log(JSON.stringify(result, null, 2));
    });
}
