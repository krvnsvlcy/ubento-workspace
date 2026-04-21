import { BaseService } from "@ubento/services-common";
import { Request, Response, Router } from "express";

export class IntegrationService extends BaseService {
  constructor() {
    super({ name: "Integration", port: 4004 });
  }

  protected setupRoutes(): void {
    const router = Router();
    router.get("/status", async (req: Request, res: Response) => {
      res.json({ status: "ok" });
    });
    this.app.use("/integration", router);
  }
}

const service = new IntegrationService();
service.start();
