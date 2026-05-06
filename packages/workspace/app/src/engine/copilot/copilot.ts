import { UbentoService } from "@/services/ubento/ubento.js";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { createStore } from "zustand";
import { UbentoSession } from "../session.js";
import { createAgent } from "./agent/agent.js";
import { createUbentoAgentEnvironment } from "./copilot/environment.js";
import {
  copilotEnvironmentInstructions,
  copilotRoleInstructions,
} from "./copilot/instructions.js";

const copilotScope = {
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

  const env = createUbentoAgentEnvironment({ ubento, session });

  const agent = createAgent({
    name: "ubento-copilot",
    description: "The main AI assistant",
    environment: env,
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
        if (!threadId) {
          const thread = await agent.createThread({
            title: content.slice(0, 50),
          });
          threadId = thread.id;
          setActiveThread({ scope, threadId });
        }

        // Clear input immediately for better UX
        store.setState((s) => ({
          input: { ...s.input, text: "" },
        }));

        await agent.sendMessage(content, {
          threadId: threadId,
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
