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
    ide: string;
    aiCreditPack: string;
    storagePack: string;
  };
  offers: {
    ideHobby: string;
    idePro: string;
    aiCreditPack: string;
    storagePack: string;
  };
};
const testIds: Ids = {
  products: {
    ide: "650481",
    aiCreditPack: "650500",
    storagePack: "787914",
  },
  offers: {
    ideHobby: "",
    idePro: "1021421",
    aiCreditPack: "1021423",
    storagePack: "1242759",
  },
};
const prodIds: Ids = {
  products: {
    ide: "884321",
    aiCreditPack: "884322",
    storagePack: "884323",
  },
  offers: {
    ideHobby: "",
    idePro: "1391839",
    aiCreditPack: "1391840",
    storagePack: "1391841",
  },
};
const ids = env.NODE_ENV === "production" ? prodIds : testIds;

export const catalog: Catalog = [
  {
    code: ubentoProducts.ide.code,
    name: ubentoProducts.ide.name,
    description: ubentoProducts.ide.description,
    default_offer_code: "ide.hobby",
    lsId: ids.products.ide,
    offers: [
      {
        code: "ide.hobby",
        name: "Hobby",
        description:
          "For experimenting, learning, and small personal projects.",
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
        code: "ide.pro",
        name: "Pro",
        description:
          "For professional teams building and shipping internal tools and apps.",
        active: true,
        lsId: ids.offers.idePro,
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
