import { UbentoService } from "@/services/ubento/ubento.js";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { createStore } from "zustand";
import { UbentoSession } from "../session.js";
import { createAgent } from "./agent/agent.js";
import {
  copilotEnvironmentInstructions,
  copilotRoleInstructions,
} from "./copilot/instructions.js";
import { getThreadController } from "./thread/thread_controller.js";

export const copilotScope = {
  team: "team",
  workspace: (workspaceId: string) => `workspace.${workspaceId}`,
};

export type UbentoCopilotAttachment = {
  type: string;
};
export type UbentoCopilotInput = {
  text: string;
  attachments?: UbentoCopilotAttachment[];
};
export type UbentoCopilotState = {
  input: UbentoCopilotInput;
  activeThreadMap: Record<string, string>; // scope -> threadId
};

export function createUbentoCopilot({
  ubento,
  session,
}: {
  ubento: UbentoService;
  session: UbentoSession;
}) {
  const store = createStore<UbentoCopilotState>(() => ({
    activeThreadMap: {},
    input: {
      text: "",
      attachments: [],
    },
  }));
  const controller = createZustandStateController(store);

  const agent = createAgent({
    name: "ubento-copilot",
    description: "The main AI assistant",
    getAgentInstructions: () => ({
      role: copilotRoleInstructions,
      environment: copilotEnvironmentInstructions,
    }),
  });

  function setActiveThread({
    scope,
    threadId,
  }: {
    scope: string;
    threadId: string;
  }) {
    store.setState((state) => ({
      activeThreadMap: { ...state.activeThreadMap, [scope]: threadId },
    }));
  }

  return {
    ...controller,
    agent,
    setInputText: (text: string) => {
      store.setState((s) => ({
        input: { ...s.input, text },
      }));
    },

    sendMessage: async (scope: string) => {
      const state = store.getState();
      const content = state.input.text;

      if (!content.trim()) return;

      let threadId = state.activeThreadMap[scope];

      try {
        let thread;
        if (!threadId) {
          thread = await ubento.intelligence.createThread({
            title: content.slice(0, 50),
            team_id: session.teamId,
          });
          threadId = thread.id;
          setActiveThread({ scope, threadId });
        } else {
          thread = await ubento.intelligence.getThread(threadId);
        }

        // Clear input immediately for better UX
        store.setState((s) => ({
          input: { ...s.input, text: "" },
        }));

        const threadController = getThreadController({ threadId: thread.id, agent, ubento });

        await threadController.run({
          message: { text: content },
          model: {} as any, // TODO: Inject correct language model using ubento SDK token manager
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        // restore input on failure
        store.setState((s) => ({
          input: { ...s.input, text: content },
        }));
      }
    },

    setActiveThread(scope: string, threadId: string) {
      setActiveThread({ scope, threadId });
    },
  };
}

export type UbentoCopilot = ReturnType<typeof createUbentoCopilot>;
