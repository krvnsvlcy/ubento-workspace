import type {
  Certificate,
  Domain,
  Pointer,
} from "~/clients/networking/client.js";
import { createNetworkingServiceClient } from "~/clients/networking/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class NetworkingService {
  private networkingClient: ReturnType<typeof createNetworkingServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.networkingClient = createNetworkingServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  async listPointers(options?: {
    target?: string;
    limit?: number;
    cursor?: string;
    direction?: "forward" | "backward";
    order?: string;
  }) {
    const result = await this.networkingClient.get("/pointers", {
      params: {
        query: {
          target: options?.target,
          limit: options?.limit,
          cursor: options?.cursor,
          direction: options?.direction,
          order: options?.order ? [options.order] : undefined,
        },
      },
    });
    return extractCursorPage<Pointer>(result.response, {
      items: result.data,
      fetcher: this.networkingClient.fetch,
    });
  }

  async getPointer(pointerId: string) {
    const result = await this.networkingClient.get("/pointers/{pointer_id}", {
      params: { path: { pointer_id: pointerId } },
    });
    return extractResponseData(result);
  }

  async deletePointer(pointerId: string) {
    const result = await this.networkingClient.delete(
      "/pointers/{pointer_id}",
      {
        params: { path: { pointer_id: pointerId } },
      },
    );
    return extractResponseData(result, true);
  }

  async setPointerTarget(pointerId: string, target: string) {
    const result = await this.networkingClient.put(
      "/pointers/{pointer_id}/target",
      {
        params: { path: { pointer_id: pointerId } },
        body: { value: target },
      },
    );
    return extractResponseData(result, true);
  }

  async clearPointerTarget(pointerId: string) {
    const result = await this.networkingClient.delete(
      "/pointers/{pointer_id}/target",
      {
        params: { path: { pointer_id: pointerId } },
      },
    );
    return extractResponseData(result, true);
  }

  async getPointerByName(pointerName: string, create?: boolean) {
    const result = await this.networkingClient.get("/pointer/{pointer}", {
      params: {
        path: { pointer: pointerName },
        query: { create: create ? "true" : undefined },
      },
    });
    return extractResponseData(result);
  }

  async listDomains(options?: {
    pointer?: string;
    limit?: number;
    cursor?: string;
    direction?: "forward" | "backward";
    order?: string;
  }) {
    const result = await this.networkingClient.get("/domains", {
      params: {
        query: {
          pointer: options?.pointer,
          limit: options?.limit,
          cursor: options?.cursor,
          direction: options?.direction,
          order: options?.order ? [options.order] : undefined,
        },
      },
    });
    return extractCursorPage<Domain>(result.response, {
      items: result.data,
      fetcher: this.networkingClient.fetch,
    });
  }

  async createDomain(data: { organization_id: string; name: string }) {
    const result = await this.networkingClient.post("/domains", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getDomain(domainId: string) {
    const result = await this.networkingClient.get("/domains/{domain_id}", {
      params: { path: { domain_id: domainId } },
    });
    return extractResponseData(result);
  }

  async deleteDomain(domainId: string) {
    const result = await this.networkingClient.delete("/domains/{domain_id}", {
      params: { path: { domain_id: domainId } },
    });
    return extractResponseData(result, true);
  }

  async getDomainRecords(domainId: string) {
    const result = await this.networkingClient.get(
      "/domains/{domain_id}/records",
      {
        params: { path: { domain_id: domainId } },
      },
    );
    return extractResponseData(result);
  }

  async getDomainCertificate(domainId: string) {
    const result = await this.networkingClient.get(
      "/domains/{domain_id}/certificate",
      {
        params: { path: { domain_id: domainId } },
      },
    );
    return extractResponseData(result);
  }

  async setDomainPointer(domainId: string, pointer: string) {
    const result = await this.networkingClient.put(
      "/domains/{domain_id}/pointer",
      {
        params: { path: { domain_id: domainId } },
        body: { value: pointer },
      },
    );
    return extractResponseData(result, true);
  }

  async clearDomainPointer(domainId: string) {
    const result = await this.networkingClient.delete(
      "/domains/{domain_id}/pointer",
      {
        params: { path: { domain_id: domainId } },
      },
    );
    return extractResponseData(result, true);
  }

  async getDomainByName(domainName: string) {
    const result = await this.networkingClient.get("/domain/{domain}", {
      params: { path: { domain: domainName } },
    });
    return extractResponseData(result);
  }

  async listCertificates(options?: {
    expiresInDays?: number;
    limit?: number;
    cursor?: string;
    direction?: "forward" | "backward";
    order?: string;
  }) {
    const result = await this.networkingClient.get("/certificates", {
      params: {
        query: {
          expiresInDays: options?.expiresInDays,
          limit: options?.limit,
          cursor: options?.cursor,
          direction: options?.direction,
          order: options?.order ? [options.order] : undefined,
        },
      },
    });
    return extractCursorPage<Certificate>(result.response, {
      items: result.data,
      fetcher: this.networkingClient.fetch,
    });
  }

  async getCertificate(certificateId: string) {
    const result = await this.networkingClient.get(
      "/certificates/{certificate_id}",
      {
        params: { path: { certificate_id: certificateId } },
      },
    );
    return extractResponseData(result);
  }

  async deleteCertificate(certificateId: string) {
    const result = await this.networkingClient.delete(
      "/certificates/{certificate_id}",
      {
        params: { path: { certificate_id: certificateId } },
      },
    );
    return extractResponseData(result, true);
  }

  async provisionCertificate(certificateId: string, force?: boolean) {
    const result = await this.networkingClient.post(
      "/certificates/{certificate_id}/provision",
      {
        params: { path: { certificate_id: certificateId } },
        body: force !== undefined ? { force } : undefined,
      },
    );
    return extractResponseData(result, true);
  }

  async getCertificateDomainStates(certificateId: string) {
    const result = await this.networkingClient.get(
      "/certificates/{certificate_id}/domain-states",
      {
        params: { path: { certificate_id: certificateId } },
      },
    );
    return extractResponseData(result);
  }
}
