import { create } from "zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";

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

// React Query Hooks

export function useCopilotThread(ubento: UbentoSDK, threadId: string | null) {
  return useQuery({
    queryKey: ["copilot", "thread", threadId],
    queryFn: async () => {
      const res = await ubento.intelligence.listMessages({ thread_id: threadId! });
      return res[0].map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.data?.text || msg.data?.content || JSON.stringify(msg.data),
      })) as CopilotMessage[];
    },
    enabled: !!threadId,
  });
}

export function useSendCopilotMessage(ubento: UbentoSDK) {
  const queryClient = useQueryClient();
  const setInput = useCopilotStore((state) => state.setInput);

  return useMutation({
    mutationFn: async ({ threadId, content }: { threadId: string; content: string }) => {
      const res = await ubento.intelligence.createMessage({
        thread_id: threadId,
        role: "user",
        content,
      });
      return {
        id: res.id,
        role: res.role,
        content: (res.data as any)?.text || (res.data as any)?.content || content,
      } as CopilotMessage;
    },
    onMutate: async ({ threadId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["copilot", "thread", threadId] });

      const previousMessages = queryClient.getQueryData<CopilotMessage[]>([
        "copilot",
        "thread",
        threadId,
      ]);

      // Optimistically add the user message
      const userMessage: CopilotMessage = {
        id: `temp-${Date.now()}`,
        role: "user",
        content,
      };

      queryClient.setQueryData<CopilotMessage[]>(
        ["copilot", "thread", threadId],
        (old) => (old ? [...old, userMessage] : [userMessage])
      );

      // Clear input on send
      setInput("");

      return { previousMessages };
    },
    onSuccess: (data, variables) => {
      // Add the assistant's response
      queryClient.setQueryData<CopilotMessage[]>(
        ["copilot", "thread", variables.threadId],
        (old) => (old ? [...old, data] : [data])
      );
    },
    onError: (err, variables, context) => {
      // Revert optimistic update
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["copilot", "thread", variables.threadId],
          context.previousMessages
        );
      }
    },
  });
}
