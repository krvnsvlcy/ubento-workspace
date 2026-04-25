import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";
import { queryKeys } from "./keys";
import { useUbento } from "./ubento";

// ===== Apps =====

export function useApps(filters: { team_id?: string } = {}) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["apps", filters],
    queryFn: async () => {
      return await ubento.app.listApps(filters);
    },
  });
}

export function useApp(appId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["app", appId],
    queryFn: async () => {
      return await ubento.app.getApp(appId);
    },
    enabled: !!appId,
  });
}

export function useAppBySlug({ slug }: { slug: string }) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["app", "slug", slug],
    queryFn: async () => {
      return await ubento.app.getAppBySlug(slug);
    },
    enabled: !!slug,
  });
}

export function useCreateApp() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      team_id: string;
      description?: string;
      data: Record<string, unknown>;
    }) => {
      return await ubento.app.createApp(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

export function useUpdateApp() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      data,
    }: {
      appId: string;
      data: {
        name?: string;
        description?: string;
        data: Record<string, unknown>;
      };
    }) => {
      return await ubento.app.updateApp(appId, data);
    },
    onSuccess: (_, { appId }) => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
      queryClient.invalidateQueries({ queryKey: ["app", appId] });
    },
  });
}

export function useDeleteApp() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appId: string) => {
      return await ubento.app.deleteApp(appId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

// ===== Pages =====

export function usePages({ app_id }: { app_id: string }) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["pages", { app_id }],
    queryFn: async () => {
      return await ubento.app.listPages({ app_id });
    },
    enabled: !!app_id,
  });
}

export function getPage({
  ubento,
  pageId,
  queryClient,
}: {
  ubento: UbentoSDK;
  queryClient: QueryClient;
  pageId: string;
}) {
  return queryClient.fetchQuery({
    queryKey: queryKeys.page({ pageId }),
    queryFn: async () => {
      return await ubento.app.getPage(pageId);
    },
  });
}

export function usePage(pageId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: queryKeys.page({ pageId }),
    queryFn: async () => {
      return await ubento.app.getPage(pageId);
    },
    enabled: !!pageId,
  });
}

export function useCreatePage() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      app_id: string;
      name: string;
      path: string;
    }) => {
      return await ubento.app.createPage(data);
    },
    onSuccess: (_, { app_id }) => {
      queryClient.invalidateQueries({ queryKey: ["pages", { app_id }] });
    },
  });
}

export function useUpdatePage() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      pageId,
      data,
    }: {
      pageId: string;
      data: { name?: string; path?: string };
    }) => {
      return await ubento.app.updatePage(pageId, data);
    },
    onSuccess: (_, { pageId }) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["page", pageId] });
    },
  });
}

export function useDeletePage() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pageId: string) => {
      return await ubento.app.deletePage(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}


// ===== App Memberships =====

export function useAppMemberships(
  filters: { app_id?: string; user_id?: string } = {},
) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["app-memberships", filters],
    queryFn: async () => {
      return await ubento.app.listAppMemberships(filters);
    },
  });
}

export function useCreateAppMembership() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      app_id: string;
      user_id: string;
      role: string;
    }) => {
      return await ubento.app.createAppMembership(data);
    },
    onSuccess: (_, { app_id }) => {
      queryClient.invalidateQueries({
        queryKey: ["app-memberships", { app_id }],
      });
    },
  });
}

export function useDeleteAppMembership() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (membershipId: string) => {
      return await ubento.app.deleteAppMembership(membershipId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["app-memberships"] });
    },
  });
}

// ===== App Invites =====

export function useAppInvites({ app_id }: { app_id: string }) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["app-invites", { app_id }],
    queryFn: async () => {
      return await ubento.app.listAppInvites({ app_id });
    },
    enabled: !!app_id,
  });
}

export function useCreateAppInvite() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      app_id,
      data,
    }: {
      app_id: string;
      data: { email: string; role: string };
    }) => {
      return await ubento.app.createAppInvite(app_id, data);
    },
    onSuccess: (_, { app_id }) => {
      queryClient.invalidateQueries({ queryKey: ["app-invites", { app_id }] });
    },
  });
}

export function useAcceptAppInvite() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      return await ubento.app.acceptAppInvite(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["app-memberships"] });
    },
  });
}
