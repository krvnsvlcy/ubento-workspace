import { Resend } from "resend";
import {
  createStore,
  FetchOptions,
  useMutation,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createResendService({ apiKey }: { apiKey: string }) {
  const resend = new Resend(apiKey);

  const emailsStore = createStore<any, any>({
    namespace: "email",
    getKey: (email) => email.id,
    fetchOne: async (id) => {
      const response = await resend.emails.get(id);
      return response.data;
    },
    fetchMany: async () => {
      // Resend list API is limited or needs different approach, placeholder for now
      return { data: [] };
    },
  });

  return {
    useEmail: (id: string, options?: FetchOptions) => {
      return useStoreEntity(emailsStore, id, options);
    },
    useEmails: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(emailsStore, params, options);
    },
    sendEmail: () => {
      return useMutation({
        mutationFn: async (data: any) => {
          return await resend.emails.send(data);
        },
        onSuccess: (data: any) => {
          if (data?.id) {
            emailsStore.push(data);
          }
        },
      });
    },
  };
}

export default createResendService;
