import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { createService } from "@ubento/services.toolkit";
import { json } from "express";
import { env } from "./env.js";
import checkoutRouter from "./routes/checkout.js";
import entitlementsRouter from "./routes/entitlements.js";
import { lemonsqueezyWebhookRouter } from "./routes/lemonsqueezy.js";
import offersRouter from "./routes/offers.js";
import orderRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import subscriptionRouter from "./routes/subscriptions.js";
import usageRouter from "./routes/usage.js";
import webhooksRouter from "./routes/webhooks.js";
import { spec } from "./spec/spec.js";

const service = createService({
  name: "billing-service",
  port: env.PORT,
  auth: false,
  spec,
  bodyParser: false,
});

// Webhook endpoint (no auth)
service.app.use("/billing/webhooks/lemonsqueezy", lemonsqueezyWebhookRouter);

// Apply authentication to all other routes
// service.app.use(
//   createAuthenticationMiddleware({
//     issuers: [], // Provide empty issuers if needed or remove if optional
//     audience: env.API_AUDIENCE,
//   }),
// );
// Add JSON body parser
service.app.use(json());

service.app.use("/billing/products", productsRouter);
service.app.use("/billing/offers", offersRouter);
service.app.use("/billing/checkout", checkoutRouter);
service.app.use("/billing/orders", orderRouter);
service.app.use("/billing/subscriptions", subscriptionRouter);
service.app.use("/billing/usage", usageRouter);
service.app.use("/billing/entitlements", entitlementsRouter);
service.app.use("/billing/admin/webhooks", webhooksRouter);

// Setup LemonSqueezy
lemonSqueezySetup({
  apiKey: env.LEMONSQUEEZY_API_KEY,
  onError: (error) => console.error("Error during LemonSqueezy setup", error),
});

// Start service
service.start();
console.log("Service started on port", env.PORT);
