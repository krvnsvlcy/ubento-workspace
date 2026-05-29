import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://docs.lemonsqueezy.com";
const OUTPUT_PATH = path.resolve(__dirname, "../../specs/lemonsqueezy.json");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

const RESOURCE_PAGES = [
  "users/the-user-object",
  "stores/the-store-object",
  "customers/the-customer-object",
  "products/the-product-object",
  "variants/the-variant-object",
  "prices/the-price-object",
  "files/the-file-object",
  "orders/the-order-object",
  "order-items/the-order-item-object",
  "subscriptions/the-subscription-object",
  "subscription-invoices/the-subscription-invoice-object",
  "subscription-items/the-subscription-item-object",
  "usage-records/the-usage-record-object",
  "discounts/the-discount-object",
  "discount-redemptions/the-discount-redemption-object",
  "license-keys/the-license-key-object",
  "license-key-instances/the-license-key-instance-object",
  "checkouts/the-checkout-object",
  "webhooks/the-webhook-object",
  "affiliates/the-affiliate-object",
];

const ENDPOINT_PAGES = [
  "users/retrieve-user",
  "stores/retrieve-store",
  "stores/list-all-stores",
  "customers/create-customer",
  "customers/retrieve-customer",
  "customers/update-customer",
  "customers/list-all-customers",
  "products/retrieve-product",
  "products/list-all-products",
  "variants/retrieve-variant",
  "variants/list-all-variants",
  "prices/retrieve-price",
  "prices/list-all-prices",
  "files/retrieve-file",
  "files/list-all-files",
  "orders/retrieve-order",
  "orders/list-all-orders",
  "orders/generate-order-invoice",
  "orders/issue-refund",
  "order-items/retrieve-order-item",
  "order-items/list-all-order-items",
  "subscriptions/retrieve-subscription",
  "subscriptions/update-subscription",
  "subscriptions/list-all-subscriptions",
  "subscriptions/cancel-subscription",
  "subscription-invoices/retrieve-subscription-invoice",
  "subscription-invoices/list-all-subscription-invoices",
  "subscription-invoices/generate-subscription-invoice",
  "subscription-invoices/issue-refund",
  "subscription-items/retrieve-subscription-item",
  "subscription-items/update-subscription-item",
  "subscription-items/list-all-subscription-items",
  "subscription-items/retrieve-subscription-item-current-usage",
  "usage-records/create-usage-record",
  "usage-records/retrieve-usage-record",
  "usage-records/list-all-usage-records",
  "discounts/create-discount",
  "discounts/retrieve-discount",
  "discounts/delete-discount",
  "discounts/list-all-discounts",
  "discount-redemptions/retrieve-discount-redemption",
  "discount-redemptions/list-all-discount-redemptions",
  "license-keys/retrieve-license-key",
  "license-keys/update-license-key",
  "license-keys/list-all-license-keys",
  "license-key-instances/retrieve-license-key-instance",
  "license-key-instances/list-all-license-key-instances",
  "checkouts/create-checkout",
  "checkouts/retrieve-checkout",
  "checkouts/list-all-checkouts",
  "webhooks/create-webhook",
  "webhooks/retrieve-webhook",
  "webhooks/update-webhook",
  "webhooks/delete-webhook",
  "webhooks/list-all-webhooks",
  "license-api/activate-license-key",
  "license-api/deactivate-license-key",
  "license-api/validate-license-key",
  "affiliates/retrieve-affiliate",
  "affiliates/list-all-affiliates",
];

// Helper to fetch and reconstruct Next.js RSC/MDX stream
async function fetchMdx(subpath: string): Promise<string> {
  const url = `${BASE_URL}/api/${subpath}`;
  const response = await axios.get(url, { headers: HEADERS });
  const html = response.data;

  const pushRe = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
  let fullStream = "";
  let match;
  while ((match = pushRe.exec(html)) !== null) {
    fullStream += match[1];
  }

  // Re-decode the whole stream
  return fullStream
    .replace(/\\"/g, "\"")
    .replace(/\\n/g, "\n")
    .replace(/\\\\/g, "\\")
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/\\u0027/g, "'");
}

// Safely parse JSON/JS object examples (which might contain comments/trailing commas)
function parseLooseJson(str: string): any {
  try {
    return JSON.parse(str);
  } catch {
    try {
      // Loose parse using Function
      return new Function(`return (${str})`)();
    } catch {
      return null;
    }
  }
}

