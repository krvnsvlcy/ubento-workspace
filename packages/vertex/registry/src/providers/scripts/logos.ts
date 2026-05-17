import { HttpConnectionProviderConfig } from "@ubento/vertex.core";
import fs from "fs";
import path from "path";

const fallbackKownDomains: Record<string, string> = {
  "absorb-lms": "absorblms.com",
  "addepar-basic-auth": "addepar.com",
  adobe: "adobe.com",
  "adobe-commerce": "adobe.com",
  "adobe-workfront": "adobe.com",
  "affinity-v2": "affinity.co",
  algolia: "algolia.com",
  "amazon-selling-partner": "amazon.com",
  "amazon-selling-partner-beta": "amazon.com",
  "amplitude-event-streaming-api": "amplitude.com",
  anrok: "anrok.com",
  "anthropic-administrator": "anthropic.com",
  anvil: "useanvil.com",
  apify: "apify.com",
  "appstle-subscriptions": "appstle.com",
  "asana-scim-api": "asana.com",
  ashby: "ashbyhq.com",
  "atlas-so": "atlas.so",
  "atlassian-government-cloud": "atlassian.com",
  attention: "attention.it",
  auvik: "auvik.com",
  avalara: "avalara.com",
  "avalara-sandbox": "avalara.com",
  avoma: "avoma.com",
  aws: "amazon.com",
  "aws-iam": "amazon.com",
  "aws-inspector2": "amazon.com",
  "aws-multi-service": "amazon.com",
  "aws-scim": "amazon.com",
  axiom: "axiom.co",
  "azure-devops": "azure.com",
  beehiiv: "beehiiv.com",
  bettercontact: "bettercontact.io",
  bird: "bird.com",
  bitdefender: "bitdefender.com",
  blandai: "bland.ai",
  "booking-com": "booking.com",
  braintree: "braintreepayments.com",
  "braintree-sandbox": "braintreepayments.com",
  braze: "braze.com",
  brevo: "brevo.com",
  "brex-staging-oauth": "brex.com",
  buildium: "buildium.com",
  builtwith: "builtwith.com",
  "cal-com-v1": "cal.com",
  "cal-com-v2": "cal.com",
  callrail: "callrail.com",
  "canva-scim-api": "canva.com",
  canny: "canny.io",
  certn: "certn.co",
  chargebee: "chargebee.com",
  chattermill: "chattermill.com",
  check: "checkhq.com",
  "checkr-partner-staging": "checkr.com",
  chorus: "chorus.ai",
  "cin7-core": "cin7.com",
  "circle-so": "circle.so",
  "clari-copilot": "clari.com",
  clay: "clay.com",
  clerk: "clerk.com",
  clickhouse: "clickhouse.com",
  clicksend: "clicksend.com",
  clover: "clover.com",
  cloudflare: "cloudflare.com",
  cloudtalk: "cloudtalk.io",
  coda: "coda.io",
  codegen: "codegen.ai",
  companycam: "companycam.com",
  "connectwise-psa": "connectwise.com",
  "connectwise-psa-staging": "connectwise.com",
  contactout: "contactout.com",
  crisp: "crisp.chat",
  crunchbase: "crunchbase.com",
  cursor: "cursor.com",
  "customer-io": "customer.io",
  cyberimpact: "cyberimpact.com",
  datadog: "datadoghq.com",
  "datto-rmm": "datto.com",
  demodesk: "demodesk.com",
  devin: "devin.ai",
  discourse: "discourse.org",
  dixa: "dixa.com",
  document360: "document360.com",
  drata: "drata.com",
  "e-conomic": "e-conomic.com",
  easypost: "easypost.com",
  "eleven-labs": "elevenlabs.io",
  elevio: "elev.io",
  "energy-performance-certificates-gov-uk": "gov.uk",
  entrata: "entrata.com",
  evaluagent: "evaluagent.com",
  "exact-online": "exactonline.com",
  exa: "exa.ai",
  exist: "exist.io",
  expensify: "expensify.com",
  fairing: "fairing.co",
  "fal-ai": "fal.ai",
  fellow: "fellow.app",
  "fellow-app": "fellow.app",
  "fiber-ai": "fiber.ai",
  "figma-scim": "figma.com",
  findymail: "findymail.com",
  firstbase: "firstbase.io",
  "fiserv-api-key": "fiserv.com",
  float: "float.com",
  folk: "folk.app",
  freepik: "freepik.com",
  freshdesk: "freshdesk.com",
  freshsales: "freshworks.com",
  freshservice: "freshservice.com",
  freshteam: "freshworks.com",
  freshworks: "freshworks.com",
  fullenrich: "fullenrich.com",
  gamma: "gamma.app",
  gem: "gem.com",
  "ghost-content-api": "ghost.org",
  "github-app": "github.com",
  glyphic: "glyphic.ai",
  "gong-basic-auth": "gong.io",
  "google-gemini": "google.com",
  "google-maps": "google.com",
  grafana: "grafana.com",
  granola: "granola.so",
  "greenhouse-job-board-api": "greenhouse.io",
  "greenhouse-onboarding-api": "greenhouse.io",
  grist: "getgrist.com",
  guru: "getguru.com",
  "guru-scim": "getguru.com",
  "gusto-demo": "gusto.com",
  "hackerrank-work": "hackerrank.com",
  "help-scout-docs": "helpscout.com",
  hex: "hex.tech",
  heyreach: "heyreach.io",
  "hibob-service-user": "hibob.com",
  "highlevel-leadconnector": "gohighlevel.com",
  holded: "holded.com",
  huntress: "huntress.com",
  icypeas: "icypeas.com",
  "incident-io": "incident.io",
  "insight-ly": "insightly.com",
  insightly: "insightly.com",
  instantly: "instantly.ai",
  "it-glue": "itglue.com",
  jazzhr: "jazzhr.com",
  jiminny: "jiminny.com",
  "jira-basic-auth": "atlassian.com",
  "jira-data-center": "atlassian.com",
  "jira-data-center-api-key": "atlassian.com",
  jobvite: "jobvite.com",
  jotform: "jotform.com",
  jumpcloud: "jumpcloud.com",
  "juniper-mist": "mist.com",
  kandji: "kandji.io",
  "keeper-scim": "keepersecurity.com",
  klicktipp: "klicktipp.com",
  klipfolio: "klipfolio.com",
  knowbe4: "knowbe4.com",
  kustomer: "kustomer.com",
  "la-growth-machine": "lagrowthmachine.com",
  lastpass: "lastpass.com",
  lattice: "lattice.com",
  leadmagic: "leadmagic.io",
  lemlist: "lemlist.com",
  lessonly: "lessonly.com",
  "lightspeed-retail-x-series": "lightspeedhq.com",
  linkhut: "linkhut.org",
  listmonk: "listmonk.app",
  lob: "lob.com",
  "looker-oauth": "looker.com",
  "loom-scim": "loom.com",
  "loop-returns": "loopreturns.com",
  "loops-so": "loops.so",
  "lucid-scim": "lucid.co",
  luma: "lu.ma",
  lumos: "lumos.com",
  mailgun: "mailgun.com",
  mailjet: "mailjet.com",
  make: "make.com",
  manatal: "manatal.com",
  "maximizer-cloud": "maximizer.com",
  "maximizer-on-premise": "maximizer.com",
  metabase: "metabase.com",
  "microsoft-tenant": "microsoft.com",
  "microsoft-teams-bot": "microsoft.com",
  mindbody: "mindbodyonline.com",
  minimax: "minimax.com",
  "miro-scim-api": "miro.com",
  missive: "missiveapp.com",
  mixpanel: "mixpanel.com",
  "modjo-ai": "modjo.ai",
  "momentum-io": "momentum.io",
  "next-cloud-ocs": "nextcloud.com",
  "nocrm-io": "nocrm.io",
  northbeam: "northbeam.io",
  "notion-scim-api": "notion.so",
  "nyne-ai": "nyne.ai",
  "ocean-io": "ocean.io",
  "odoo-oauth": "odoo.com",
  "onedrive-personal": "microsoft.com",
  "open-hands": "openhands.ai",
  "openai-admin": "openai.com",
  onlogist: "onlogist.com",
  oomnitza: "oomnitza.com",
  "oracle-fusion-cloud-hcm": "oracle.com",
  ordinal: "ordinal.co",
  paddle: "paddle.com",
  paligo: "paligo.net",
  paycom: "paycom.com",
  pendo: "pendo.io",
  "people-data-labs": "peopledatalabs.com",
  perdoo: "perdoo.com",
  perplexity: "perplexity.ai",
  "personio-recruiting": "personio.com",
  pingone: "pingidentity.com",
  "pipedream-api-key": "pipedream.com",
  "pivotal-tracker": "pivotaltracker.com",
  plain: "plain.com",
  podscribe: "podscribe.com",
  practicefusion: "practicefusion.com",
  prive: "privey.co",
  prospeo: "prospeo.io",
  provenexpert: "provenexpert.com",
  "prtg-classic": "paessler.com",
  pylon: "usepylon.com",
  qualia: "qualia.com",
  quentn: "quentn.com",
  quickbase: "quickbase.com",
  quipteams: "quip.com",
  "ragie-ai": "ragie.ai",
  rapidapi: "rapidapi.com",
  razorpay: "razorpay.com",
  readwise: "readwise.io",
  "readwise-reader": "readwise.io",
  "reapit-connect": "reapit.com",
  "recall-ai": "recall.ai",
  recharge: "rechargepayments.com",
  recruitee: "recruitee.com",
  recruiterflow: "recruiterflow.com",
  recruitcrm: "recruitcrm.io",
  refiner: "refiner.io",
  "render-mcp": "render.com",
  replicate: "replicate.com",
  "reply-io": "reply.io",
  resend: "resend.com",
  "retell-ai": "retellai.com",
  ringover: "ringover.com",
  rippling: "rippling.com",
  "roam-scim-api": "roamresearch.com",
  "rock-gym-pro": "rockgympro.com",
  rocketlane: "rocketlane.com",
  rocketreach: "rocketreach.co",
  rootly: "rootly.com",
  "sage-hr": "sage.com",
  "sage-intacct-oauth": "sage.com",
  "sap-s-4hana-cloud-basic-auth": "sap.com",
  schwab: "schwab.com",
  "scrape-do": "scrape.do",
  "sedna-basic-auth": "sedna.com",
  segment: "segment.com",
  "semrush-v3": "semrush.com",
  sendgrid: "sendgrid.com",
  shippo: "goshippo.com",
  "shipbob-personal-access-token": "shipbob.com",
  "shopify-partner": "shopify.com",
  "shopify-scim-api": "shopify.com",
  "shipstation-v1": "shipstation.com",
  "shipstation-v2": "shipstation.com",
  shortcut: "shortcut.com",
  skio: "skio.com",
  slab: "slab.com",
  "smartlead-ai": "smartlead.ai",
  smartrecruiters: "smartrecruiters.com",
  snowflake: "snowflake.com",
  statista: "statista.com",
  "stay-ai": "stayai.com",
  "store-leads": "storeleads.app",
  streak: "streak.com",
  supabase: "supabase.com",
  "supabase-mcp": "supabase.com",
  talentlms: "talentlms.com",
  "tailscale-api-key": "tailscale.com",
  tally: "tally.so",
  teamtailor: "teamtailor.com",
  telegram: "telegram.org",
  terraform: "terraform.io",
  "triple-whale": "triplewhale.com",
  "trello-scim-api": "trello.com",
  "trakstar-hire": "trakstar.com",
  "tl-dv": "tldv.io",
  "toggl-track": "toggl.com",
  torii: "toriihq.com",
  "twenty-crm": "twenty.com",
  "twenty-crm-self-hosted": "twenty.com",
  twilio: "twilio.com",
  "typefully-api-v2": "typefully.com",
  unanet: "unanet.com",
  unipile: "unipile.com",
  upsales: "upsales.com",
  "ukg-pro-workforce-management": "ukg.com",
  "valley-api-key": "valley.com",
  vercel: "vercel.com",
  vtex: "vtex.com",
  webex: "webex.com",
  webinarjam: "webinarjam.com",
  "wejam-ai": "wejam.ai",
  "wildix-pbx": "wildix.com",
  "wise-api-key": "wise.com",
  wiza: "wiza.co",
  woocommerce: "woocommerce.com",
  workday: "workday.com",
  "workday-oauth": "workday.com",
  "workday-adaptive-planning-basic-auth": "workday.com",
  workos: "workos.com",
  workpath: "workpath.com",
  xai: "x.ai",
  "zapier-scim-api": "zapier.com",
  zigpoll: "zigpoll.com",
  zoho: "zoho.com",
  zorus: "zorus.com",
};

