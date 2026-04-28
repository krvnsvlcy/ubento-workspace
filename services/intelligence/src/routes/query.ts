import { openai } from "@ai-sdk/openai";
import { chain, toSerializable, validate } from "@ubento/service-toolkit";
import type { LanguageModel } from "ai";
import { generateObject, generateText } from "ai";
import { Router } from "express";
import z from "zod";
import { convertJsonSchemaToZod } from "zod-from-json-schema";

export const models: Record<string, LanguageModel> = {
  "gpt-4.1": openai("gpt-4.1"),
  "gpt-4.1-mini": openai("gpt-4.1-mini"),
  "gpt-4.1-nano": openai("gpt-4.1-nano"),
  "gpt-5": openai("gpt-5"),
  "gpt-5-mini": openai("gpt-5-mini"),
  "gpt-5-nano": openai("gpt-5-nano"),
};

export function getModel(modelId: string): LanguageModel {
  const model = models[modelId];
  if (!model) {
    throw new Error(`Unknown model ID: ${modelId}`);
  }
  return model;
}

const queryRouter: Router = Router();

queryRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        instructions: z.string(),
        query: z.string(),
        model_id: z.string(),
        schema: z.record(z.string(), z.any()).optional(),
        format: z.string().optional(),
      }),
    }),
    async (req, res) => {
      const { instructions, query, model_id, schema } = req.body;
      const model = getModel(model_id);
      if (!model) {
        res.status(400).json({ error: "Invalid model_id" });
        return;
      }

      if (schema) {
        const result = await generateObject({
          system: instructions,
          prompt: query,
          model,
          output: "object",
          schema: convertJsonSchemaToZod(schema) as any,
        });
        res.json(toSerializable({ response: result.object }));
      } else {
        const result = await generateText({
          system: req.body.instructions,
          prompt: req.body.query,
          model,
        });
        res.json(toSerializable({ response: result.text }));
      }
    }
  )
);

export default queryRouter;
