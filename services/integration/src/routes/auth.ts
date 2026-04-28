import { chain, validate } from "@ubento/service-toolkit";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { getAuthUrl, handleOAuthCallback } from "../entities/auth.js";

const router: Router = Router();

function getRedirectUri(req: Request) {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${protocol}://${host}/integration/oauth/callback`;
}

router.get(
  "/integration/oauth/connect",
  chain(
    validate({
      query: z.object({
        provider_id: z.string().min(1),
        organization_id: z.string().min(1),
        state: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { provider_id, organization_id, state } = req.query as {
        provider_id: string;
        organization_id: string;
        state?: string;
      };

      const authUrl = await getAuthUrl({
        providerId: provider_id,
        organizationId: organization_id,
        redirectUri: getRedirectUri(req),
        state,
      });
      res.redirect(authUrl);
    },
  ),
);

router.get(
  "/integration/oauth/callback",
  chain(
    validate({
      query: z.object({
        code: z.string().optional(),
        state: z.string().optional(),
        error: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { code, state, error } = req.query as {
        code?: string;
        state?: string;
        error?: string;
      };

      if (error) {
        return res
          .status(400)
          .send(
            `<html><body><h1>Auth Failed</h1><p>${error}</p></body></html>`,
          );
      }

      if (!code || !state) {
        return res.status(400).send("code and state are required");
      }

      // 1. Process the actual OAuth logic
      const { clientState } = await handleOAuthCallback(
        code,
        state,
        getRedirectUri(req),
      );

      // 2. Send the "Safe to Close" HTML
      res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Authentication Successful</title>
      <style>
        body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f9fafb; color: #111827; }
        .card { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        h1 { color: #059669; margin-bottom: 0.5rem; }
        p { color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Connection Successful!</h1>
        <p>You can safely close this window now.</p>
      </div>

      <script>
        // Notify the main workspace window that we are done
        if (window.opener) {
          window.opener.postMessage({ 
            type: 'ELLL_AUTH_SUCCESS', 
            state: '${clientState}' 
          }, '*');
          
          // Optional: Automatically close the tab after 2 seconds
          setTimeout(() => window.close(), 2000);
        }
      </script>
    </body>
    </html>
  `);
    },
  ),
);

export default router;
