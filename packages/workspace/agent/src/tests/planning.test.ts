import { Agent } from "@/agent/agent";
import { createEnvironment } from "@/environment/environment";
import { AgentTool } from "@/execution/tool/tool";
import { createAgentThread } from "@/thread/thread";
import { enterPlanModeTool, approvePlanTool } from "../execution/tools/planning.js";
import {
  createTaskTool,
  updateTaskTool,
  listTasksTool,
  addTaskDependencyTool,
  visualizeTasksTool,
} from "../execution/tools/tracker.js";
import { describe, expect, test } from "vitest";
import z from "zod";

describe("Plan Mode and Task Tracker", () => {
  test("should block mutating tools in Plan Mode and allow non-mutating tools", async () => {
    // 1. Create a mutating tool
    const writeBoardTool: AgentTool = {
      name: "write_board_module",
      description: "Mutate a board module",
      args: z.object({ content: z.string() }),
      run: async () => ({
        content: [{ type: "text", text: "success" }],
      }),
    };

    // 2. Create a non-mutating tool
    const readBoardTool: AgentTool = {
      name: "read_board_module",
      description: "Read a board module",
      args: z.object({}),
      run: async () => ({
        content: [{ type: "text", text: "module content" }],
      }),
    };

    const environment = createEnvironment({
      tools: [writeBoardTool, readBoardTool],
      getModel: () => undefined as any,
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
      tools: ["write_board_module", "read_board_module"],
    };

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async () => {},
    });

    const mockModel = { id: "mock-model" } as any;
    const execution = thread.createExecution();
    const message = await thread.startAgentMessage("m1");

    // Plan Mode is not active yet: writeBoardTool should execute successfully
    const result1 = await (execution as any).runAction({
      tool: writeBoardTool,
      args: { content: "new content" },
      message,
      model: mockModel,
    });
    expect(result1.error).toBeUndefined();

    // Activate Plan Mode by adding the plan_mode resource
    await thread.context.addResource({
      key: "plan_mode",
      type: "plan_mode",
      label: "Plan Mode Status",
      data: { active: true, reason: "Testing plan mode" },
    });

    // Now, writeBoardTool (mutating) should be blocked and return an error
    const result2 = await (execution as any).runAction({
      tool: writeBoardTool,
      args: { content: "new content" },
      message,
      model: mockModel,
    });
    expect(result2.error).toBeDefined();
    expect(result2.error.message).toContain("Plan Mode is active");

    // readBoardTool (non-mutating) should still be allowed
    const result3 = await (execution as any).runAction({
      tool: readBoardTool,
      args: {},
      message,
      model: mockModel,
    });
    expect(result3.error).toBeUndefined();

    // Deactivate Plan Mode
    await thread.context.addResource({
      key: "plan_mode",
      type: "plan_mode",
      label: "Plan Mode Status",
      data: { active: false },
    });

    // writeBoardTool should be allowed again
    const result4 = await (execution as any).runAction({
      tool: writeBoardTool,
      args: { content: "new content" },
      message,
      model: mockModel,
    });
    expect(result4.error).toBeUndefined();
  });

  test("should execute tracker and planning tools correctly", async () => {
    const environment = createEnvironment({
      tools: [
        enterPlanModeTool,
        approvePlanTool,
        createTaskTool,
        updateTaskTool,
        listTasksTool,
        addTaskDependencyTool,
        visualizeTasksTool,
      ],
      getModel: () => undefined as any,
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
    };

    const thread = createAgentThread({
      id: crypto.randomUUID(),
      agent,
      environment,
      saveContext: async () => {},
      createMessage: async () => crypto.randomUUID(),
      updateMessage: async () => {},
    });

    const mockModel = { id: "mock-model" } as any;
    const message = await thread.startAgentMessage("m1");
    const execution = thread.createExecution();

    // 1. Enter plan mode
    const res1 = await (execution as any).runAction({
      tool: enterPlanModeTool,
      args: { reason: "Implement test feature" },
      message,
      model: mockModel,
    });
    expect(res1.error).toBeUndefined();
    expect((thread.context.getResource("plan_mode")?.data as any)?.active).toBe(true);

    // 2. Create tasks
    const res2 = await (execution as any).runAction({
      tool: createTaskTool,
      args: { title: "Task 1", description: "First task desc" },
      message,
      model: mockModel,
    });
    expect(res2.error).toBeUndefined();

    const res3 = await (execution as any).runAction({
      tool: createTaskTool,
      args: { title: "Task 2", description: "Second task desc", parentId: "TASK-1" },
      message,
      model: mockModel,
    });
    expect(res3.error).toBeUndefined();

    const tasksResource = thread.context.getResource("tasks");
    expect((tasksResource?.data as any)?.tasks).toHaveLength(2);
    expect((tasksResource?.data as any)?.tasks[0].id).toBe("TASK-1");
    expect((tasksResource?.data as any)?.tasks[1].id).toBe("TASK-2");
    expect((tasksResource?.data as any)?.tasks[1].parentId).toBe("TASK-1");

    // 3. Add dependency
    const res4 = await (execution as any).runAction({
      tool: addTaskDependencyTool,
      args: { taskId: "TASK-2", dependencyId: "TASK-1" },
      message,
      model: mockModel,
    });
    expect(res4.error).toBeUndefined();
    expect((thread.context.getResource("tasks")?.data as any)?.tasks[1].dependencies).toContain("TASK-1");

    // 4. Update task
    const res5 = await (execution as any).runAction({
      tool: updateTaskTool,
      args: { id: "TASK-1", status: "in_progress" },
      message,
      model: mockModel,
    });
    expect(res5.error).toBeUndefined();
    expect((thread.context.getResource("tasks")?.data as any)?.tasks[0].status).toBe("in_progress");

    // 5. Exit plan mode
    const res6 = await (execution as any).runAction({
      tool: approvePlanTool,
      args: { approvedPlanSummary: "Plan verified" },
      message,
      model: mockModel,
    });
    expect(res6.error).toBeUndefined();
    expect((thread.context.getResource("plan_mode")?.data as any)?.active).toBe(false);
  });
});
