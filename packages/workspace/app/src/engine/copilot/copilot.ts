import { UbentoService } from "@/services/ubento/ubento.js";
import { AgentThread } from "@ubento/workspace.agent";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { registerStore } from "@ubento/zustand-devtool";
import { createStore } from "zustand";
import { UbentoSession } from "../session.js";
import { copilotAgent } from "./copilot/agents/copilot.js";
import { createCopilotAgentEnvironment } from "./environment.js";
import { modelIds } from "./utils/models.js";

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
  activeModelId: string;
};

export function createUbentoCopilot({
  ubento,
  session,
}: {
  ubento: UbentoService;
  session: UbentoSession;
}) {
  const environment = createCopilotAgentEnvironment({ ubento, session });
  const store = createStore<UbentoCopilotState>(() => ({
    activeThreadMap: {},
    input: {
      text: "",
      attachments: [],
    },
    activeModelId: modelIds.gemini3flash,
  }));
  registerStore("copilot", store);
  const controller = createZustandStateController(store);

  environment.addAgent(copilotAgent);

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
        // Clear input immediately for better UX
        store.setState((s) => ({
          input: { ...s.input, text: "" },
        }));

        let thread: AgentThread;
        if (threadId) {
          thread = await environment.getThread({
            id: threadId,
            agent: copilotAgent.name,
          });
          setActiveThread({ scope, threadId });
        } else {
          thread = await environment.createThread({
            agent: copilotAgent.name,
            teamId: session.teamId,
          });
        }

        await thread.run({
          message: { text: content, modelId: state.activeModelId },
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
