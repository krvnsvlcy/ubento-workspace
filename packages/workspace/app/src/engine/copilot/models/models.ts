import { UbentoSession } from "@/engine/app/session";
import { UbentoService } from "@/services/ubento/ubento";
import { createOpenResponses } from "@ai-sdk/open-responses";
import { LanguageModelV3 } from "@ai-sdk/provider";

export const modelIds = {
  // OpenAI models
  gpt52: "openai/gpt-5.2",
  gpt52codex: "openai/gpt-5.2-codex",
  gpt5mini: "openai/gpt-5-mini",
  // Google models
  gemini3proPreview: "google/gemini-3-pro-preview",
  gemini3flash: "google/gemini-3-flash",
  gemini3flashLite: "google/gemini-3.1-flash-lite",
} as const;

export type LanguageModel = LanguageModelV3;

function createGatewayProxy({
  baseUrl,
  getToken,
  teamId,
}: {
  baseUrl: string;
  getToken: () => Promise<string>;
  teamId: string;
}) {
  const openResponses = createOpenResponses({
    name: "ubento-intelligence",
    url: new URL("/intelligence/gateway", baseUrl).toString(),
    fetch: async (url, options) => {
      const headers = new Headers(options?.headers);
      headers.set("authorization", `Bearer ${await getToken()}`);
      headers.set("ubento-team-id", teamId);
      return fetch(url, {
        ...options,
        headers,
      });
    },
  });

  return openResponses;
}

let gateway: ReturnType<typeof createGatewayProxy>;

export function getModel({
  modelId,
  ubento,
  session,
}: {
  modelId: string;
  session: UbentoSession;
  ubento: UbentoService;
}): LanguageModel {
  if (!gateway) {
    gateway = createGatewayProxy({
      teamId: session.teamId,
      baseUrl: ubento.sdk.intelligence.intelligenceClient.baseUrl,
      getToken: ubento.sdk.tokenManager.getToken,
    });
  }

  return gateway(modelId);
}

const modelDataUrl = "https://ai-gateway.vercel.sh/v1/models";
type ModelApiData = {
  type: "list";
  data: ModelData[];
};
type ModelData = {
  id: string;
  object: "model";
  created: number;
  released: number;
  owned_by: string;
  name: string;
  description: string;
  context_window: number;
  max_tokens: number;
  type: string;
  tags: string[];
  pricing: {
    input: string;
    output: string;
  };
};
let modelData: Record<string, ModelData> | null = null;

export async function getModelData(modelId: string): Promise<ModelData> {
  if (!modelData) {
    const response = await fetch(modelDataUrl);
    const data = (await response.json()) as ModelApiData;
    modelData = Object.fromEntries(data.data.map((model) => [model.id, model]));
  }
  const data = modelData[modelId];
  if (!data) {
    throw new Error(`Model data not found for model ID "${modelId}"`);
  }
  return data;
}
