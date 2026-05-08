import { Agent } from "@/agent/agent";
import { AgentEnvironment, createEnvironment } from "@/environment/environment";
import { AgentTool } from "@/execution/tool/tool";
import { createAgentThread } from "@/thread/thread";
import { LanguageModel, LanguageModelGenerateResult } from "@/utils/models";
import { describe, expect, test } from "vitest";
import yaml from "yaml";

function quickEnvironment({
  generations = [],
  tools = [],
}: {
  tools?: AgentTool[];
  generations?: any[];
}): AgentEnvironment {
  let generationCounter = 0;
  const env = createEnvironment({
    getModel: function (id: string): LanguageModel | undefined {
      return {
        id,
        generateText: async function (): Promise<LanguageModelGenerateResult> {
          const generation = generations[generationCounter];
          generationCounter++;
          if (!generation) {
            throw new Error("No generation found for ");
          }
          return {
            text: yaml.stringify(generation),
          };
        },
      };
    },
  });

  for (const tool of tools) {
    env.addTool(tool);
  }

  return env;
}

describe("Agent", () => {
  test("should run a simple execution and update history", async () => {
    const agent: Agent = {
      name: "quick-agent",
      description: "A simple agent",
      instructions: "You are a helpful assistant",
    };

    const environment = quickEnvironment({
      generations: [
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Hello",
                after: "finish",
              },
            },
          ],
        },
      ],
    });

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async () => {},
    });

    const execution = thread.createExecution();
    await execution.run({
      message: { text: "Hi", modelId: "m1" },
    });

    const context = thread.context.getData();

    expect(context.history).toHaveLength(2);

    expect(context.history?.[0]).toMatchObject({
      type: "message",
      data: {
        role: "user",
        text: "Hi",
        modelId: "m1",
      },
    });

    expect(context.history?.[1]).toMatchObject({
      type: "message",
      data: {
        role: "agent",
        modelId: "m1",
        status: "completed",
        actions: [
          expect.objectContaining({
            tool: "message",
            input: { content: "Hello", after: "finish" },
            status: "completed",
          }),
        ],
      },
    });
  });

  test("should persist context and message updates", async () => {
    const agent: Agent = {
      name: "quick-agent",
      description: "A simple agent",
      instructions: "You are a helpful assistant",
    };

    const environment = quickEnvironment({
      generations: [
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Hello",
                after: "finish",
              },
            },
          ],
        },
      ],
    });

    const savedContexts: any[] = [];
    const createdMessages: any[] = [];
    const updatedMessages: Record<string, any[]> = {};

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async (context) => {
        savedContexts.push(JSON.parse(JSON.stringify(context)));
      },
      createMessage: async (data) => {
        const id = crypto.randomUUID();
        createdMessages.push({ id, data: JSON.parse(JSON.stringify(data)) });
        return id;
      },
      updateMessage: async (id, data) => {
        if (!updatedMessages[id]) updatedMessages[id] = [];
        updatedMessages[id].push(JSON.parse(JSON.stringify(data)));
      },
    });

    const execution = thread.createExecution();
    await execution.run({
      message: { text: "Hi", modelId: "m1" },
    });

    // Verify user message creation
    expect(createdMessages).toHaveLength(2);
    expect(createdMessages[0].data).toMatchObject({
      role: "user",
      text: "Hi",
      modelId: "m1",
    });
    expect(createdMessages[1].data).toMatchObject({
      role: "agent",
      modelId: "m1",
      status: "in-progress",
    });

    // Verify context saves
    expect(savedContexts.length).toBeGreaterThanOrEqual(3);
    const lastContext = savedContexts[savedContexts.length - 1];
    expect(lastContext.history).toHaveLength(2);
    expect(lastContext.history[0].data.text).toBe("Hi");
    expect(lastContext.history[1].data.status).toBe("completed");

    // Verify agent message updates
    const agentMessageId = createdMessages[1].id;
    expect(updatedMessages[agentMessageId]).toBeDefined();
    // Should have at least one update with status 'completed'
    const finalUpdate =
      updatedMessages[agentMessageId][
        updatedMessages[agentMessageId].length - 1
      ];
    expect(finalUpdate.status).toBe("completed");
    expect(finalUpdate.actions).toHaveLength(1);
    expect(finalUpdate.actions[0].tool).toBe("message");
  });

  test("should end loop when message has after 'finish'", async () => {
    const agent: Agent = {
      name: "quick-agent",
      description: "A simple agent",
      instructions: "You are a helpful assistant",
    };

    const environment = quickEnvironment({
      generations: [
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Hello",
                after: "finish",
              },
            },
          ],
        },
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Should not be reached",
                after: "finish",
              },
            },
          ],
        },
      ],
    });

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async () => {},
    });

    const execution = thread.createExecution();
    await execution.run({
      message: { text: "Hi", modelId: "m1" },
    });

    const context = thread.context.getData();

    // History should only contain the first agent response
    expect(context.history).toHaveLength(2);
    expect(context.history?.[1]).toMatchObject({
      type: "message",
      data: {
        actions: [
          expect.objectContaining({
            input: { content: "Hello", after: "finish" },
          }),
        ],
      },
    });
  });

  test("should end loop when message has after 'await_response'", async () => {
    const agent: Agent = {
      name: "quick-agent",
      description: "A simple agent",
      instructions: "You are a helpful assistant",
    };

    const environment = quickEnvironment({
      generations: [
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Hello",
                after: "await_response",
              },
            },
          ],
        },
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Should not be reached",
                after: "finish",
              },
            },
          ],
        },
      ],
    });

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async () => {},
    });

    const execution = thread.createExecution();
    await execution.run({
      message: { text: "Hi", modelId: "m1" },
    });

    const context = thread.context.getData();

    expect(context.history).toHaveLength(2);
    expect(context.history?.[1]).toMatchObject({
      type: "message",
      data: {
        actions: [
          expect.objectContaining({
            input: { content: "Hello", after: "await_response" },
          }),
        ],
      },
    });
  });

  test("should fail the message when no actions are returned", async () => {
    const agent: Agent = {
      name: "quick-agent",
      description: "A simple agent",
      instructions: "You are a helpful assistant",
    };

    const environment = quickEnvironment({
      generations: [
        // First generation: no actions
        { actions: [] },
        // Second generation: valid response to end the loop
        {
          actions: [
            {
              tool: "message",
              args: {
                content: "Recovered",
                after: "finish",
              },
            },
          ],
        },
      ],
    });

    const updatedMessages: Record<string, any[]> = {};

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async (id, data) => {
        if (!updatedMessages[id]) updatedMessages[id] = [];
        updatedMessages[id].push(JSON.parse(JSON.stringify(data)));
      },
    });

    const execution = thread.createExecution();
    await execution.run({
      message: { text: "Hi", modelId: "m1" },
    });

    const context = thread.context.getData();

    // Should have: user message, errored agent message, then recovered agent message
    expect(context.history).toHaveLength(3);

    // First agent message should be errored
    expect(context.history?.[1]).toMatchObject({
      type: "message",
      data: {
        role: "agent",
        status: "errored",
        error: {
          code: "response_schema_mismatch",
          message: "No actions to take",
        },
      },
    });

    // Second agent message should be the recovered one
    expect(context.history?.[2]).toMatchObject({
      type: "message",
      data: {
        role: "agent",
        status: "completed",
        actions: [
          expect.objectContaining({
            tool: "message",
            input: { content: "Recovered", after: "finish" },
          }),
        ],
      },
    });
  });
});
