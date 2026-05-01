export const ubentoProducts = {
  ide: {
    code: "ide",
    name: "Ubento IDE",
    description:
      "Ubento is a visual-first web development platform that lets developers and teams scaffold, build, and ship real production apps using composable primitives, integrations, and workflows.",
  },
  aiCreditAddOn: {
    code: "ai_credit_add_on",
    name: "Ubento AI Credit Add-On",
    description:
      "Ubento AI Credit Add-On is a subscription-based service that provides a fixed number of AI credits for use in the Ubento platform.",
  },
  storageAddOn: {
    code: "storage_add_on",
    name: "Ubento Storage Add-On",
    description:
      "Ubento Storage Add-On is a subscription-based service that provides additional storage for the Ubento platform.",
  },
} satisfies TPage<
  string,
  {
    code: string;
    name: string;
    description: string;
  }
>;
