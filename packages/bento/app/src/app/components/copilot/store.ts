import { UbentoService } from "@/services/ubento/ubento";
import { useMutation } from "@ubento/fabric";
import { useEffect, useState } from "react";
import { create } from "zustand";

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface CopilotState {
  threadId: string | null;
  input: string;
  setThreadId: (id: string | null) => void;
  setInput: (input: string) => void;
}

export const useCopilotStore = create<CopilotState>((set) => ({
  threadId: null,
  input: "",
  setThreadId: (id) => set({ threadId: id }),
  setInput: (input) => set({ input }),
}));

// Hooks

export function useCopilotThread(
  ubento: UbentoService,
  threadId: string | null,
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CopilotMessage[]>([]);

  useEffect(() => {
    if (!threadId) {
      setData([]);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const res = await ubento.intelligence.listMessages({
          thread_id: threadId,
        });
        const messages = res.data.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content:
            msg.data?.text || msg.data?.content || JSON.stringify(msg.data),
        })) as CopilotMessage[];
        setData(messages);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [threadId]);

  return { data, loading, setData };
}

export function useSendCopilotMessage(
  ubento: UbentoService,
  onMessage?: (msg: CopilotMessage) => void,
) {
  const setInput = useCopilotStore((state) => state.setInput);

  return useMutation({
    mutationFn: async ({
      threadId,
      content,
    }: {
      threadId: string;
      content: string;
    }) => {
      const res = await ubento.intelligence.createMessage({
        thread_id: threadId,
        role: "user",
        content,
      });

      // Clear input on send
      setInput("");

      const msg = {
        id: res.id,
        role: res.role,
        content:
          (res.data as any)?.text || (res.data as any)?.content || content,
      } as CopilotMessage;

      onMessage?.(msg);
      return msg;
    },
  });
}