// Convert JSON object structure to OpenAPI schemas
function jsonToSchema(val: any): any {
  if (val === null) return { type: "string", nullable: true };
  if (Array.isArray(val)) {
    return {
      type: "array",
      items: val.length > 0 ? jsonToSchema(val[0]) : { type: "string" },
    };
  }
  if (typeof val === "object") {
    const properties: Record<string, any> = {};
    const required: string[] = [];
    for (const [k, v] of Object.entries(val)) {
      properties[k] = jsonToSchema(v);
      if (v !== null) {
        required.push(k);
      }
    }
    return {
      type: "object",
      properties,
      ...(required.length > 0 ? { required } : {}),
    };
  }
  return { type: typeof val };
}

async function main() {
  console.log("🚀 Starting Lemon Squeezy API Reference Scraper...");

  const openapi: any = {
    openapi: "3.0.0",
    info: {
      title: "Lemon Squeezy API",
      description: "Sell digital products, manage subscriptions, and handle licensing.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://api.lemonsqueezy.com",
      },
    ],
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  };

  // 1. Scrape Resource Objects to build schemas
  console.log("\n📦 Scraping Resource Objects...");
  for (const subpath of RESOURCE_PAGES) {
    try {
      console.log(`- Crawling: ${subpath}`);
      const mdx = await fetchMdx(subpath);

      // Extract title/name
      const titleMatch = mdx.match(/title:\s*([^\n]+)/);
      if (!titleMatch) continue;
      const resourceName = titleMatch[1]
        .replace(/The/i, "")
        .replace(/Object/i, "")
        .trim()
        .replace(/\s+/g, "");

      // Extract response JSON example
      const jsonRe = /```json[\s\S]*?\n([\s\S]*?)\n```/g;
      let jsonMatch;
      let jsonStr = "";
      while ((jsonMatch = jsonRe.exec(mdx)) !== null) {
        if (jsonMatch[1].includes("\"type\"") || jsonMatch[1].includes("\"attributes\"")) {
          jsonStr = jsonMatch[1];
          break;
        }
      }

      if (jsonStr) {
        const obj = parseLooseJson(jsonStr);
        if (obj) {
          openapi.components.schemas[resourceName] = jsonToSchema(obj);
          console.log(`  ✅ Extracted Schema: ${resourceName}`);
        }
      }
    } catch (e: any) {
      console.error(`  ❌ Error processing resource ${subpath}:`, e.message);
    }
  }

  // 2. Scrape Endpoints
  console.log("\n📡 Scraping Endpoints...");
  for (const subpath of ENDPOINT_PAGES) {
    try {
      console.log(`- Crawling: ${subpath}`);
      const mdx = await fetchMdx(subpath);

      // Extract HTTP method and path
      let method = "";
      let rawPath = "";

      const apiTitleMatch = mdx.match(/<APITitle\s+method=\x27([^\x27]+)\x27[^>]*>([\s\S]*?)<\/APITitle>/) ||
                           mdx.match(/<APITitle\s+method="([^"]+)"[^>]*>([\s\S]*?)<\/APITitle>/);

      if (apiTitleMatch) {
        method = apiTitleMatch[1].toLowerCase();
        rawPath = apiTitleMatch[2].trim();
      } else {
        // Fallback: extract from curl command if APITitle is not found
        const curlRe = /curl\s+([\s\S]*?)(```|\n\n|$)/;
        const curlMatch = mdx.match(curlRe);
        if (curlMatch) {
          const curlCode = curlMatch[1];
          const methodMatch = curlCode.match(/-X\s+["\x27]?(GET|POST|PATCH|PUT|DELETE)["\x27]?/i);
          method = methodMatch ? methodMatch[1].toLowerCase() : (curlCode.includes("-d ") ? "post" : "get");

          const urlMatch = curlCode.match(/https:\/\/api\.lemonsqueezy\.com(\/v1\/[a-zA-Z0-9_\-\/]+)/);
          if (urlMatch) {
            rawPath = urlMatch[1];
          }
        }
      }

      if (!method || !rawPath) {
        console.warn(`  ⚠️ Could not find APITitle or Curl Example on: ${subpath}`);
        continue;
      }

      // Normalize path parameters (:id -> {id})
      const parameters: any[] = [];
      const paramMatches = rawPath.match(/:[a-zA-Z0-9_]+/g);
      if (paramMatches) {
        for (const p of paramMatches) {
          const paramName = p.slice(1);
          rawPath = rawPath.replace(p, `{${paramName}}`);
          parameters.push({
            name: paramName,
            in: "path",
            required: true,
            schema: { type: "string" },
          });
        }
      }

      // Extract description
      let description = "";
      const descMatch = mdx.match(/<\/APITitle>\s*\n\s*\n([\s\S]*?)\n\s*\n/);
      if (descMatch) {
        description = descMatch[1].trim();
      } else {
        // Fallback description from title
        const titleMatch = mdx.match(/title:\s*([^\n]+)/);
        description = titleMatch ? titleMatch[1].trim() : "";
      }

      // Extract response JSON example
      const jsonRe = /```json[\s\S]*?\n([\s\S]*?)\n```/g;
      let jsonMatch;
      let responseJsonStr = "";
      while ((jsonMatch = jsonRe.exec(mdx)) !== null) {
        if (jsonMatch[1].includes("\"data\"") || jsonMatch[1].includes("\"jsonapi\"") || jsonMatch[1].includes("\"activated\"")) {
          responseJsonStr = jsonMatch[1];
          break;
        }
      }

      const responses: any = {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: responseJsonStr ? jsonToSchema(parseLooseJson(responseJsonStr)) : { type: "object" },
            },
          },
        },
      };

      // Extract request body for POST/PATCH
      let requestBody: any = undefined;
      if (["post", "patch", "put"].includes(method)) {
        const curlRe = /```shell[\s\S]*?\n([\s\S]*?)\n```/g;
        let curlMatch;
        let requestJsonStr = "";
        const formParams: Record<string, string> = {};

        while ((curlMatch = curlRe.exec(mdx)) !== null) {
          const curlCode = curlMatch[1];

          // Check for JSON body payload
          const bodyMatch = curlCode.match(/-d\s+\$?\x27([\s\S]*?)\x27/) ||
                            curlCode.match(/-d\s+\$?`([\s\S]*?)`/) ||
                            curlCode.match(/-d\s+\$?"([\s\S]*?)"/);
          if (bodyMatch) {
            const potentialJson = bodyMatch[1].trim();
            if (potentialJson.startsWith("{")) {
              requestJsonStr = potentialJson;
              break;
            }
          }

          // Otherwise, look for form data -d "key=value"
          const formMatches = curlCode.matchAll(/-d\s+["\x27]([^"\x27=]+)=([^"\x27]+)["\x27]/g);
          for (const fm of formMatches) {
            formParams[fm[1]] = fm[2];
          }
        }

        if (requestJsonStr) {
          const requestBodyObj = parseLooseJson(requestJsonStr);
          if (requestBodyObj) {
            requestBody = {
              required: true,
              content: {
                "application/json": {
                  schema: jsonToSchema(requestBodyObj),
                },
              },
            };
          }
        } else if (Object.keys(formParams).length > 0) {
          const properties: Record<string, any> = {};
          const required: string[] = [];
          for (const [k, v] of Object.entries(formParams)) {
            properties[k] = { type: "string", example: v };
            required.push(k);
          }
          requestBody = {
            required: true,
            content: {
              "application/x-www-form-urlencoded": {
                schema: {
                  type: "object",
                  properties,
                  required,
                },
              },
            },
          };
        }
      }

      // Add query parameters for lists
      if (method === "get" && !rawPath.includes("{")) {
        parameters.push(
          { name: "page[number]", in: "query", schema: { type: "integer" } },
          { name: "page[size]", in: "query", schema: { type: "integer" } },
          { name: "sort", in: "query", schema: { type: "string" } }
        );
      }

      // Ensure path exists
      if (!openapi.paths[rawPath]) {
        openapi.paths[rawPath] = {};
      }

      // Extract title
      const titleMatch = mdx.match(/title:\s*([^\n]+)/);
      const opId = subpath.replace(/\//g, "-").replace(/-[a-z]/g, (match) => match.slice(1).toUpperCase());

      openapi.paths[rawPath][method] = {
        operationId: opId,
        summary: titleMatch ? titleMatch[1].trim() : opId,
        description,
        parameters: parameters.length > 0 ? parameters : undefined,
        requestBody,
        responses,
      };

      console.log(`  ✅ Extracted Endpoint: ${method.toUpperCase()} ${rawPath}`);
    } catch (e: any) {
      console.error(`  ❌ Error processing endpoint ${subpath}:`, e.message);
    }
  }

  // Ensure output directory exists
  const specsDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(specsDir)) {
    fs.mkdirSync(specsDir, { recursive: true });
  }

  // Write specification to file
  console.log(`\n💾 Saving final OpenAPI spec to ${OUTPUT_PATH}...`);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(openapi, null, 2), "utf8");

  console.log(`\n✨ Successfully generated Lemon Squeezy OpenAPI spec at ${OUTPUT_PATH}!`);
  console.log(`📈 Stats: ${Object.keys(openapi.paths).length} paths, ${Object.keys(openapi.components.schemas).length} schemas.`);
}

main().catch(console.error);
