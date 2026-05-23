import { ubentoFeatures, ubentoProducts } from "@ubento/services.primitives";
import { env } from "../../src/env.js";
import { Entitlement } from "../../src/routines/entitlements/entitlements.js";

export type OfferUiFeatureData = {
  icon: string;
  name: string;
  value:
    | string
    | boolean
    | {
        type: "quota";
        feature_code: string;
        unit:
          | "storage-mb"
          | "ai-credit"
          | "build-run"
          | "seat"
          | "vertex-request";
      };
};
export type OfferMetadata = {
  ui?: {
    features: OfferUiFeatureData[];
  };
};

interface CatalogProduct {
  code: string;
  name: string;
  description?: string;
  default_offer_code?: string;
  offers?: CatalogOffer[];
  lsId?: string;
}

interface CatalogOffer {
  code: string;
  name: string;
  description?: string;
  active?: boolean;
  entitlements?: Entitlement[];
  lsId?: string;
  metadata?: OfferMetadata;
}

export type Catalog = CatalogProduct[];

type Ids = {
  products: {
    ubento: string;
    aiCreditPack: string;
  };
  offers: {
    ubentoHobby: string;
    ubentoPro: string;
    aiCreditPack: string;
  };
};
const testIds: Ids = {
  products: {
    ubento: "650481",
    aiCreditPack: "650500",
  },
  offers: {
    ubentoHobby: "",
    ubentoPro: "1021421",
    aiCreditPack: "1021423",
  },
};
const prodIds: Ids = {
  products: {
    ubento: "1078588",
    aiCreditPack: "1078707",
  },
  offers: {
    ubentoHobby: "",
    ubentoPro: "1690651",
    aiCreditPack: "1690827",
  },
};
const ids = env.NODE_ENV === "production" ? prodIds : testIds;

export const catalog: Catalog = [
  {
    code: ubentoProducts.ubento.code,
    name: ubentoProducts.ubento.name,
    description: ubentoProducts.ubento.description,
    default_offer_code: "ubento.hobby",
    lsId: ids.products.ubento,
    offers: [
      {
        code: "ubento.hobby",
        name: "Hobby",
        description: "For experimenting and personal use.",
        active: true,
        entitlements: [
          // Ai
          {
            feature_code: ubentoFeatures.ai.weeklyCredits.code,
            amount: 25,
            merge_strategy: "SUM",
          },
          // Vertex
          {
            feature_code: ubentoFeatures.vertex.weeklyRequests.code,
            amount: 250,
            merge_strategy: "MAX",
          },
        ],
        metadata: {
          ui: {
            features: [
              {
                icon: "layout", // Updated for Ubento
                name: "Workspaces",
                value: true,
              },
              {
                icon: "plug", // Updated for Ubento
                name: "Service Connections",
                value: true,
              },
              {
                icon: "sparkles", // Emphasizing AI for free users
                name: "AI Assistant",
                value: true,
              },
              {
                icon: "vertex",
                name: "Vertex Requests",
                value: {
                  type: "quota",
                  feature_code: ubentoFeatures.vertex.weeklyRequests.code,
                  unit: "vertex-request",
                },
              },
            ],
          },
        },
      },
      {
        code: "ubento.pro",
        name: "Pro",
        description: "For professional use.",
        active: true,
        lsId: ids.offers.ubentoPro,
        entitlements: [
          // Ai
          {
            feature_code: ubentoFeatures.ai.weeklyCredits.code,
            amount: 100,
            merge_strategy: "SUM",
          },
          // Vertex
          {
            feature_code: ubentoFeatures.vertex.weeklyRequests.code,
            amount: "inf",
            merge_strategy: "MAX",
          },
        ],
        metadata: {
          ui: {
            features: [
              {
                icon: "layout",
                name: "Workspaces",
                value: true,
              },
              {
                icon: "plug",
                name: "Service Connections",
                value: true,
              },
              {
                icon: "ai",
                name: "AI Credits",
                value: {
                  type: "quota",
                  feature_code: ubentoFeatures.ai.weeklyCredits.code,
                  unit: "ai-credit",
                },
              },
              {
                icon: "vertex",
                name: "Vertex Requests",
                value: {
                  type: "quota",
                  feature_code: ubentoFeatures.vertex.weeklyRequests.code,
                  unit: "vertex-request",
                },
              },
            ],
          },
        },
      },
    ],
  },
  {
    code: ubentoProducts.aiCreditAddOn.code,
    name: ubentoProducts.aiCreditAddOn.name,
    description: ubentoProducts.aiCreditAddOn.description,
    lsId: ids.products.aiCreditPack,
    offers: [
      {
        code: "ai-credit-pack",
        name: "AI Credit Pack",
        description: "AI Credit Pack for AI-powered features",
        active: true,
        lsId: ids.offers.aiCreditPack,
        entitlements: [
          {
            feature_code: ubentoFeatures.ai.weeklyCredits.code,
            amount: 100,
            merge_strategy: "SUM",
          },
        ],
      },
    ],
  },
];
