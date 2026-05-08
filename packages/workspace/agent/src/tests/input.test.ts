import { buildAgentOrchestratorPrompt } from "@/execution/prompt/prompt/prompt";
import { describe, expect, test } from "vitest";

describe("Input Handling", () => {
  test("should pass attachments to the model", async () => {
    const parts = await buildAgentOrchestratorPrompt({
      context: {
        history: [
          {
            type: "message",
            id: "1",
            data: {
              role: "user",
              modelId: "m1",
              text: "Hello",
              attachments: [
                {
                  type: "bento-location",
                  data: { boardId: "123" },
                },
              ],
            },
          },
        ],
        resources: [],
      },
      environment: {} as any,
      agent: {} as any,
    });

    console.log({ parts });

    expect(parts.length).toBeGreaterThan(0);
    const textPart = parts.find(p => p.type === "text");
    expect(textPart).toBeTruthy();
    expect(textPart?.text).toContain("- Attachments:");
    expect(textPart?.text).toContain("bento-location:");
    expect(textPart?.text).toContain("123");
  });
});
