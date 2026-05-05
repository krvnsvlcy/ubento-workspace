import { createStore, StoreApi } from "zustand/vanilla";
import { Agent } from "../agent/agent.js";

export type CopilotInputAttachment<T extends string = string, D = unknown> = {
  id: string;
  type: T;
  status: "pending" | "ready" | "errored";
  data?: D;
  getData?: () => Promise<D>;
};

export type CopilotAttachmentInputEvent = {
  payload: {
    files?: File[];
    getData?: (type: string) => any;
    has?: (type: string) => boolean;
  };
  agent: Agent;
};

export interface CopilotInputState {
  text: string;
  isLoading: boolean;
  error: string | undefined;
  attachments: CopilotInputAttachment[];
  model: string | undefined;
}

export interface CopilotInputActions {
  setText: (text: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | undefined) => void;
  addAttachment: (attachment: CopilotInputAttachment) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
  updateAttachment: (
    id: string,
    update: Partial<CopilotInputAttachment>,
  ) => void;
  inputAttachment: (event: CopilotAttachmentInputEvent) => void;
  setModel: (model: string | undefined) => void;
}

export type CopilotInputInstance = StoreApi<
  CopilotInputState & CopilotInputActions
>;

export function createCopilotInput({
  agent,
}: {
  agent: Agent;
}): CopilotInputInstance {
  return createStore<CopilotInputState & CopilotInputActions>()((set, get) => ({
    text: "",
    isLoading: false,
    error: undefined,
    attachments: [],
    model: undefined,

    setText: (text) => set({ text }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    addAttachment: (attachment) =>
      set((state) => ({ attachments: [...state.attachments, attachment] })),
    removeAttachment: (id) =>
      set((state) => ({
        attachments: state.attachments.filter((a) => a.id !== id),
      })),
    clearAttachments: () => set({ attachments: [] }),
    updateAttachment: (id, update) =>
      set((state) => ({
        attachments: state.attachments.map((a) =>
          a.id === id ? { ...a, ...update } : a,
        ),
      })),
    setModel: (model) => set({ model }),

    inputAttachment: (event) => {
      const attachmentTypes = agent.environment.attachmentTypes;
      for (const typeKey in attachmentTypes) {
        const tp = attachmentTypes[typeKey];
        if (!tp.match(event)) continue;
        const data = tp.handle(event);
        if (data.length) {
          for (const d of data) {
            const id = crypto.randomUUID();
            if (typeof d === "function") {
              get().addAttachment({
                id,
                type: tp.type,
                status: "pending",
                getData: d as any,
              });
              (d as any)()
                .then((data: any) => {
                  get().updateAttachment(id, { data, status: "ready" });
                })
                .catch(() => {
                  get().updateAttachment(id, { status: "errored" });
                });
            } else {
              get().addAttachment({
                id,
                type: tp.type,
                status: "ready",
                data: d,
              });
            }
          }
          break;
        }
      }
    },
  }));
}
