#!/usr/bin/env node
import {
  getProduct,
  getVariant,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";
import { ResourceType } from "@ubento/services.database/billing";
import { env } from "../../src/env.js";
import prisma from "../../src/lib/prisma.js";
import {
  createOffer,
  createProduct,
  getOfferByCode,
  getProductByCode,
  updateOffer,
  updateProduct,
  upsertProviderLink,
} from "../../src/routines/catalog.js";
import { catalog } from "./catalog.js";

interface SyncStats {
  productsCreated: number;
  productsUpdated: number;
  featuresCreated: number;
  featuresUpdated: number;
  offersCreated: number;
  offersUpdated: number;
  linksUpserted: number;
  pricesUpdated: number;
}

lemonSqueezySetup({
  apiKey: env.LEMONSQUEEZY_API_KEY,
  onError: (error) => console.error("Error during LemonSqueezy setup", error),
});

async function syncCatalog(): Promise<SyncStats> {
  const stats: SyncStats = {
    productsCreated: 0,
    productsUpdated: 0,
    featuresCreated: 0,
    featuresUpdated: 0,
    offersCreated: 0,
    offersUpdated: 0,
    linksUpserted: 0,
    pricesUpdated: 0,
  };

  // Get catalog path from CLI argument or use default
  const args = process.argv.slice(2);
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  if (args.includes("--test")) {
    const url = new URL(dbUrl);
    url.pathname =
      url.pathname.split("/").slice(0, -1).join("/") + "/billing-service-test";
    process.env.DATABASE_URL = url.toString();
    console.log("🔄 Using test database");
  }

  console.log("🔄 Starting catalog sync...\n");

  // Sync products
  if (catalog && catalog.length > 0) {
    console.log(`📦 Syncing ${catalog.length} product(s)...`);
    for (const productData of catalog) {
      if (!productData.code || !productData.name) {
        console.log(`  ⚠️  Skipping product with missing code or name`);
        continue;
      }

      const existing = await getProductByCode(productData.code);
      if (existing) {
        // Update if changed
        if (
          existing.name !== productData.name ||
          existing.description !== productData.description ||
          existing.default_offer_code !== productData.default_offer_code
        ) {
          await updateProduct(existing.id, {
            name: productData.name,
            description: productData.description,
            default_offer_code: productData.default_offer_code,
          });
          stats.productsUpdated++;
          console.log(`  ✓ Updated product: ${productData.code}`);
        } else {
          console.log(`  - Product unchanged: ${productData.code}`);
        }
      } else {
        // Create new
        await createProduct({
          code: productData.code,
          name: productData.name,
          description: productData.description,
          default_offer_code: productData.default_offer_code,
        });
        stats.productsCreated++;
        console.log(`  ✓ Created product: ${productData.code}`);
      }

      // Sync product links
      if (productData.lsId) {
        console.log(`📦 Syncing product: ${productData.lsId}`);
        const productResult = await getProduct(productData.lsId);
        if (!productResult.data?.data) {
          console.log(productResult.error?.message);
          throw new Error(`Product not found for product ${productData.code}`);
        }
        const product = productResult.data.data;
        await upsertProviderLink({
          provider: "LEMON_SQUEEZY",
          provider_entity: "PRODUCT",
          provider_id: product.id,
          resource_type: ResourceType.PRODUCT,
          resource_code: productData.code,
          status: "ACTIVE",
          priority: 0,
        });
        stats.linksUpserted++;
      }

      // Sync nested offers
      if (productData.offers && productData.offers.length > 0) {
        for (const offerData of productData.offers) {
          if (!offerData.code || !offerData.name) {
            console.log(`  ⚠️  Skipping offer with missing code or name`);
            continue;
          }

          const existingOffer = await getOfferByCode(offerData.code);
          if (existingOffer) {
            // Update if changed
            const entitlementsChanged =
              JSON.stringify(existingOffer.entitlements) !==
              JSON.stringify(offerData.entitlements || []);
            if (
              existingOffer.name !== offerData.name ||
              existingOffer.description !== offerData.description ||
              existingOffer.active !== (offerData.active ?? true) ||
              existingOffer.product_code !== productData.code ||
              JSON.stringify(existingOffer.metadata) !==
                JSON.stringify(offerData.metadata) ||
              entitlementsChanged
            ) {
              await updateOffer(existingOffer.id, {
                name: offerData.name,
                description: offerData.description,
                active: offerData.active ?? true,
                product_code: productData.code,
                entitlements: offerData.entitlements as any,
                metadata: offerData.metadata,
              });
              stats.offersUpdated++;
              console.log(`  ✓ Updated offer: ${offerData.code}`);
            } else {
              console.log(`  - Offer unchanged: ${offerData.code}`);
            }
          } else {
            // Create new
            await createOffer({
              code: offerData.code,
              name: offerData.name,
              description: offerData.description,
              active: offerData.active ?? true,
              entitlements: offerData.entitlements as any,
              product_code: productData.code,
            });
            stats.offersCreated++;
            console.log(`  ✓ Created offer: ${offerData.code}`);
          }

          // Sync offer provider links (only if they have provider field)
          if (offerData.lsId) {
            const variantResult = await getVariant(offerData.lsId);
            if (!variantResult.data) {
              throw new Error(`Variant not found for offer ${offerData.code}`);
            }
            const variant = variantResult.data.data;

            await upsertProviderLink({
              provider: "LEMON_SQUEEZY",
              provider_entity: "PRODUCT_VARIANT",
              provider_id: offerData.lsId,
              resource_type: ResourceType.OFFER,
              resource_code: offerData.code,
              status: "ACTIVE",
              priority: 0,
            });
            stats.linksUpserted++;

            // sync price
            await prisma.offer.update({
              where: {
                code: offerData.code,
              },
              data: {
                price: variant.attributes.price,
                currency: "USD",
              },
            });
            stats.pricesUpdated++;
          }
        }
      }
    }
    console.log("");
  }

  return stats;
}

async function main() {
  try {
    const stats = await syncCatalog();

    console.log("✅ Catalog sync complete!\n");
    console.log("Summary:");
    console.log(
      `  Products: ${stats.productsCreated} created, ${stats.productsUpdated} updated`,
    );
    console.log(
      `  Offers: ${stats.offersCreated} created, ${stats.offersUpdated} updated`,
    );
    console.log(`  Provider Links: ${stats.linksUpserted} upserted`);
    console.log(`  Prices: ${stats.pricesUpdated} updated`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Catalog sync failed:");
    console.error(error);
    console.error("\nUsage: npx tsx scripts/catalog.ts [catalog-path]");
    console.error(
      "  catalog-path: Optional path to catalog.jsonc (defaults to ./catalog.jsonc)",
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
