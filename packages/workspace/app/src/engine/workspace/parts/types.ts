import z from "zod";
import {
  BentoWorkspaceData,
  WorkspaceSpec,
  ParsedSpec,
  workspaceSpecSchema,
} from "@ubento/bento.runtime";
import { PackageInstallStatus } from "@/services/ts/package_manager/package_manager";
import { TsServiceStatus } from "@/services/ts/ts-service";
import { ModuleStatus } from "@/services/ts/module-syncer";

export type CopilotChanges = {
  checkpoint: WorkspaceSpec;
  items: string[];
};

export type WorkspaceState = {
  // status
  status: "pending" | "connected" | "ready" | "error";
  error?: any;

  // local state
  workspace: BentoWorkspaceData;

  // synced from runtime
  selectionScope?: string;
  selection: string[];
  hover?: string;

  leftPanelOpen: boolean;
  tsServiceStatus?: TsServiceStatus;
  packageStatuses?: Record<string, PackageInstallStatus>;
  moduleStatuses?: ModuleStatus[];
  copilotChanges?: CopilotChanges;
};

export function parseSpecData<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown,
): ParsedSpec<z.infer<S>> {
  const spec = schema.safeParse(data);
  if (!spec.success) {
    return {
      isValid: false,
      data: data,
      issues: spec.error.issues.map((issue) => ({
        location: issue.path.map((p) => String(p)),
        message: issue.message,
      })),
    };
  } else {
    return {
      isValid: true,
      data: spec.data,
    };
  }
}

export function deriveBoardsFromSpec(spec: any) {
  const result: Record<string, any> = {};
  if (spec.isValid && spec.data?.boards) {
    for (const [id, board] of Object.entries(spec.data.boards)) {
      const b = board as any;
      result[id] = {
        id: b.id,
        title: b.title,
        spec: {
          isValid: true,
          data: {
            children: b.children || [],
            elements: {},
          },
        },
      };
    }
  }
  return result;
}
