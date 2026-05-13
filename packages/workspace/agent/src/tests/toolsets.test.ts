import { Agent } from "@/agent/agent";
import { createEnvironment } from "@/environment/environment";
import { AgentTool } from "@/execution/tool/tool";
import { createLocalToolkit } from "@/execution/tool/toolkit/local";
import { createAgentThread } from "@/thread/thread";
import { describe, expect, test } from "vitest";
import yaml from "yaml";
import { z } from "zod";

describe("Toolkits", () => {
  test("should load toolkits and include them in instructions and execute them", async () => {
    const mockTool: AgentTool = {
      name: "my_tool",
      description: "A mock tool",
      args: z.object({ input: z.string() }),
      run: async ({ args }) => ({
        content: [{ type: "text", text: `mock result ${args.input}` }],
      }),
    };

    const mockToolkit = createLocalToolkit({
      name: "my-toolkit",
      description: "A mock toolkit",
      tools: { my_tool: mockTool },
    });

    let savedMessages: any[] = [];
    const environment = createEnvironment({
      getModel: (id) => ({
        id,
        generateText: async (options: any) => {
          savedMessages = options.messages || [];
          if (options.system) {
            savedMessages.push({ role: "system", text: options.system });
          }
          return {
            text: yaml.stringify({
              actions: [
                { tool: "my-toolkit:my_tool", args: { input: "test" } },
                { tool: "finish", args: null },
              ],
            }),
          };
        },
      }),
      listToolkits: () => [mockToolkit],
      createAgentThread: async ({ agent }) => {
        return createAgentThread({
          id: crypto.randomUUID(),
          agent,
          environment,
          saveContext: async () => {},
          createMessage: async () => crypto.randomUUID(),
          updateMessage: async () => {},
        });
      },
    });

    const agent: Agent = {
      name: "test-agent",
      description: "Test agent",
      instructions: "Test instructions",
      communicationInterface: "response",
    };

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async () => {},
    });

    const execution = thread.createExecution();
    await execution.run({ message: { text: "Call the tool", modelId: "m1" } });

    // Verify system instructions contain toolkit info
    const systemMessage = savedMessages.find((m) => m.role === "system");
    expect(systemMessage).toBeTruthy();
    expect(systemMessage.text).toContain("my-toolkit");
    expect(systemMessage.text).toContain("A mock toolkit");

    // Verify that the tool was actually called!
    const context = thread.context.getData();
    const agentMessage = context.history?.find(
      (m: any) => m.data?.role === "agent",
    ) as any;
    expect(agentMessage).toBeTruthy();
    expect(agentMessage.data.actions).toBeDefined();

    const action = agentMessage?.data.actions.find(
      (a: any) => a.tool === "my_tool",
    );
    expect(action).toBeTruthy();
    expect(action.status).toBe("completed");
    expect(action.output?.[0]?.text).toBe("mock result test");
  });
});
