import { Router, type Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../env.js";

export const modelRouter: Router = Router();

// Known models map
const models: Record<
  string,
  { provider: "openai" | "anthropic" | "google"; providerModelId: string }
> = {
  // OpenAI models
  o1: { provider: "openai", providerModelId: "o1" },
  "o1-2024-12-17": { provider: "openai", providerModelId: "o1-2024-12-17" },
  "o3-mini": { provider: "openai", providerModelId: "o3-mini" },
  "o3-mini-2025-01-31": {
    provider: "openai",
    providerModelId: "o3-mini-2025-01-31",
  },
  o3: { provider: "openai", providerModelId: "o3" },
  "o3-2025-04-16": { provider: "openai", providerModelId: "o3-2025-04-16" },
  "gpt-4.1": { provider: "openai", providerModelId: "gpt-4.1" },
  "gpt-4.1-2025-04-14": {
    provider: "openai",
    providerModelId: "gpt-4.1-2025-04-14",
  },
  "gpt-4.1-mini": { provider: "openai", providerModelId: "gpt-4.1-mini" },
  "gpt-4.1-mini-2025-04-14": {
    provider: "openai",
    providerModelId: "gpt-4.1-mini-2025-04-14",
  },
  "gpt-4.1-nano": { provider: "openai", providerModelId: "gpt-4.1-nano" },
  "gpt-4.1-nano-2025-04-14": {
    provider: "openai",
    providerModelId: "gpt-4.1-nano-2025-04-14",
  },
  "gpt-4o": { provider: "openai", providerModelId: "gpt-4o" },
  "gpt-4o-2024-05-13": {
    provider: "openai",
    providerModelId: "gpt-4o-2024-05-13",
  },
  "gpt-4o-2024-08-06": {
    provider: "openai",
    providerModelId: "gpt-4o-2024-08-06",
  },
  "gpt-4o-2024-11-20": {
    provider: "openai",
    providerModelId: "gpt-4o-2024-11-20",
  },
  "gpt-4o-mini": { provider: "openai", providerModelId: "gpt-4o-mini" },
  "gpt-4o-mini-2024-07-18": {
    provider: "openai",
    providerModelId: "gpt-4o-mini-2024-07-18",
  },
  "gpt-4-turbo": { provider: "openai", providerModelId: "gpt-4-turbo" },
  "gpt-4-turbo-2024-04-09": {
    provider: "openai",
    providerModelId: "gpt-4-turbo-2024-04-09",
  },
  "gpt-4": { provider: "openai", providerModelId: "gpt-4" },
  "gpt-4-0613": { provider: "openai", providerModelId: "gpt-4-0613" },
  "gpt-4.5-preview": { provider: "openai", providerModelId: "gpt-4.5-preview" },
  "gpt-4.5-preview-2025-02-27": {
    provider: "openai",
    providerModelId: "gpt-4.5-preview-2025-02-27",
  },
  "gpt-3.5-turbo-0125": {
    provider: "openai",
    providerModelId: "gpt-3.5-turbo-0125",
  },
  "gpt-3.5-turbo": { provider: "openai", providerModelId: "gpt-3.5-turbo" },
  "gpt-3.5-turbo-1106": {
    provider: "openai",
    providerModelId: "gpt-3.5-turbo-1106",
  },
  "chatgpt-4o-latest": {
    provider: "openai",
    providerModelId: "chatgpt-4o-latest",
  },
  "gpt-5": { provider: "openai", providerModelId: "gpt-5" },
  "gpt-5-2025-08-07": {
    provider: "openai",
    providerModelId: "gpt-5-2025-08-07",
  },
  "gpt-5-mini": { provider: "openai", providerModelId: "gpt-5-mini" },
  "gpt-5-mini-2025-08-07": {
    provider: "openai",
    providerModelId: "gpt-5-mini-2025-08-07",
  },
  "gpt-5-nano": { provider: "openai", providerModelId: "gpt-5-nano" },
  "gpt-5-nano-2025-08-07": {
    provider: "openai",
    providerModelId: "gpt-5-nano-2025-08-07",
  },
  "gpt-5-chat-latest": {
    provider: "openai",
    providerModelId: "gpt-5-chat-latest",
  },
  // Anthropic models
  "claude-opus-4-20250514": {
    provider: "anthropic",
    providerModelId: "claude-opus-4-20250514",
  },
  "claude-sonnet-4-20250514": {
    provider: "anthropic",
    providerModelId: "claude-sonnet-4-20250514",
  },
  "claude-3-7-sonnet-20250219": {
    provider: "anthropic",
    providerModelId: "claude-3-7-sonnet-20250219",
  },
  "claude-3-5-sonnet-latest": {
    provider: "anthropic",
    providerModelId: "claude-3-5-sonnet-latest",
  },
  "claude-3-5-sonnet-20241022": {
    provider: "anthropic",
    providerModelId: "claude-3-5-sonnet-20241022",
  },
  "claude-3-5-sonnet-20240620": {
    provider: "anthropic",
    providerModelId: "claude-3-5-sonnet-20240620",
  },
  "claude-3-5-haiku-latest": {
    provider: "anthropic",
    providerModelId: "claude-3-5-haiku-latest",
  },
  "claude-3-5-haiku-20241022": {
    provider: "anthropic",
    providerModelId: "claude-3-5-haiku-20241022",
  },
  "claude-3-opus-latest": {
    provider: "anthropic",
    providerModelId: "claude-3-opus-latest",
  },
  "claude-3-opus-20240229": {
    provider: "anthropic",
    providerModelId: "claude-3-opus-20240229",
  },
  "claude-3-sonnet-20240229": {
    provider: "anthropic",
    providerModelId: "claude-3-sonnet-20240229",
  },
  "claude-3-haiku-20240307": {
    provider: "anthropic",
    providerModelId: "claude-3-haiku-20240307",
  },
  // Google models
  "gemini-1.5-flash": {
    provider: "google",
    providerModelId: "gemini-1.5-flash",
  },
  "gemini-1.5-flash-latest": {
    provider: "google",
    providerModelId: "gemini-1.5-flash-latest",
  },
  "gemini-1.5-flash-001": {
    provider: "google",
    providerModelId: "gemini-1.5-flash-001",
  },
  "gemini-1.5-flash-002": {
    provider: "google",
    providerModelId: "gemini-1.5-flash-002",
  },
  "gemini-1.5-flash-8b": {
    provider: "google",
    providerModelId: "gemini-1.5-flash-8b",
  },
  "gemini-1.5-flash-8b-latest": {
    provider: "google",
    providerModelId: "gemini-1.5-flash-8b-latest",
  },
  "gemini-1.5-flash-8b-001": {
    provider: "google",
    providerModelId: "gemini-1.5-flash-8b-001",
  },
  "gemini-1.5-pro": { provider: "google", providerModelId: "gemini-1.5-pro" },
  "gemini-1.5-pro-latest": {
    provider: "google",
    providerModelId: "gemini-1.5-pro-latest",
  },
  "gemini-1.5-pro-001": {
    provider: "google",
    providerModelId: "gemini-1.5-pro-001",
  },
  "gemini-1.5-pro-002": {
    provider: "google",
    providerModelId: "gemini-1.5-pro-002",
  },
  "gemini-2.0-flash": {
    provider: "google",
    providerModelId: "gemini-2.0-flash",
  },
  "gemini-2.0-flash-001": {
    provider: "google",
    providerModelId: "gemini-2.0-flash-001",
  },
  "gemini-2.0-flash-live-001": {
    provider: "google",
    providerModelId: "gemini-2.0-flash-live-001",
  },
  "gemini-2.0-flash-lite": {
    provider: "google",
    providerModelId: "gemini-2.0-flash-lite",
  },
  "gemini-2.0-pro-exp-02-05": {
    provider: "google",
    providerModelId: "gemini-2.0-pro-exp-02-05",
  },
  "gemini-2.0-flash-thinking-exp-01-21": {
    provider: "google",
    providerModelId: "gemini-2.0-flash-thinking-exp-01-21",
  },
  "gemini-2.0-flash-exp": {
    provider: "google",
    providerModelId: "gemini-2.0-flash-exp",
  },
  "gemini-2.5-pro": { provider: "google", providerModelId: "gemini-2.5-pro" },
  "gemini-2.5-flash": {
    provider: "google",
    providerModelId: "gemini-2.5-flash",
  },
  "gemini-2.5-flash-lite": {
    provider: "google",
    providerModelId: "gemini-2.5-flash-lite",
  },
  "gemini-2.5-flash-image-preview": {
    provider: "google",
    providerModelId: "gemini-2.5-flash-image-preview",
  },
  "gemini-3-flash-preview": {
    provider: "google",
    providerModelId: "gemini-3-flash-preview",
  },
};

function getModel(req: Request) {
  let id = req.params.model_id;
  if (Array.isArray(id)) {
    id = id[0];
  }
  const m = models[id];
  if (!m)
    throw Object.assign(new Error(`Model not found: ${id}`), { status: 404 });
  return m;
}

modelRouter.use(
  "/:model_id/{*splat}",
  createProxyMiddleware({
    changeOrigin: true,
    secure: true,
    router(req) {
      const { provider } = getModel(req as Request);
      if (provider === "openai") return "https://api.openai.com/v1";
      if (provider === "anthropic") return "https://api.anthropic.com/v1";
      return "https://generativelanguage.googleapis.com/v1beta";
    },
    pathRewrite(_, req) {
      const parts = (req as Request).params.splat;
      let path = "";
      if (Array.isArray(parts)) {
        path = parts.join("/");
      } else {
        path = parts;
      }
      return "/" + path;
    },
    on: {
      proxyReq(proxyReq, req, _res) {
        const { provider } = getModel(req as Request);

        proxyReq.removeHeader("x-goog-api-key");
        proxyReq.removeHeader("Authorization");
        proxyReq.removeHeader("x-api-key");

        if (provider === "openai" && env.OPENAI_API_KEY) {
          proxyReq.setHeader("Authorization", `Bearer ${env.OPENAI_API_KEY}`);
        } else if (provider === "anthropic" && env.ANTHROPIC_API_KEY) {
          proxyReq.setHeader("x-api-key", env.ANTHROPIC_API_KEY);
        } else if (provider === "google" && env.GEMINI_API_KEY) {
          proxyReq.setHeader("x-goog-api-key", env.GEMINI_API_KEY);
        }
      },
    },
    // Increase timeouts to avoid premature 504s during long generations/streams
    proxyTimeout: 120_000,
    timeout: 120_000,
  })
);
