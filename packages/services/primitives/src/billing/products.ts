export const ubentoProducts = {
  ubento: {
    code: "ubento",
    name: "Ubento",
    description:
      "Ubento is a powerful WorkOS that empowers business professionals and teams to connect their everyday services, automate workflows, and build custom workspaces to manage their daily operations.",
  },
  aiCreditAddOn: {
    code: "ai_credit_add_on",
    name: "Ubento AI Credit Add-On",
    description:
      "A recurring monthly subscription that provides additional AI credits to power intelligent automations, data processing, and smart workflows across your connected services.",
  },
} satisfies Record<
  string,
  {
    code: string;
    name: string;
    description: string;
  }
>;