/**
 * Helper to extract a clean root domain from a potential URL string
 * or dynamic template string (e.g., "https://api.hubapi.com" -> "hubapi.com")
 */
function extractDomainFromUrl(urlStr?: string): string | null {
  if (!urlStr) return null;
  try {
    const cleanStr = urlStr.replace(/^https?:\/\//, "").split("/")[0];
    const parts = cleanStr.split(".");

    if (parts.length >= 2) {
      return parts.slice(-2).join(".");
    }
    return cleanStr;
  } catch {
    return null;
  }
}

/**
 * Sweeps a provider config to find any concrete baseUrl to extract the domain from
 */
function getDomainFromProvider(
  provider: HttpConnectionProviderConfig,
): string | null {
  if (fallbackKownDomains[provider.code]) {
    return fallbackKownDomains[provider.code];
  }

  const auth = provider.auth;
  let detectedUrl: string | undefined;

  if (auth.oauth2) {
    detectedUrl =
      auth.oauth2.authorize?.request?.baseUrl ||
      auth.oauth2.token?.request?.baseUrl;
  }

  const domain = extractDomainFromUrl(detectedUrl);
  return domain && !domain.includes("${") ? domain : null;
}

export async function downloadLogosOnly(
  providers: Record<string, HttpConnectionProviderConfig>,
  outputDir: string = "./logos", // Storing cleanly under ./logos/ directly
  brandfetchClientId: string = process.env.BRANDFETCH_CLIENT_ID || "",
  limit: number = 5,
): Promise<void> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!brandfetchClientId) {
    console.warn(
      "⚠️ BRANDFETCH_CLIENT_ID is missing. Downloads will fail with 401 Unauthorized.",
    );
  }

  const failedDownloads: string[] = [];
  let successCount = 0;
  let skippedCount = 0;

  console.log(
    `Starting caching logo download for ${Object.keys(providers).length} providers into ${outputDir}/...`,
  );

  const batchSize = 20;
  const entries = Object.entries(providers);

  for (let i = 0; i < Math.min(entries.length, limit); i += batchSize) {
    const batch = entries.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async ([code, provider]) => {
        // 1. Lookahead Check: See if this provider already has an asset on disk with any valid extension
        const knownExtensions = ["svg", "png", "webp", "jpg"];
        const fileExists = knownExtensions.some((ext) =>
          fs.existsSync(path.join(outputDir, `${code}.${ext}`)),
        );

        if (fileExists) {
          skippedCount++;
          return;
        }

        const domain = getDomainFromProvider(provider);
        if (!domain) {
          failedDownloads.push(code);
          return;
        }
        const brandfetchUrl = `https://cdn.brandfetch.io/domain/${domain}/type/icon/fallback/404?c=${brandfetchClientId}`;

        try {
          const response = await fetch(brandfetchUrl, {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
              Accept:
                "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.9",
              Referer: "https://ubento.dev/",
              Origin: "https://ubento.dev",
              "Cache-Control": "no-cache",
            },
          });

          if (response.ok) {
            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("text/html")) {
              throw new Error(
                "Cloudflare intercepted request with HTML content instead of image binary.",
              );
            }

            let extension = "svg";
            if (contentType.includes("png")) {
              extension = "png";
            } else if (contentType.includes("webp")) {
              extension = "webp";
            } else if (
              contentType.includes("jpeg") ||
              contentType.includes("jpg")
            ) {
              extension = "jpg";
            }

            const buffer = await response.arrayBuffer();
            const fileName = `${code}.${extension}`;
            const filePath = path.join(outputDir, fileName);

            fs.writeFileSync(filePath, Buffer.from(buffer));
            successCount++;
          } else {
            failedDownloads.push(code);
          }
        } catch (error) {
          failedDownloads.push(code);
        }
      }),
    );

    // Keep pacing delay active for un-cached downloads hitting the network
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log(`✅ Pipeline Complete.`);
  console.log(`   Downloaded: ${successCount}`);
  console.log(`   Skipped (Already Cached): ${skippedCount}`);

  if (failedDownloads.length > 0) {
    console.log(
      `⚠️ Failed downloads logged to 'missing-logos.log' (${failedDownloads.length})`,
    );
    fs.writeFileSync("./missing-logos.log", failedDownloads.join("\n"));
  }
}
