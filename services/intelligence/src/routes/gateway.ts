import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { TooManyRequestsError } from "@ubento/services.toolkit";
import express, { Request, Response } from "express";
import https from "https";
import { env } from "../env.js";
import { intelligenceUsageProxy } from "../libs/bento.js";
import prisma from "../prisma.js";

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

  res.locals.orgId = teamId;

  if (bypassOrgs.includes(teamId)) {
    console.log("Bypassing usage reservation");
    next();
  } else {
    try {
      const reservationKey = await intelligenceUsageProxy.reserve(
        teamId,
        model.creditRate,
      );
      res.locals.usageRef = reservationKey;
      next();
    } catch (error) {
      console.error("Failed to reserve usage:", error);
      next(new TooManyRequestsError(`AI usage exceeded`));
    }
  }
});

gatewayRouter.use((req: Request, res: Response) => {
  const { usageRef: ref, orgId } = res.locals;
  const teamId = (req.headers["ubento-team-id"] ||
    orgId ||
    "unknown") as string;
  const workspaceId = req.headers["ubento-workspace-id"] as string | undefined;

  const modelId = (req.body?.model || "unknown") as string;
  const model = models[modelId];
  const creditRate = model?.creditRate || 1;
  const provider = modelId.split("/")[0] || "unknown";

  const startTime = Date.now();

  const logRequestToDb = async ({
    statusCode,
    success,
    usage,
    rawParsedBody,
  }: {
    statusCode: number;
    success: boolean;
    usage: any;
    rawParsedBody?: any;
  }) => {
    const latency = Date.now() - startTime;
    try {
      await prisma.request.create({
        data: {
          id:
            rawParsedBody?.id ||
            makeEntityId({
              code: ubentoEntities.intelligenceRequest.code,
              bareId: generateBareId(),
            }),
          team_id: teamId,
          workspace_id: workspaceId ?? null,
          provider,
          model: modelId,
          latency_ms: latency,
          status_code: statusCode,
          success,

          // Normalized Token metrics
          prompt_tokens: usage?.prompt_tokens ?? null,
          cached_tokens: usage?.cached_tokens ?? null,
          reasoning_tokens: usage?.thinking_tokens ?? null,
          response_tokens: usage?.response_tokens ?? null,
          total_tokens: usage?.total_tokens ?? null,

          // Payloads & Metadata split out
          request_data: req.body || null,
          response_data: rawParsedBody?.output || rawParsedBody || null,
          gateway_metadata: rawParsedBody?.provider_metadata?.gateway || null,

          // High-precision pricing metric parsed out of marketCost
          estimated_cost: usage?.estimated_cost_usd ?? null,
        },
      });
    } catch (dbErr) {
      console.error("Failed to store request log in DB:", dbErr);
    }
  };

  const bodyData = JSON.stringify(req.body || {});

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

  const proxyReq = https.request(options, (proxyRes) => {
    const isSuccess =
      proxyRes.statusCode &&
      proxyRes.statusCode >= 200 &&
      proxyRes.statusCode < 300;

    if (ref && orgId && !bypassOrgs.includes(orgId)) {
      if (isSuccess) {
        intelligenceUsageProxy.commit(ref, creditRate).catch(console.error);
      } else {
        intelligenceUsageProxy.release(ref).catch(console.error);
      }
    }

    res.status(proxyRes.statusCode || 500);

    Object.entries(proxyRes.headers).forEach(([key, value]) => {
      if (
        value &&
        !["transfer-encoding", "content-length", "connection"].includes(key)
      ) {
        res.setHeader(key, value);
      }
    });

    const chunks: Buffer[] = [];
    proxyRes.on("data", (chunk) => {
      chunks.push(chunk);
    });

    proxyRes.on("end", () => {
      const responseBody = Buffer.concat(chunks).toString("utf8");
      let usage: any = null;
      let rawParsedBody: any = null;

      const contentType = proxyRes.headers["content-type"] || "";
      if (contentType.includes("text/event-stream")) {
        const lines = responseBody.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            if (dataStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(dataStr);
              rawParsedBody = parsed;
              if (parsed.usage) {
                usage = {
                  prompt_tokens:
                    parsed.usage.input_tokens ??
                    parsed.usage.prompt_tokens ??
                    usage?.prompt_tokens,
                  response_tokens:
                    parsed.usage.output_tokens ??
                    parsed.usage.completion_tokens ??
                    usage?.response_tokens,
                  total_tokens:
                    parsed.usage.total_tokens ?? usage?.total_tokens,
                  estimated_cost_usd: parsed.provider_metadata?.gateway
                    ?.marketCost
                    ? parseFloat(parsed.provider_metadata.gateway.marketCost)
                    : (usage?.estimated_cost_usd ?? null),
                };

                const inputDetails =
                  parsed.usage.input_tokens_details ||
                  parsed.usage.prompt_tokens_details;
                if (inputDetails) {
                  usage.cached_tokens =
                    inputDetails.cached_tokens ?? usage?.cached_tokens;
                }

                const outputDetails =
                  parsed.usage.output_tokens_details ||
                  parsed.usage.completion_tokens_details;
                if (outputDetails) {
                  usage.thinking_tokens =
                    outputDetails.reasoning_tokens ?? usage?.thinking_tokens;
                }
              }
            } catch (e) {
              // Ignore chunk parse issues
            }
          }
        }
      } else {
        try {
          const parsed = JSON.parse(responseBody);
          rawParsedBody = parsed;
          if (parsed.usage) {
            usage = {
              prompt_tokens:
                parsed.usage.input_tokens ?? parsed.usage.prompt_tokens ?? null,
              response_tokens:
                parsed.usage.output_tokens ??
                parsed.usage.completion_tokens ??
                null,
              total_tokens: parsed.usage.total_tokens ?? null,
              estimated_cost_usd: parsed.provider_metadata?.gateway?.marketCost
                ? parseFloat(parsed.provider_metadata.gateway.marketCost)
                : null,
            };

            const inputDetails =
              parsed.usage.input_tokens_details ||
              parsed.usage.prompt_tokens_details;
            if (inputDetails) {
              usage.cached_tokens = inputDetails.cached_tokens ?? null;
            }

            const outputDetails =
              parsed.usage.output_tokens_details ||
              parsed.usage.completion_tokens_details;
            if (outputDetails) {
              usage.thinking_tokens = outputDetails.reasoning_tokens ?? null;
            }
          }
        } catch (e) {
          // Ignore
        }
      }

      logRequestToDb({
        statusCode: proxyRes.statusCode || 200,
        success: !!isSuccess,
        usage,
        rawParsedBody,
      });
    });

    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    console.error("Proxy Error:", err);
    if (ref && orgId && !bypassOrgs.includes(orgId)) {
      intelligenceUsageProxy.release(ref).catch(console.error);
    }
    if (!res.headersSent) {
      res.status(502).json({ error: "Bad Gateway" });
    }

    logRequestToDb({
      statusCode: 502,
      success: false,
      usage: null,
      rawParsedBody: { error: err.message },
    });
  });

  proxyReq.write(bodyData);
  proxyReq.end();
});
