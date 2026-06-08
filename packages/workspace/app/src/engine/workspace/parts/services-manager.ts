import { ConfirmMutationModal } from "@/modals/confirm_mutation/confirm_mutation";
import { appModalRoutes } from "@/modals/app/routes";
import { vertexClient } from "@ubento/services.sdk";
import { serviceSpecV1Schema } from "@ubento/vertex.core";
import {
  ServiceData,
  ServiceOperationErrorData,
  ServiceOperationResult,
} from "@ubento/bento.runtime";
import type { WorkspaceEngine } from "../engine";
import { parseSpecData } from "./types";

export class ServicesManager {
  private specCache = {} as Record<string, any>;

  constructor(private engine: WorkspaceEngine) {}

  async getServiceSpec(channelId: string) {
    const { appEngine } = this.engine;
    if (this.specCache[channelId]) {
      return parseSpecData(serviceSpecV1Schema, this.specCache[channelId]);
    }
    const specData =
      await appEngine.ubento.sdk.vertex.getServiceChannelSpec(channelId);
    this.specCache[channelId] = specData;
    return parseSpecData(serviceSpecV1Schema, specData);
  }

  async getServiceSpecForService(serviceName: string) {
    const workspaceSpec = this.engine.readWorkspaceSpec();
    if (!workspaceSpec) return null;
    const serviceData = workspaceSpec.services?.[serviceName];
    if (!serviceData) return null;
    return this.getServiceSpec(serviceData.channelId);
  }

  async runServiceOperation({
    service,
    type,
    name,
    args,
  }: {
    service: string;
    type: "query" | "action";
    name: string;
    args?: Record<string, unknown>;
  }): Promise<ServiceOperationResult> {
    const { appEngine, session } = this.engine;
    const workspaceSpec = this.engine.readWorkspaceSpec();
    if (!workspaceSpec) {
      throw new Error("Workspace spec not found");
    }

    const serviceData = workspaceSpec.services?.[service];
    if (!serviceData) {
      throw new Error(`Service "${service}" not found`);
    }

    const channelId = serviceData.channelId;
    const serviceSpec = await this.getServiceSpec(channelId);
    if (!serviceSpec.isValid) {
      throw new Error(`Invalid service spec for ${channelId}.`);
    }

    let vertexResponse: vertexClient.VertexResult;

    if (type === "query") {
      vertexResponse = await appEngine.ubento.sdk.vertex.invoke({
        teamId: session.teamId,
        serviceChannelId: channelId,
        operation: name,
        args: args,
      });
    } else {
      const confirmed = await appEngine.openModal<any, boolean>(
        ConfirmMutationModal,
        {
          service,
          action: name,
          args,
        },
      );
      if (!confirmed) {
        return {
          ok: false,
          error: {
            code: "CANCELLED",
            message: `Execution of action "${name}" on service "${service}" was cancelled.`,
            isTransient: false,
            isIdempotent: false,
          },
          result: undefined,
        };
      }

      vertexResponse = await appEngine.ubento.sdk.vertex.invoke({
        teamId: session.teamId,
        serviceChannelId: channelId,
        operation: name,
        args: args,
      });
    }

    const isIdempotent = type === "query";

    if (vertexResponse.error) {
      const errorTemplate: ServiceOperationErrorData = {
        code: vertexResponse.error.code,
        message: vertexResponse.error.message || "An unknown error occurred",
        isTransient: false,
        isIdempotent,
      };

      switch (vertexResponse.error.code) {
        case "INVALID_CREDENTIALS": {
          appEngine.notify({
            title: "Invalid Connection",
            message: `Request failed due to invalid credentials. Please setup a valid connection for service ${service}.`,
            type: "error",
          });
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
        case "INVALID_REQUEST_ERROR": {
          appEngine.notify({
            title: "Invalid Request",
            message: `Please check the arguments for ${service}.${name}.`,
            type: "error",
          });
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
        case "USAGE_LIMIT_EXCEEDED": {
          appEngine.notify({
            title: "Usage Limit Exceeded",
            message: `Please upgrade your plan for Vertex requests.`,
            type: "error",
            duration: 20_000,
            action: {
              label: "Upgrade",
              onClick: () => {
                appEngine.pushAppModal(appModalRoutes.team.billing);
              },
            },
          });
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
        case "UPSTREAM_ERROR": {
          return {
            ok: false,
            error: {
              ...errorTemplate,
              isTransient: true,
            },
            result: undefined,
          };
        }
        default: {
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
      }
    }

    return {
      ok: true,
      error: undefined,
      result: vertexResponse.data,
    };
  }

  installService(serviceName: string, data: ServiceData) {
    const spec = this.engine.readWorkspaceSpec();
    if (!spec) return;

    this.engine.updateWorkspaceSpec({
      spec: {
        services: {
          ...(spec.services || {}),
          [serviceName]: data,
        },
      },
    });
  }
}
