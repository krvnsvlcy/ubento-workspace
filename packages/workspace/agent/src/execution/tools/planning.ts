import z from "zod";
import { AgentTool } from "../tool/tool.js";

const enterPlanModeArgs = z.object({
  reason: z.string().describe("The reason or objective for entering plan mode"),
});

export const enterPlanModeTool: AgentTool<typeof enterPlanModeArgs> = {
  name: "enter_plan_mode",
  description: "Switch the assistant to Plan Mode. Locked out of mutating tools until approve_plan is called.",
  args: enterPlanModeArgs,
  run: async ({ args, thread }) => {
    await thread.context.addResource({
      key: "plan_mode",
      type: "plan_mode",
      label: "Plan Mode Status",
      data: {
        active: true,
        reason: args.reason,
      },
    });
    return {
      content: [
        {
          type: "text",
          text: `Entered Plan Mode. Objective: ${args.reason}\nCode modification tools are now locked. Please formulate your plan, create tasks, and call approve_plan when ready.`,
        },
      ],
    };
  },
};

const approvePlanArgs = z.object({
  approvedPlanSummary: z.string().describe("A summary of the approved plan to proceed with execution"),
});

export const approvePlanTool: AgentTool<typeof approvePlanArgs> = {
  name: "approve_plan",
  description: "Approve the current plan and exit Plan Mode. Code modification tools will be unlocked.",
  args: approvePlanArgs,
  run: async ({ args, thread }) => {
    await thread.context.addResource({
      key: "plan_mode",
      type: "plan_mode",
      label: "Plan Mode Status",
      data: {
        active: false,
        reason: "",
        approvedPlanSummary: args.approvedPlanSummary,
      },
    });
    return {
      content: [
        {
          type: "text",
          text: `Plan approved. Plan Mode exited. Summary: ${args.approvedPlanSummary}\nCode modification tools are now unlocked.`,
        },
      ],
    };
  },
};
