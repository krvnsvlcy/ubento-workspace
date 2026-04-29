import {
    parseCursorQuery,
    parseStringQuery,
    setNextLink,
    toSerializable,
} from "@ubento/service-toolkit";
import { Provider } from "@ubento/database/billing";
import { Router } from "express";
import {
    getWebhookEvent,
    listWebhookEvents,
} from "../routines/webhooks.js";

const router = Router();

// List webhook events
router.get("/", async (req, res, next) => {
    try {
        const { items, nextCursor } = await listWebhookEvents({
            ...parseCursorQuery(req),
            provider: parseStringQuery(req, "provider") as Provider | undefined,
            processed: req.query.processed === "true" ? true : req.query.processed === "false" ? false : undefined,
            created_after: req.query.created_after ? new Date(req.query.created_after as string) : undefined,
            created_before: req.query.created_before ? new Date(req.query.created_before as string) : undefined,
        });
        setNextLink(req, res, nextCursor);
        res.json(toSerializable(items));
    } catch (e) {
        next(e);
    }
});

// Get webhook event by ID
router.get("/:id", async (req, res) => {
    const webhookEvent = await getWebhookEvent(req.params.id);
    if (!webhookEvent) {
        res.status(404).json({ message: "Webhook event not found" });
        return;
    }

    res.json(toSerializable(webhookEvent));
});

export default router;
