import crypto from "crypto";
import express, { Request, Response } from "express";
import https from "https";
import { env } from "../env.js";

const models: Record<
  string,
  {
    creditRate: number;
  }
> = {
  // Gemini
  "google/gemini-3.1-flash-lite": {
    creditRate: 1, // 0.5, 3
  },
  "google/gemini-3-flash": {
    creditRate: 1, // 0.5, 3
  },
  "google/gemini-3-pro-preview": {
    creditRate: 4, // 2, 12
  },
  // OpenAI
  "openai/gpt-5.2": {
    creditRate: 4, // 0.75, 14
  },
  "openai/gpt-5.2-codex": {
    creditRate: 4, // 0.75, 14
  },
  "openai/gpt-5-mini": {
    creditRate: 0.5, // 0.25, 2
  },
};

const bypassOrgs = (env.BYPASS_USAGE_ORGS || "")
  .split(",")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

export const gatewayRouter: express.Router = express.Router();

gatewayRouter.use(express.json({ limit: "10mb" }));
gatewayRouter.use(async (req, res, next) => {
  const teamId = req.headers["ubento-team-id"] as string;
  if (!teamId) {
    res.status(400).json({ error: "Missing ubento-team-id header" });
    return;
  }

  const modelId = req.body?.model;
  if (!modelId) {
    res.status(400).json({ error: "Missing model in body" });
    return;
  }

  const model = models[modelId];
  if (!model) {
    res.status(403).json({ error: "Model not supported" });
    return;
  }

  const ref = crypto.randomUUID();
  res.locals.usageRef = ref;
  res.locals.orgId = teamId;

  if (bypassOrgs.includes(teamId)) {
    console.log("Bypassing usage reservation");
    next();
  } else {
    // try {
    //   const result = await bento.billing.reserveUsage({
    //     organization_id: orgId,
    //     code: ubentoFeatures.ai.credits.code,
    //     amount: model.creditRate,
    //     note: "Model usage",
    //     duration: 300_000, // 5 minutes
    //     ref,
    //   });
    //   if (!result.success) {
    //     console.log(result.message);
    //     next(new TooManyRequestsError(`AI usage exeeded`));
    //   }
    next();
    // } catch (error) {
    //   console.error("Failed to reserve usage:", error);
    //   next(new TooManyRequestsError(`AI usage exeeded`));
    // }
  }
});

gatewayRouter.use((req: Request, res: Response) => {
  const { usageRef: ref, orgId } = res.locals;

  // 1. Prepare the body data
  // Since req.body is already parsed, we must stringify it back to JSON
  const bodyData = JSON.stringify(req.body || {});

  // 2. Configure the upstream request options
  const options = {
    hostname: "ai-gateway.vercel.sh",
    port: 443,
    path: "/v1/responses",
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(bodyData),
      host: "ai-gateway.vercel.sh",
      authorization: `Bearer ${env.AI_GATEWAY_API_KEY}`,
    },
  };

  console.log("Proxying request to", options.hostname, options.path);

  // 3. Create the raw proxy request
  const proxyReq = https.request(options, (proxyRes) => {
    // --- Billing Logic ---
    const isSuccess =
      proxyRes.statusCode &&
      proxyRes.statusCode >= 200 &&
      proxyRes.statusCode < 300;

    if (ref && orgId && !bypassOrgs.includes(orgId)) {
      if (isSuccess) {
        // bento.billing
        //   .commitUsageHold({ organization_id: orgId, ref })
        //   .catch(console.error);
      } else {
        // bento.billing
        //   .releaseUsageHold({ organization_id: orgId, ref })
        //   .catch(console.error);
      }
    }

    // --- Forwarding Response ---
    res.status(proxyRes.statusCode || 500);

    // Forward headers
    Object.entries(proxyRes.headers).forEach(([key, value]) => {
      // Filter out headers that might confuse the client or are managed by Node/Express
      if (
        value &&
        !["transfer-encoding", "content-length", "connection"].includes(key)
      ) {
        res.setHeader(key, value);
      }
    });

    // Pipe the response stream directly to the client
    proxyRes.pipe(res);
  });

  // 4. Error Handling
  proxyReq.on("error", (err) => {
    console.error("Proxy Error:", err);
    if (ref && orgId && !bypassOrgs.includes(orgId)) {
      // bento.billing
      //   .releaseUsageHold({ organization_id: orgId, ref })
      //   .catch(console.error);
    }
    if (!res.headersSent) {
      res.status(502).json({ error: "Bad Gateway" });
    }
  });

  // 5. Write the body and end the request
  // We use .write() instead of .pipe() because we are sending a string/buffer
  proxyReq.write(bodyData);
  proxyReq.end();
});
